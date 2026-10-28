import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, readdir, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const reviewBase = '/review-base/'

const publicAssetFiles = [
  'squrvebridge-logo.png',
  'squrvebridge-architecture.png',
  'huggingface-logo.svg',
  'intro-demo.mp4',
  'demo.mp4',
]

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function buildSite(extraEnv = {}) {
  const outDir = await mkdtemp(path.join(tmpdir(), 'paper-site-build-'))
  const result = spawnSync(
    process.execPath,
    [
      path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js'),
      'build',
      '--outDir',
      outDir,
      '--emptyOutDir',
      '--logLevel',
      'warn',
    ],
    {
      cwd: projectRoot,
      encoding: 'utf8',
      env: { ...process.env, ...extraEnv },
    },
  )

  assert.equal(
    result.status,
    0,
    `expected the site to build\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  )

  return outDir
}

async function readBuiltSite(outDir) {
  const html = await readFile(path.join(outDir, 'index.html'), 'utf8')
  const assetDir = path.join(outDir, 'assets')
  const emitted = await readdir(assetDir)

  const css = (
    await Promise.all(
      emitted
        .filter((file) => file.endsWith('.css'))
        .map((file) => readFile(path.join(assetDir, file), 'utf8')),
    )
  ).join('\n')

  const javascript = (
    await Promise.all(
      emitted
        .filter((file) => file.endsWith('.js'))
        .map((file) => readFile(path.join(assetDir, file), 'utf8')),
    )
  ).join('\n')

  return { html, css, javascript }
}

function documentUrls(html) {
  const urls = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1])

  return urls.filter(
    (url) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url),
  )
}

function stylesheetUrls(css) {
  const urls = [...css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)].map((match) => match[2])

  return urls.filter((url) => !/^(?:data:|https?:|\/\/)/i.test(url))
}

async function assertServedFromBase(outDir, base, url, source) {
  assert.ok(
    url.startsWith(base),
    `${source} requests "${url}", which is not served from the deployed base "${base}"`,
  )

  const relativePath = url.slice(base.length)

  assert.notEqual(relativePath, '', `${source} requests the bare base "${url}"`)

  try {
    await stat(path.join(outDir, relativePath))
  } catch {
    assert.fail(`${source} requests "${url}", but "${relativePath}" is missing from the build output`)
  }
}

test('serves every asset from the configured base path', async () => {
  const outDir = await buildSite({ BASE_PATH: reviewBase })
  const { html, css, javascript } = await readBuiltSite(outDir)

  for (const url of documentUrls(html)) {
    await assertServedFromBase(outDir, reviewBase, url, 'the document head')
  }

  assert.match(
    html,
    /<link rel="icon" href="\/review-base\/[^"]+"/,
    'the favicon should be served from the deployed base path',
  )
  assert.match(
    html,
    /<meta\s+name="description"/,
    'the public description meta should survive the build',
  )

  for (const url of stylesheetUrls(css)) {
    await assertServedFromBase(outDir, reviewBase, url, 'the stylesheet')
  }
  assert.match(css, /paper-glass-texture/, 'the body texture should still be bundled')

  for (const file of publicAssetFiles) {
    const rootAbsolute = new RegExp(`["'\`]/${escapeRegExp(file)}`)

    assert.doesNotMatch(
      javascript,
      rootAbsolute,
      `the bundle still requests "/${file}" from the domain root`,
    )
    assert.ok(
      javascript.includes(file),
      `the bundle no longer serves "${file}"`,
    )
  }

  assert.ok(
    javascript.includes(reviewBase),
    'the bundle ignores the configured base path',
  )

  for (const anchor of ['intro-heading', 'architecture-heading', 'demo-heading', 'abstract-heading']) {
    assert.ok(javascript.includes(anchor), `the page lost its "${anchor}" anchor`)
  }

  assert.ok(
    javascript.includes('https://github.com/Zhanghoks/SqurveBridge'),
    'the public source link should not be rewritten by the base path',
  )
  assert.ok(
    javascript.includes('https://huggingface.co/spaces/zmmjjkk/SqurveBridge'),
    'the hosted demo link should not be rewritten by the base path',
  )
  assert.doesNotMatch(javascript, /vercel\.app/, 'the page should not link the retired host')
})

test('builds for the repository subpath by default', async () => {
  const outDir = await buildSite()
  const { html } = await readBuiltSite(outDir)

  for (const url of documentUrls(html)) {
    await assertServedFromBase(
      outDir,
      '/squrvebridge-live-demo/',
      url,
      'a default build',
    )
  }
})
