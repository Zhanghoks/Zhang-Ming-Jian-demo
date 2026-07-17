# Repository Guidelines

## Repository Role

This repository is only the anonymous paper presentation website deployed at
`https://squrvebridge.vercel.app`. It may present the paper title, abstract,
sanitized video, and links to the public source and hosted demo.

The real interactive SqurveBridge demo is deployed at
`https://huggingface.co/spaces/zmmjjkk/SqurveBridge`; its authoritative source
is the separate `SqurveBridge` repository. Never copy `SqurveBridge/demo/`,
`SqurveBridge/demo-app/`, Space runtime configuration, or backend code into this
paper-site repository.

## Anonymous Publication

Treat every tracked file, build artifact, screenshot, video frame, HTML metadata,
Git commit, and deployment as public. Do not include author names, affiliations,
personal email addresses, account identifiers, conference or venue names,
tracks, deadlines, submission/review status, review identifiers, private URLs,
absolute workstation paths, credentials, internal plans, or unpublished claims.
Use `Anonymous Authors` when an author label is necessary.

Before committing, inspect staged and untracked files explicitly. Do not commit
design QA notes, local screenshots, browser traces, or internal planning
documents merely because they sit in the working tree.

## Verification

Run `npm test`, `npm run build`, and `git diff --check` before publication.
Confirm that the production page links to
`https://github.com/Zhanghoks/SqurveBridge` and the Hugging Face Space, and that
it does not embed the interactive runtime itself. Never store runtime secrets in
Vercel or this repository because the site is static and requires none.
