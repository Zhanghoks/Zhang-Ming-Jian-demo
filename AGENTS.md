# Repository Guidelines

## Repository Role

This repository is only the paper presentation website deployed at
`https://zhanghoks.github.io/squrvebridge-live-demo/`. It is published as a
GitHub Pages project site by the deploy workflow on every push to `main`, so it
is served from a repository subpath rather than a domain root. It may present
the paper title, abstract, sanitized video, and links to the public source and
hosted demo.

The real interactive SqurveBridge demo is deployed as a Hugging Face Space; its
authoritative source is the separate `SqurveBridge` repository. Keep the
current public endpoints in `src/siteContent.js`, not duplicated in guidance.
Never copy `SqurveBridge/demo/`, `SqurveBridge/demo-app/`, Space runtime
configuration, or backend code into this paper-site repository.

## Publication Privacy

Treat every tracked file, build artifact, screenshot, video frame, HTML metadata,
Git commit, and deployment as public. User-approved paper author names and
affiliations may be displayed. Do not include personal contact details,
unapproved identity metadata, conference or venue names, tracks, deadlines,
submission/review status, review identifiers, private URLs, absolute workstation
paths, credentials, internal plans, or unpublished claims.

Before committing, inspect staged and untracked files explicitly. Do not commit
design QA notes, local screenshots, browser traces, or internal planning
documents merely because they sit in the working tree.

## Verification

Run `npm test`, `npm run build`, and `git diff --check` before publication.
Confirm that the production page links to the configured public source and
Hugging Face Space, and that it does not embed the interactive runtime itself.
Never store runtime secrets in this repository or its workflows because the site
is static and requires none.

Because the page is served from a repository subpath, every public asset is
resolved against the configured base path. Never hardcode a root-absolute asset
URL in a component; the build-output test fails when an asset would be requested
from the domain root. Publishing from a domain root instead is a single
`BASE_PATH` value at build time.

## Deployment And Rollback

Pushing to `main` runs the `Deploy paper site` workflow, which tests and builds
the page before publishing it; a run that fails its tests publishes nothing. To
roll back, open the workflow's history, pick the last successful run, and re-run
its deploy job, which republishes that run's artifact. Never publish a local
build by hand.
