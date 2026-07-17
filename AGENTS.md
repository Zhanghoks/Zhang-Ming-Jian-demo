# Repository Guidelines

## Repository Role

This repository is only the paper presentation website deployed at
`https://squrvebridge.vercel.app`. It may present the paper title, abstract,
sanitized video, and links to the public source and hosted demo.

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
Never store runtime secrets in Vercel or this repository because the site is
static and requires none.
