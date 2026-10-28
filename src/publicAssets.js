// Every file the page loads from the public directory, named by what it is
// used for rather than by its filename on disk. Site content refers to these
// names; only this module knows which base path they are served from.
export const PUBLIC_ASSET_FILES = {
  logo: 'squrvebridge-logo.png',
  architecture: 'squrvebridge-architecture.png',
  huggingFaceLogo: 'huggingface-logo.svg',
  introVideo: 'intro-demo.mp4',
  demoVideo: 'demo.mp4',
}

export const PUBLIC_ASSET_NAMES = Object.keys(PUBLIC_ASSET_FILES)

export function createAssetUrls(base) {
  if (typeof base !== 'string' || base === '') {
    throw new TypeError('A base path is required to resolve public asset URLs')
  }

  const prefix = base.endsWith('/') ? base : `${base}/`

  return Object.fromEntries(
    Object.entries(PUBLIC_ASSET_FILES).map(([name, file]) => [name, `${prefix}${file}`]),
  )
}
