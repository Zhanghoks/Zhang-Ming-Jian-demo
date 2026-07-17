import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { ABSTRACT, PROJECT_LINKS, SITE } from '../src/siteContent.js'

const forbiddenPublicMarkers = [
  ['EM', 'NLP'].join(''),
  'conference',
  'submission',
  ['system', 'demonstrations'].join(' '),
  'Mingjian Zhang',
  'Zihan Chen',
  'Zhe Li',
  'Peiyu Liu',
  'University of International Business and Economics',
]
const forbiddenPublicPattern = new RegExp(forbiddenPublicMarkers.join('|'), 'i')

test('publishes the approved paper website identity and links', () => {
  assert.equal(SITE.packageName, 'squrvebridge-paper-website')
  assert.equal(SITE.browserTitle, 'SqurveBridge · Paper Website')
  assert.deepEqual(PROJECT_LINKS.github, {
    href: 'https://github.com/Zhanghoks/SqurveBridge',
    label: 'GitHub',
    icon: 'github',
  })
  assert.equal(
    PROJECT_LINKS.huggingFace.href,
    'https://huggingface.co/spaces/zmmjjkk/SqurveBridge',
  )
  assert.equal(PROJECT_LINKS.huggingFace.label, 'Hugging Face Live Demo')
  assert.equal(PROJECT_LINKS.huggingFace.iconAsset, '/huggingface-logo.svg')
})

test('keeps the minimal paper-page content', () => {
  assert.equal(SITE.sections.join(','), 'Demo Video,Abstract')
  assert.match(ABSTRACT, /SqurveBridge/)
  assert.match(ABSTRACT, /Text-to-SQL/)
})

test('does not expose submission or conference metadata', () => {
  const publicCopy = JSON.stringify({ SITE, ABSTRACT })

  assert.deepEqual(SITE.authors, ['Anonymous Authors'])
  assert.equal(SITE.affiliation, null)
  assert.equal(SITE.venue, undefined)
  assert.equal(SITE.footer, 'SqurveBridge · Research Project Website')
  assert.doesNotMatch(publicCopy, forbiddenPublicPattern)
})

test('keeps submission metadata out of the public document head', async () => {
  const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8')

  assert.doesNotMatch(indexHtml, forbiddenPublicPattern)
})
