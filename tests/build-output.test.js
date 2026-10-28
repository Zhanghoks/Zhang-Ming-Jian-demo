import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, readdir, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { PUBLIC_ASSET_FILES } from '../src/publicAssets.js'
import { PROJECT_LINKS } from '../src/siteContent.js'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const reviewBase = '/review-base/'
const publicAssetFiles = Object.values(PUBLIC_ASSET_FILES)

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function buildSite({ base } = {}) {
  const outDir = await mkdtemp(path.join(tmpdir(), 'paper-site-build-'))
  const env = { ...process.env }

  if (base === undefined) {
    delete env.BASE_PATH
  } else {
    env.BASE_PATH = base
  }

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
      env,
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

function pageServedUrls(candidates) {
  return candidates.filter((url) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url))
}

function documentUrls(html) {
  return pageServedUrls(
    [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]),
  )
}

function stylesheetUrls(css) {
  return pageServedUrls(
    [...css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)].map((match) => match[2]),
  )
}

// Root-absolute URLs the bundle builds at runtime, such as a hand-written
// "/image.png" that never passes through the asset registry.
function bundleUrls(javascript) {
  const rootAbsolute = /["'`](\/[^"'`]*?\.(?:png|jpe?g|svg|gif|webp|avif|ico|mp4|webm|ogg|mp3|wav|pdf|css|js|mjs|woff2?|ttf|otf))["'`]/gi

  return [...javascript.matchAll(rootAbsolute)].map((match) => match[1])
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
  const outDir = await buildSite({ base: reviewBase })
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

    // A referenced asset that was never copied into the build 404s on the
    // deployed page, which is exactly what a missing media file looks like.
    try {
      await stat(path.join(outDir, file))
    } catch {
      assert.fail(`the bundle references "${file}", but the build output does not contain it`)
    }
  }

  for (const url of bundleUrls(javascript)) {
    await assertServedFromBase(outDir, reviewBase, url, 'the bundle')
  }

  assert.ok(
    javascript.includes(reviewBase),
    'the bundle ignores the configured base path',
  )
  assert.ok(
    (javascript.match(/video\/mp4/g) ?? []).length >= 2,
    'the page must still ship both demo videos',
  )

  for (const anchor of ['intro-heading', 'architecture-heading', 'demo-heading', 'abstract-heading']) {
    assert.ok(javascript.includes(anchor), `the page lost its "${anchor}" anchor`)
  }

  assert.ok(
    javascript.includes(PROJECT_LINKS.github.href),
    'the public source link should not be rewritten by the base path',
  )
  assert.ok(
    javascript.includes(PROJECT_LINKS.huggingFace.href),
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
      '/Zhang-Ming-Jian-demo/',
      url,
      'a default build',
    )
  }
})

test('retargets a domain root with the same build', async () => {
  const outDir = await buildSite({ base: '/' })
  const { html, css, javascript } = await readBuiltSite(outDir)

  for (const url of documentUrls(html)) {
    await assertServedFromBase(outDir, '/', url, 'a root build')
  }
  for (const url of stylesheetUrls(css)) {
    await assertServedFromBase(outDir, '/', url, 'a root build stylesheet')
  }
  for (const url of bundleUrls(javascript)) {
    await assertServedFromBase(outDir, '/', url, 'a root build bundle')
  }
})
