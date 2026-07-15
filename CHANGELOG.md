# Changelog

All notable changes to the ChAImp website (`chaimp.org`) are documented here.
This project follows [Semantic Versioning](https://semver.org/).

> This file was created at 1.0.1. Entries before that point were never recorded —
> the repo shipped without a changelog, against the standing rule that every
> solution must have one. History is not reconstructed here: inventing entries
> after the fact would be a tidy fiction. 1.0.0 is marked as the pre-changelog
> baseline and the record starts honestly from 1.0.1.

## [1.0.1] — 2026-07-15

### Added
- Gitleaks secret scanning on every pull request and every push to `main` (`AB#331`). Uses the
  upstream gitleaks binary rather than `gitleaks-action`, which requires a paid licence for org
  accounts. This repo previously had **no secret scanning at all** — and it is **public**, so a
  credential committed here would be world-readable the moment it landed.
- `.gitleaks.toml` extending the upstream default ruleset with the credential shapes ChAImp uses.
- This `CHANGELOG.md`.

### Notes
- **Full-history scan at this version: clean.** 100 commits scanned, no findings.
- The scan initially reported 2 findings, both **false positives**: the **Cloudflare Web Analytics
  beacon token** in `index.html` (@ `94286b14`) and `saas.html` (@ `a9337b31`), matched by gitleaks'
  generic `"token": "..."` rule. That token is **public by design** — Cloudflare's own docs instruct
  you to embed it in your HTML, and every visitor reads it in page source. It grants access to
  nothing and there is nothing to rotate. Both instances were already removed from `HEAD` in later
  commits, but `gitleaks detect` scans full history, so they would have failed this repo's scan on
  every run forever. A permanently-red check is not a control — it distinguishes nothing.
- The allowlist is scoped to the `data-cf-beacon` line specifically, and was **verified not to
  over-reach**: `generic-api-key` still fires on a `"token": "..."` on any ordinary line. An
  allowlist that silences the false positive by blinding the scanner would be worse than the
  false positive.
- GitHub Pages deployment is unaffected.
