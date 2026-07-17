# Changelog

All notable changes to the ChAImp website (`chaimp.org`) are documented here.
This project follows [Semantic Versioning](https://semver.org/).

> This file was created at 1.0.1. Entries before that point were never recorded —
> the repo shipped without a changelog, against the standing rule that every
> solution must have one. History is not reconstructed here: inventing entries
> after the fact would be a tidy fiction. 1.0.0 is marked as the pre-changelog
> baseline and the record starts honestly from 1.0.1.

## [1.2.2] — 2026-07-17

### Changed
- **AI is now presented as vendor-agnostic.** On `saas.html`, the infrastructure section's
  "AI features are powered by **Anthropic**" becomes "powered by **the provider you choose**", and the
  `Anthropic` trust badge becomes **`AI provider of your choice`**. Reflects the move to let each
  nonprofit pick its own AI provider.
- Dev-tooling references are intentionally unchanged — ChAImp still builds with Claude Code, so the
  "Claude Code security review" gate/badge and the "built with" tags describe how we build, not which
  provider runs a customer's AI features. (Note: MSA §10's third-party-vendor list still names a single
  AI vendor — update it out-of-repo to match this positioning.)

## [1.2.1] — 2026-07-17

### Changed
- **Board titles now separate office from honorific.** Every "Founding X" title is split into the
  clean office (`President`, `Treasurer`, `Secretary`, `Director of …`) plus a small **`Founding board`**
  pill; James carries a gold **`Founder`** pill instead. Applied on both `index.html#board` and the
  `board.html` profile cards. Removes the repetition of "Founding" down the column and reads as the
  honorific it is. Bio callout text drops the now-redundant "Founding" too (the pill states it).
- **Board ordering: officers first, then directors, each alphabetical by name.** Andrew (President),
  Cathy (Treasurer), Erik (Secretary), then Ashu (Director of Solution Development) and Sarah
  (Director of Mission & Outreach). James stays pinned first on `index.html` as ex-officio.
- **Ashu Samra → Director of Solution Development**; **Erik** regains his second role,
  **Director of Customer Technical Implementation**, as a second title line under Secretary.
- **Erik Øerum Hansen → Erik Orum Hansen** in all displayed names and alt text (headshot file and
  LinkedIn URL slug unchanged — both are real identifiers). Historical CHANGELOG entries keep the
  original spelling.
- **Board layout is now an even grid, not lopsided.** Home page `#board` goes 4+2 → **3×2**
  (3 cols → 2 cols ≤900px → 1 col ≤600px, centred, `max-width: 960px`). The `board.html` profile
  grid goes 2+2+1 → **3+2** (flex-basis 380→320, `max-width` 480→360).

### Added
- **"At ChAImp" role callout** on each `board.html` profile card. The person's contribution — previously
  the trailing bio paragraph, easy to miss — is pulled into a highlighted, teal-accented box so what
  they *do* here reads as the point of the card, not an afterthought. Driven by a new `role` field.
- **Deep links from the home page to each board member.** "Read _X_'s full bio →" now targets
  `board.html#<firstname>` (each profile card carries an `id`), landing on that person instead of the
  page top. Cards get `scroll-margin-top` so the fixed nav doesn't overlap the anchored card.

## [1.2.0] — 2026-07-17

### Added
- **Single-source site navigation** (`nav.js`). The nav bar was hardcoded, three times, in
  `index.html`, `board.html`, and `saas.html` — and had already drifted: the **Board** link
  existed only on `index.html`, so from the Solutions page or a board profile there was no way
  back to the board section. `nav.js` now injects one nav into a `<nav id="site-nav">` placeholder
  on every page, so the markup lives in exactly one place and can't drift again.
  - Anchor links resolve correctly off the home page (`#board` → `index.html#board`, etc.).
  - Active-page state: **Our Solutions** is highlighted on `saas.html`, **Board** on `board.html`,
    each marked `aria-current` for assistive tech.
  - Scroll-spy on the home page highlights the section currently in view (IntersectionObserver;
    the observer is deferred to `DOMContentLoaded` because `nav.js` runs inline before the
    sections below it are parsed).

### Changed
- The `<nav>…</nav>` block in `index.html`, `board.html`, and `saas.html` is replaced by the
  `<nav id="site-nav">` placeholder plus `<script src="nav.js"></script>`. Existing nav CSS
  (inline per page) is unchanged; only the `.nav-links a.active` rule is added, injected by `nav.js`.

### Known gaps (unchanged by this release)
- Mobile still hides `.nav-links` with no hamburger menu (pre-existing behaviour, out of scope here).

## [1.1.0] — 2026-07-16

### Added
- Erik Øerum Hansen to the board — full bio on `board.html`, summary card on `index.html#board`.
  Founding Secretary & Director, Customer Technical Implementation.
- `firstname@chaimp.org` contact link on every `board.html` profile card, beside the LinkedIn button.
  Not added to the `index.html` cards: each of those is a single `<a href="board.html">` wrapping the
  whole tile, and a nested `mailto:` anchor is invalid HTML that browsers split apart, breaking the
  card's click target.
- **KnowledgeRetention** as the fifth offering on `saas.html` — closed beta, links to
  `knowledgeretention.help`. Copy follows the product's own site ("digital estate planning for your
  nonprofit"). `KnowledgeRetention_Logo.png` is the horizontal brand logo, matching the other cards;
  the stacked variant rendered ~3× the height of its neighbours.
- **Consultancy section** on `saas.html` (`#consultancy`), between the products and Security:
  Solution Review, Process Optimization, AI Training, Donated Software Programs, Microsoft 365
  Deployment, and a "not sure what you need?" invite mirroring the Co-Build card on the products
  grid. Deliberately carries no seat counts or discount percentages for the TechSoup and Microsoft
  nonprofit offers — those terms change, and a wrong number on a public page is worse than none.
- `#knowledgeretention` and `#co-build` anchors on `saas.html`, so the homepage service cards can
  link to the specific thing they describe rather than dumping everyone at the top of the page.

- **"In plain language — and in writing"** trust band in the `saas.html` Security section, prompted
  by partner feedback naming four fears: security, data loss, AI, and future cost. Every claim is
  sourced to a clause of the Master Service Agreement rather than written as marketing:
  no AI training on Customer Data even anonymized (Schedule B6), admin access logged and visible to
  the customer (§11 + B5), data stays the customer's and exports in a commonly usable format
  (§6, §7), breach notice without undue delay (§8), 60-day exit either way (§6).
  **Deliberately NOT claimed, because the MSA says the opposite or is silent:** backup/restore
  guarantees (B7 makes the customer responsible for its own copies and disclaims liability), any
  price cap or free-forever promise (Schedule A makes pro bono discretionary and convertible), and
  any wind-down/escrow pledge (nothing in the agreement; §22 permits assignment to a successor).
  Those need contract changes before they can go on a public page.

### Security
- **`.env.secrets.local` was not in `.gitignore`** — in a public repo, one `git add -A` from
  committing credentials world-readably. Verified never committed (`git log --all` clean), so
  nothing required rotation. Added it along with `.env.local`, `.env`, and `.zed/`.

### Removed
- **Every partner organization's name and logo, from both pages.** `saas.html` and `index.html`
  named two real nonprofits — one as a case study with its logo, the other newly added to a product
  card — plus a third named only on a product card. **The signed MSA does not license this.**
  Schedule B3 covers citing a customer's *name* in connection with a case study; §24 permits
  referencing them as a client. Neither is a trademark licence, and publishing an organization's
  logo is a distinct legal act from naming it. Partners are now described, not identified
  ("a dog rescue spanning the West Coast", "an organization focused on the foster care system",
  "a community art gallery"). `btri-banner.png` and `square-1024-white-bg.png` deleted — both were
  partner logos, the second despite its generic filename. Recoverable from `e6d67a5` when the
  relevant MSAs are signed; they remain in git history, which is public, and no history rewrite was
  performed. **Names go back when signed MSAs are in hand** — named partners are far stronger proof
  than descriptions, so this is a deliberate temporary cost.

### Changed
- **Security section reordered and rewritten for the audience it's actually for.** It previously put
  the engineering proof first and the plain-language answers last, so a nonprofit director had to
  scroll past unsafe deserialization and CVE monitoring to reach "we never train AI on your data".
  Now: pledge → "In plain language — and in writing" (the MSA-backed promises) → "How it's built —
  for those who want the detail" (the technical proof, honestly labelled as optional for the IT
  volunteer or the funder doing due diligence).
  - Layout: `.security-lead` was a 1fr/1.2fr split with one short card beside six tall ones, leaving
    ~400px of dead column; it's now a stack. Both grids run even columns rather than ragged wraps.
  - The lead card led with "with Claude Code as an extra gate" — to a reader already nervous about
    AI, a headline saying AI writes the software. Now "Nothing reaches you without a person signing
    off on it"; the Claude Code detail stays in the body where it reassures instead of alarms.
  - "Row-Level Security across every database" named the mechanism, not the guarantee. Now "Another
    nonprofit can never see your data" — the actual fear for anyone sharing a platform — with RLS
    still named in the body for evaluators.
  - "Auditable by design" → "When your board or a funder asks, you can answer".
  - Gitleaks, Azure Key Vault, and threat monitoring were three cards saying "we practise
    engineering hygiene" to a reader who can't tell them apart. Merged into one; the proof survives
    for anyone doing diligence, without spending three cards of an ED's attention on it.
- **Stack updated: Neon and AssemblyAI.** Databases now read "Supabase or Neon, depending on the
  product". AssemblyAI transcribes KnowledgeRetention's voice interviews — stated with the specifics
  that matter to a nervous reader: training explicitly disabled, audio retained 24 hours (the
  shortest window the vendor offers) then deleted. Also stated on the KnowledgeRetention card
  itself, where someone reads "voice interview" and hesitates. This matters because the page's
  "never used to train any AI model" claim is contractual under Schedule B6 and now extends to
  AssemblyAI; the settings were verified before publishing. Config can drift — if the plan or key
  changes, the claim silently becomes false, so re-check periodically.
- **Tone pass on three cards that were fighting instead of reassuring.** The AI card ended "makes
  that your problem instead of ours" — a swipe at absent competitors that the reader meets as "your
  problem". The backup card ended "any vendor who tells you their backups make yours unnecessary is
  selling you something". "Built on infrastructure we don't have to apologize for" was a headline
  about our own defensiveness; now "Your data doesn't rest on us alone", which is the reassurance
  the paragraph actually delivers. Swagger is kept where it's earned (the hero, the pro bono card)
  and dropped where the reader is worried.
- **"TechSoup Benefits" → "Donated Software Programs".** TechSoup sells web/AI/marketing retainers
  ("enterprise-grade digital transformation services tailored for mission-driven organizations")
  through a Tapp Network partnership — i.e. a competitor to the consultancy section, not only a
  donation channel. The card now names the category and lists TechSoup alongside Microsoft and
  Google as one route in, unbolded. More accurate too: Microsoft and Google run grant programs that
  don't go through TechSoup. Note "we're a nonprofit so we can't be flipped" does **not**
  differentiate against TechSoup — they are a 501(c)(3) too.
- **Homepage service cards no longer dead-end.** AI Integration → `saas.html#co-build`,
  Knowledge Systems → `saas.html#knowledgeretention` (it described a capability we had since turned
  into a product, with nothing linking them), Digital Transformation and Infrastructure
  Modernization → `saas.html#consultancy`. Previously two of six cards were links and four were
  inert, all styled identically.
- "How It Works" on `saas.html` went straight from "co-build with the partner" to "open it to the
  sector", skipping the testing loop that actually happens. New step 03 — "You decide when it's
  right" — covers it in partner terms rather than engineering ones: changes are tested before they
  ship, the partner uses it on real work, and iteration continues until they say it's finished.
  Grid is now four columns. Azure DevOps tracking and unit-test detail were deliberately left off:
  they answer a technical evaluator's question, and "audit trail over our code" sitting near
  "every admin action in your system is logged and visible to you" (§11/B5) blurs the claim that
  actually matters to a nonprofit.
- The old step 03 promised "free tiers where we can" — the same unbacked generosity removed from the
  pricing principle. Replaced with credit to the partner whose use proved the product.
- The "Nonprofit-appropriate pricing" principle ("free tiers where the mission justifies it") stated
  a generosity the contract doesn't. Replaced with the actual Schedule A deal, up front: pro bono in
  exchange for a case study within 75 days of go-live, 15-day grace, conversion to the published
  annual plan for 12 months if it isn't delivered — plus the B4 protections (reminder before the
  deadline, written confirmation before any fee is payable).
- "Your data never used to train commercial models" understated Schedule B6, which forbids training
  **any** AI model on Customer Data, including anonymized or aggregated. Corrected in the
  infrastructure paragraph and the "Your data, your call" principle.
- Board intro on `index.html` no longer says titles and bios "are being finalized and will be
  published here soon" — the board has a quorum and all five bios are published. Now matches the
  wording already on `board.html`.
- Erik's title breaks after "Founding Secretary &" so the two roles read on separate lines. The
  `board.html` renderer sets titles via `textContent`, so it now splits on `\n` and inserts `<br>`;
  other members' titles are unaffected.
- Renamed his headshot from `Erik Øerum Hansen.png` to `Erik_Oerum_Hansen.png`. Every other asset
  in the repo is ASCII with underscores; a `Ø` and spaces in a URL path have to be percent-encoded
  and are an easy source of 404s on a static host. The displayed name keeps the Danish `Ø`.
- "What We Do" on `index.html` now states plainly that custom AI is one thing we do, not the only
  one — the section read as a bespoke-AI pitch while ready-made products and consultancy are just
  as much of the offer.
- The "Our Solutions" card on `index.html` said "Three purpose-built solutions — CartonCrew ·
  RescueCentral · SchoolPTA". It had been stale since CartonCrewStudio shipped; now lists all five.
  Same for the `saas.html` meta description, which named the same three.
- `saas.html` hero no longer opens "**Software** for needs the market forgot" while the consultancy
  section further down says "Sometimes the answer isn't new software" — the page contradicted itself
  the moment consultancy landed. Now "For needs the market forgot — or priced out", and the lede
  walks all three modes (ready-made products, consultancy, custom co-build) instead of leading with
  custom builds. It also claimed "Three flagship products" while naming four; now five.
- The same lede opened "Most nonprofit software is either too expensive..." while the consultancy
  section offers to get you that software donated or discounted — the page raised price as the
  problem and then solved it, arguing against its own products. Reframed on the distinction the
  CartonCrew card already makes ("enterprise software with a charity discount bolted on"): a donated
  licence fixes price, not fit. Products and TechSoup benefits now read as complementary.
- Replaced the "Nonprofit Tech Benefits" card on `index.html` with a **Consultancy** card linking to
  `saas.html#consultancy`. The two sold the same TechSoup/vendor-benefits pitch in two places with
  no link between them; the new card keeps the TechSoup detail and covers reviews, process, training
  and M365 too. Grid stays 3×2.

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
