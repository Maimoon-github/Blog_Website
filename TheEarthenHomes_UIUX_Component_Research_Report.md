# The Earthen Homes — UI/UX Component Research Report

**Prepared by:** Senior UI/UX Component Researcher
**Date:** 29 May 2026
**Source Materials:** `TheEarthenHomes_WebsiteContent.docx`, `TheEarthenHomes_InternalLinking_TopicalAuthority.pdf`
**Pages Analyzed:** Homepage, Earth Building Techniques, Earth-Sheltered Homes, Earthships & Off-Grid Living, Affordable Earthen Homes, Benefits of Earthen Homes

---

## ⚠️ Scope Note — Read This First

The brief asks for component research "based on the provided attachments (screenshots, design mockups, style guides…)." The materials supplied are **content and SEO strategy documents**, not visual artifacts. No screenshots, mockups, wireframes, color palettes, typography decisions, or existing component renderings were included.

A true Stage 1 component audit ("extract the components visible in the design") is therefore impossible. What is possible — and arguably more valuable at this stage of the project, since the site appears to be pre-build — is the inverse: **reverse-engineer the component system the content demands**, identify gaps where the content cannot be presented effectively with conventional patterns, and deliver a design system blueprint the team can build against.

That is what this report does. Every component, issue, and recommendation below is derived from structural patterns in the actual written content and the linking architecture specified in the topical authority blueprint.

---

## 1. Executive Summary

Five findings, ranked by impact on the project.

**Finding 1 — The content is genuinely modular and ready for an atomic design system.**
Across six pages, the same dozen content patterns recur: hero blocks, prose sections, boxed callouts, comparison tables, advantages/disadvantages pairs, real-world case study blocks, numbered reason cards, and featured-article grids. This regularity is unusual for content written without a component contract — it suggests the writer was already thinking structurally. The site can be assembled from roughly **3 page templates, 14 organisms, 7 molecules, and 12 atoms** (see hierarchy diagram above). A small system, not a sprawling one.

**Finding 2 — One callout component is being asked to do five different jobs.**
The "Did You Know?" / sidebar-box treatment appears at least eleven times across the six pages, but it carries **fundamentally different content types**: a single statistic ("30% of the world's population live in homes built with earth"), a multi-item principle list (the Earthship six design principles), a real-world case example ("A family in rural Portugal completed a 600 sq ft cob home for under $1,500"), an educational definition (the cob key principle), and a numerical comparison (embodied carbon: 80 vs 4–6 tonnes). Forcing all five into the same visual treatment loses scannability and confuses information hierarchy. **This is the single largest design opportunity in the system.**

**Finding 3 — The content is visually rich, but no image components exist.**
The content describes color, texture, sculptural form, "honey-colored walls," "geological striations," "organic curves," and "earth-colored forms rising from the desert like ancient ruins." The subject is _inherently visual_. Yet the source documents specify zero image slots, no gallery component, no hero illustration treatment, no project photo treatment for case studies, no diagrams for technical processes (the cob building steps would benefit enormously from a process illustration). This is a critical gap — for a niche where the dominant competing content is documentary video and Instagram-grade photography, an all-text site will underperform.

**Finding 4 — The linking strategy specifies behavior the UI must support, but the UI affordances haven't been defined.**
The topical authority blueprint mandates 5–12 internal links per page, with rules about anchor text variation, "bridge links" between content clusters, satellite-to-pillar back-references, and avoidance of orphan pages. These rules describe _what_ should link to _what_, but they don't define the **visual treatment** for each link type. A bridge link to a different cluster should not look identical to a satellite link within the same cluster — yet currently both would be plain inline anchors. The site needs at minimum three link variants (in-cluster, cross-cluster bridge, inline citation) plus a dedicated "Related in this cluster" sidebar/footer component.

**Finding 5 — The Affordable Earthen Homes page is the conversion page and has no conversion UI.**
The linking strategy identifies this page as the highest-intent entry point: "people who want to build but believe they cannot afford to." It also notes lead-magnet opportunity ("a free cost calculator or PDF checklist would work well here"). The content has the right argumentation but **no conversion affordance is specified anywhere** — no email capture component, no calculator widget, no PDF download CTA. This is a strategic gap, not just a design one.

**Overall assessment:** The content is strong and structurally consistent enough to build a tight, opinionated component system from. The biggest design risk is treating "callout" and "table" as monolithic when they each need 3–5 variants. The biggest strategic risk is shipping a text-only site for a visually-driven subject.

---

## 2. Component Inventory

The inventory below lists every distinct component required to present the supplied content, organized by atomic design layer. The "Source" column cites the specific page(s) where the pattern appears so each item is traceable back to evidence.

### 2.1 Atoms (primitives)

| ID  | Name                    | Description                                                                             | States & Variants                                                                                   | Source / Occurrence                             |
| --- | ----------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| A01 | Logo / Wordmark         | "🏡 THE EARTHEN HOMES" brand mark at top of every page                                  | Default, hover, mobile-compact (icon only)                                                          | All 6 pages, header band                        |
| A02 | Page Title (H1)         | Main page heading (e.g. "Welcome to The Earthen Homes")                                 | Default only                                                                                        | All 6 pages                                     |
| A03 | Section Heading (H2)    | Major section dividers ("What Are Earthen Homes?", "Cost Breakdown by Building Method") | Default, anchored (with `#hash` jump link)                                                          | 8–12 per pillar page                            |
| A04 | Subsection Heading (H3) | Sub-topics within a section ("What Is Cob?", "Thermal Performance")                     | Default, anchored                                                                                   | 6–20 per pillar page                            |
| A05 | Body Paragraph          | Long-form prose, 16px serif recommended (warmth/tradition fit)                          | Default, lead paragraph (larger)                                                                    | Every page, dominant content                    |
| A06 | Inline Link             | Text-embedded internal/external link with descriptive anchor                            | In-cluster (default), cross-cluster bridge (distinct), external, visited, focus                     | Required by linking strategy: 5–12 per page     |
| A07 | Bullet List Item        | Unordered list element                                                                  | Default, with bold lead-in (definition-list variant — see "What Earthen Homes Cannot Cut Costs On") | Most pages                                      |
| A08 | Numbered List Item      | Ordered list element (the cob build process)                                            | Default, completed (for interactive checklists later)                                               | Earth Building Techniques                       |
| A09 | Strong / Bold           | In-prose emphasis                                                                       | Default                                                                                             | Throughout                                      |
| A10 | Em-Dash Inline Phrase   | Editorial parenthetical (used very heavily — three times in this sentence)              | Default                                                                                             | Throughout — note typography implication        |
| A11 | Tag / Category Chip     | Used in the Featured Articles table ("Beginner's Guide", "Most Popular", "Practical")   | Default, hover, active filter                                                                       | Homepage; will recur on satellite article cards |
| A12 | Footer Tagline          | Closing brand line ("Ancient material. Timeless wisdom. Modern living.")                | Default                                                                                             | Homepage, Benefits page, site footer            |

### 2.2 Molecules (small composites)

| ID  | Name                  | Description                                                                                    | States & Variants                          | Source / Occurrence                                        |
| --- | --------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| M01 | Featured Article Card | Category tag + article title, used in the homepage "Start Here" grid                           | Default, hover, with optional thumbnail    | Homepage "Featured Articles to Start Your Journey"         |
| M02 | Pillar Nav Item       | Label + 1-sentence description, used in "What You'll Find" list                                | Default, hover, current-section indicator  | Homepage and footer sitemap                                |
| M03 | Stat / Number Callout | Extracted figure with caption (e.g. "30%" + "of the world's population live in earthen homes") | Default; small/large; with source citation | Should be extracted from "Did You Know?" callouts          |
| M04 | Numbered Reason Card  | Number + H3 + supporting prose (the "Six Compelling Reasons" pattern)                          | Default, with optional icon slot           | Homepage, Benefits page                                    |
| M05 | Comparison Row        | One row in a two-column comparison (e.g. Cob behaviour vs Adobe behaviour)                     | Default, alternating row shade             | Earth Building Techniques "Cob vs Adobe" table             |
| M06 | Table Row             | Generic data row for performance metric tables                                                 | Default, header row, footnote row          | All pages with tables                                      |
| M07 | Breadcrumb Trail      | Home › Cluster › Article                                                                       | Default, current page (non-link last item) | Not in current content but required for 3-click depth rule |

### 2.3 Organisms (large composites)

| ID  | Name                                 | Description                                                                                | States & Variants                                                          | Source / Occurrence                                                         |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| O01 | Site Header / Top Nav                | Logo + primary nav (5 pillars) + search + mobile menu trigger                              | Default, scrolled-compact, mobile drawer open                              | All pages                                                                   |
| O02 | Page Hero Block                      | Brand band ("🏡 THE EARTHEN HOMES") + H1 + subtitle/tagline                                | Default; with-image variant (recommended addition); homepage-large variant | All pages                                                                   |
| O03 | Callout Box — **Stat variant**       | Single number + label + short context                                                      | Default, with citation footnote                                            | "DID YOU KNOW?" (homepage); "THE NUMBERS: EMBODIED CARBON" (Benefits)       |
| O04 | Callout Box — **Principle variant**  | Educational definition box ("KEY PRINCIPLE")                                               | Default                                                                    | Earth Building Techniques; many candidates throughout                       |
| O05 | Callout Box — **Example variant**    | Real-world case study mini-block ("REAL EXAMPLE: A $1,500 HOME")                           | Default; with photo slot (recommended)                                     | Affordable Earthen Homes                                                    |
| O06 | Callout Box — **Multi-Item variant** | Numbered list within callout treatment (the 6 Biotecture principles)                       | Default                                                                    | Earthships page — but this is genuinely a different component, see Issue C1 |
| O07 | Callout Box — **Audience variant**   | "Who This Site Is For" persona/audience addressing block                                   | Default                                                                    | Homepage                                                                    |
| O08 | Comparison Table                     | Multi-column technique/option comparison ("Choosing Your Technique")                       | 2-col, 3-col, sortable variant for future                                  | Earth Building Techniques, Affordable, Benefits                             |
| O09 | Advantages / Disadvantages Table     | Symmetric two-column pros/cons table with bullet content                                   | Default                                                                    | Earth Building Techniques (every technique uses this)                       |
| O10 | Step-by-Step Process List            | Ordered list of build steps with implied sequence ("The Cob Building Process")             | Default; expanded with diagram slot (recommended)                          | Cob section, Earthship water cascade                                        |
| O11 | Case Study Block                     | Project name + location + narrative (e.g. "The Earth House by Peter Vetsch — Switzerland") | Default; with photo, with map, with cost-breakdown sub-component           | Earth-Sheltered, Affordable, Earthships pages                               |
| O12 | Numbered Reasons Section             | Container holding 5–6 numbered reason cards (M04)                                          | Default                                                                    | Homepage "Six Compelling Reasons", Benefits page                            |
| O13 | Featured Articles Grid               | Container holding 4–8 featured article cards (M01)                                         | Default; with category filter                                              | Homepage "Featured Articles"                                                |
| O14 | Summary / Recap Table                | Concluding "what we covered" table at end of page                                          | Default                                                                    | Benefits page final summary                                                 |
| O15 | Site Footer                          | Tagline + sitemap + secondary nav + legal                                                  | Default                                                                    | All pages (recommended)                                                     |

### 2.4 Templates (page-level)

| ID  | Name                       | Composition                                                                                                                                                                                                                                                               | Source                                                    |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| T01 | Homepage Template          | Header + Page Hero + Intro Prose + Stat Callout + Numbered Reasons Section + Pillar Nav List + Audience Callout + Featured Articles Grid + Closing Prose + Footer                                                                                                         | Homepage content structure                                |
| T02 | Pillar Page Template       | Header + Breadcrumbs + Page Hero + Intro Prose + Principle Callout + (multiple Section blocks, each with H2 + prose + optional H3s + optional table or list + optional Case Study + optional Callout) + Closing Prose + Related-in-Cluster sidebar (recommended) + Footer | All 5 pillar pages share this skeleton                    |
| T03 | Satellite Article Template | Header + Breadcrumbs + Page Hero (compact) + Intro Prose + Body Sections + Related-Cluster Footer + Footer                                                                                                                                                                | Implied by linking strategy; 37 satellites to be produced |

### 2.5 Components NOT in current content but REQUIRED by strategy

These are missing from the supplied materials but are explicitly demanded by the topical authority blueprint or by basic usability for a long-form content site.

| ID  | Name                                     | Why required                                                                             | Priority     |
| --- | ---------------------------------------- | ---------------------------------------------------------------------------------------- | ------------ |
| X01 | Image / Photo Slot                       | Subject is inherently visual; no image components currently exist                        | **Critical** |
| X02 | Process Diagram Slot                     | Cob build steps, Earthship water cascade, anatomy diagrams all need visualization        | **Critical** |
| X03 | Newsletter / Email Capture               | Strategy doc identifies lead-magnet opportunity on Affordable page                       | **High**     |
| X04 | Cost Calculator Widget                   | Strategy doc names this as desired tool; pages already contain the data                  | **High**     |
| X05 | Sticky Table of Contents                 | Pillar pages run 2,500+ words across 8–12 sections — TOC essential on mobile and desktop | **High**     |
| X06 | "Related in this Cluster" Sidebar/Footer | Hub-and-spoke architecture requires visible cluster navigation, not just inline links    | **High**     |
| X07 | Bridge Link inline variant               | Cross-cluster links need visual differentiation from same-cluster links                  | Medium       |
| X08 | Breadcrumb Component                     | Required for 3-click depth rule and SEO                                                  | **High**     |
| X09 | Search component                         | Content library will exceed 40+ pages; search is table stakes                            | Medium       |
| X10 | Author / Contributor Bio                 | Content claims to draw on "builder interviews" — needs attribution component             | Medium       |
| X11 | Mobile Nav Drawer                        | Five pillars + search + sub-navigation does not fit a mobile hamburger                   | **High**     |
| X12 | Skip Link / Accessibility Affordances    | Long pages with many headings require skip-to-content                                    | **High**     |

---

## 3. Pattern Analysis

### 3.1 Patterns observed

**Hub-and-spoke is honored at the content level but invisible at the UI level.** The topical authority blueprint specifies a strict bidirectional linking topology: every satellite links to its pillar; every pillar links to all its satellites; pillars cross-link via "bridge links" to thematically adjacent pillars. This architecture works for Google and for AI citation engines, but a reader currently has no UI affordance to _see_ the cluster they're in. Reading the Cob section of Earth Building Techniques, there's no visible indication that "Cob House Cost Breakdown" or "How to Build a Cob House Step-by-Step" exist as satellite articles. The pattern needs a visible counterpart: either a "More in this cluster" sidebar, a hover-revealed cluster map, or a footer chip rail showing related articles.

**Editorial em-dash voice creates dense paragraphs.** The content style relies heavily on em-dashes for parenthetical insertions ("Earthen architecture offers something radically different — and radically better"). This is a deliberate editorial choice and reads well in prose, but it creates a typographic challenge: lines tend to run long, and visual breath inside paragraphs comes from punctuation rather than line-breaks or section dividers. The typography needs to compensate — generous line-height (1.6–1.75), max line-length capped around 65–75 characters, and slightly larger paragraph spacing than a standard prose page.

**Tables are used for at least four functionally different content types.** A single `<table>` treatment is being asked to render: (1) factual comparison data ("Cob vs Adobe Key Differences"), (2) advantages/disadvantages pairs, (3) cost breakdown by method, (4) featured article cards ("Beginner's Guide" + article title), and (5) performance metric vs benchmark ("50–80% reduction in cold climates"). The last two are not really tables — they're card grids and metric callouts that have been notated as tables in the source doc. Conflating them visually loses information value.

**The "🏡" emoji in the brand mark is risky.** Emoji rendering varies by OS and font (the Apple house has a window, the Google house has a peaked roof, Microsoft's is flat). Brand consistency across devices requires a custom SVG mark. This is a minor issue but a recurring one on every page header.

### 3.2 Anti-patterns observed

**The "Did You Know?" callout is overloaded** (largest issue). Same visual container, five distinct communication intents. Result: readers learn to treat all boxed content as decorative, and high-value information (the embodied carbon comparison, the six Biotecture principles) gets the same attention budget as a side-fact about Jericho.

**Featured Articles encoded as a 2-column table.** The homepage uses a `<table>` with "category" in column 1 and "article title" in column 2. This forces equal column widths and prevents the natural card-grid layout this content wants (4–6 cards in a responsive grid, each with a category chip _above_ the title rather than beside it). It also makes the content less scannable — readers parse two-column text horizontally, which slows discovery of which article they want next.

**Advantages/Disadvantages tables have asymmetric row counts.** The Cob comparison table lists 7 advantages and 6 disadvantages with the seventh row blank in the disadvantages column. Visually this creates an unbalanced "hole" in the table. The pattern needs either equal-count constraint (rewrite the content) or an explicit two-column list component that doesn't require row-alignment.

**Real-world case study content is encoded as plain H3 + prose.** "The Earth House by Peter Vetsch — Switzerland" and "Type 1: Bermed (Mound) Homes" both render as H3 + paragraph, but they are fundamentally different content types — one is a project case study (named entity, location, story), the other is a category definition. Same visual weight gives them equal hierarchy, which they don't deserve. Case studies want their own block treatment (project chip + photo + narrative + key stats).

### 3.3 Accessibility red flags (predicted from content structure)

Without actual designs to audit, the following are _risks_ the design phase needs to deliberately mitigate. They are predictions, not findings.

- **Color-only differentiation of bridge links** is a likely temptation. WCAG 2.1 SC 1.4.1 requires that color is not the sole differentiator. Bridge links must vary by underline pattern, icon, or weight — not just hue.
- **Earth-tone color palettes** (which the brand voice suggests: clay, terracotta, sand, moss-green) often fail AA contrast when light terracotta sits on cream. Specify token-level contrast checks during palette definition.
- **Long pages with 8–12 H2s and 20+ H3s** require correct heading hierarchy. Skipping levels (H2 → H4) breaks screen-reader navigation. Today's content respects this discipline, but the template needs to enforce it.
- **Tables of comparison data** need `<caption>`, `<th scope>`, and ideally summary text. None of this is specified in the content; the component spec must require it.
- **Em-dash heavy prose** can confuse text-to-speech engines, which sometimes read em-dashes as long pauses, sometimes ignore them. Editorial review should ensure em-dashes aren't carrying semantic weight that would be lost in audio.
- **No skip-link is specified.** Long pillar pages without a skip-to-content link are a keyboard-navigation failure.

### 3.4 Component relationships (atomic check)

- Atoms compose cleanly into molecules with no orphaned primitives.
- Molecules compose into organisms with one exception: **M03 Stat Callout** is currently embedded inside O03 (Stat Callout variant) rather than being independently reusable. If "30% of the world's population lives in earthen homes" should also appear on the Benefits summary or in a satellite article hero, the stat itself needs to be a usable molecule.
- All organisms compose into the three page templates with no leftover organisms — the system is well-bounded.
- The largest pattern-coverage gap is the **case study type** (Organism O11), which doesn't have a defined molecule for "project quick facts" (name, location, size, year, cost). Currently this metadata is buried in prose.

---

## 4. Issue Log & Recommendations

Prioritized using the standard severity framework: **Critical** (blocks usability, accessibility, or strategic goal), **Major** (degrades experience meaningfully), **Minor** (polish).

### 4.1 Critical issues

**C1 — Split the overloaded callout component into 5 distinct variants.**

- _Problem:_ One "Did You Know?" treatment doing five different jobs flattens information hierarchy.
- _Fix:_ Define five callout organisms with distinct visual treatments:
  1. **Stat callout** — large numeral, short caption, optional citation. Treatment: minimal box, oversized figure.
  2. **Principle callout** — definition treatment. Treatment: serif italic body, left border accent, no box fill.
  3. **Example callout** — real-world case mini-card. Treatment: card with project name as header, narrative as body, optional photo slot.
  4. **Multi-item callout** — numbered or bulleted list-as-callout (the Biotecture six principles). Treatment: numbered chips down the left edge, items spaced.
  5. **Comparison callout** — two figures side-by-side with context. Treatment: split layout, both numbers equally weighted, label between.
- _Effort:_ 2–3 days of design + 2 days of build.
- _Impact:_ High. Affects 11+ instances across the site immediately, plus every future satellite article.

**C2 — Add image components and require them in page templates.**

- _Problem:_ No image, gallery, or diagram component exists. Subject is inherently visual.
- _Fix:_ Define at minimum: page hero image, inline figure with caption, gallery row (3–4 thumbnails), and a process-diagram slot. Mandate at least one hero image per pillar page and at least one figure per satellite article.
- _Effort:_ 3–4 days of design + photography/illustration commissioning lead time.
- _Impact:_ Critical. A text-only site for this subject loses to Instagram, YouTube, and Pinterest before SEO even matters.

**C3 — Define link variants for the linking strategy.**

- _Problem:_ Linking strategy specifies three logical link types (in-cluster satellite, cross-cluster bridge, external citation) but no visual treatments exist.
- _Fix:_ Define inline link variants:
  - In-cluster: underline only, default color
  - Cross-cluster bridge: underline + small inline icon (e.g. arrow-right) or distinct hue
  - External: underline + external-link icon
- _Effort:_ Half day of design tokens.
- _Impact:_ High. Enables the entire linking strategy to function as designed.

**C4 — Add a "Related in this cluster" sidebar/footer component.**

- _Problem:_ Hub-and-spoke linking is invisible to readers without a visible cluster navigation affordance.
- _Fix:_ Sidebar (desktop) or footer chip-rail (mobile) on every pillar and satellite page showing all other articles in the same cluster, with the current article indicated. Auto-generated from cluster taxonomy.
- _Effort:_ 2 days of design + 3 days of build (taxonomy-driven).
- _Impact:_ High. Directly supports the 3-click rule, reduces orphan-page risk, increases pages-per-session.

**C5 — Add conversion UI to the Affordable Earthen Homes page.**

- _Problem:_ Identified as highest-intent page; has no conversion affordance.
- _Fix:_ Add at minimum (a) an inline email capture component below "The Owner-Builder Advantage" section, (b) a CTA card for "Free Cob House Cost Breakdown PDF" lead magnet, (c) a sticky CTA on scroll for the lead magnet. Build the cost calculator widget (X04) as a phase-2 enhancement.
- _Effort:_ 2 days for capture + CTA. Calculator is a 1–2 week project.
- _Impact:_ High strategic. This is where audience-building converts to list-building.

**C6 — Define and enforce heading hierarchy in templates.**

- _Problem:_ No spec enforces correct heading nesting. Risk of screen-reader breakage as content scales.
- _Fix:_ Template spec must allow only valid H1→H2→H3 nesting. CMS or build-time linting recommended.
- _Effort:_ 1 day of spec + ongoing.
- _Impact:_ Critical for accessibility, important for SEO.

### 4.2 Major issues

**M1 — Convert "Featured Articles" from table to card grid.**

- _Problem:_ Encoded as 2-column table; should be a responsive card grid.
- _Fix:_ Build O13 (Featured Articles Grid) as a real grid; deprecate the table use here.
- _Effort:_ 1 day.
- _Impact:_ Better discoverability of homepage's most important links.

**M2 — Build dedicated Case Study Block organism.**

- _Problem:_ Real-world examples ("Peter Vetsch", "$10,000 Cob Cottage", "Adobe Homestead") buried as H3 + prose.
- _Fix:_ O11 Case Study Block with: project name, location pin, year built (where known), cost (where known), key technique tags, narrative body, optional photo gallery.
- _Effort:_ 2 days design + 2 days build.
- _Impact:_ Case studies are the site's most shareable content; current treatment under-promotes them.

**M3 — Add a sticky Table of Contents on pillar pages.**

- _Problem:_ Pillar pages run 2,500+ words, 8–12 sections. No navigation aid.
- _Fix:_ Right-side sticky TOC on desktop, collapsible top-of-page TOC on mobile. Auto-generated from H2 headings.
- _Effort:_ 2 days.
- _Impact:_ Time-on-page, bounce rate, scroll-depth metrics all improve. AI citation engines also benefit from clear section structure.

**M4 — Replace the brand emoji with a custom SVG mark.**

- _Problem:_ 🏡 rendering varies by platform.
- _Fix:_ Commission a simple SVG house/earth mark; use across all surfaces.
- _Effort:_ 1–2 day design exercise.
- _Impact:_ Brand consistency; cleaner header at small sizes.

**M5 — Add Breadcrumb component to all non-homepage pages.**

- _Problem:_ Specified by 3-click depth rule, not present in current materials.
- _Fix:_ Standard breadcrumb molecule: Home › Pillar Cluster › Current Page.
- _Effort:_ Half a day.
- _Impact:_ Required for the architecture rule to function; helps SEO via structured data.

**M6 — Resolve asymmetric Advantages/Disadvantages tables.**

- _Problem:_ Equal-column tables with unequal row counts leave visual holes.
- _Fix:_ Two parallel bulleted lists side-by-side (O09 variant) rather than a forced-row table. Or, rewrite content to balance counts.
- _Effort:_ Half a day design; editorial pass on existing content.
- _Impact:_ Visual polish; better mobile collapse behavior (each list stacks cleanly).

**M7 — Define an Audience/Persona Callout (O07) as its own variant.**

- _Problem:_ "Who This Site Is For" uses the same table treatment as other callouts.
- _Fix:_ Distinct treatment — perhaps a left-aligned column with persona icons or a horizontal pill rail.
- _Effort:_ 1 day.
- _Impact:_ This block is the homepage's clearest signal of "is this site for me?" — it deserves dedicated treatment.

### 4.3 Minor issues

**N1 — Inline footnote / source citation pattern.** The Benefits page cites U.S. DOE, EPA. The Earth Building Techniques page references historical sources. Currently inline as prose. A subtle superscript footnote pattern (linking to a sources section) would improve credibility signaling without disrupting reading flow.

**N2 — "Note:" disclaimer paragraphs have no treatment.** The Affordable page has a "Note: All figures represent material costs…" sentence that visually reads like any other paragraph but is functionally a disclaimer. A subtle muted-text-with-icon treatment would mark its different role.

**N3 — Typography: serif vs sans selection.** The brand voice ("ancient material, timeless wisdom") suggests a serif body face for warmth and tradition. UI labels (nav, buttons, metadata) should stay sans for clarity. The em-dash-heavy editorial voice depends on a serif with well-cut em-dashes (Source Serif, Lora, Spectral, or Crimson Pro all work; system serif is risky).

**N4 — Loading and empty states.** Not yet relevant since content is static, but the cost calculator (X04) and any search (X09) will need them. Specify early.

**N5 — Dark mode.** Earth-tone palettes are sensitive to dark mode (clay and terracotta become muddy on black). Decide whether to support dark mode now and design tokens accordingly, or commit to light-only. A blanket "earth tones don't go dark" position is defensible for this brand.

### 4.4 Issues by severity — at a glance

| Severity | Count | IDs                        |
| -------- | ----- | -------------------------- |
| Critical | 6     | C1, C2, C3, C4, C5, C6     |
| Major    | 7     | M1, M2, M3, M4, M5, M6, M7 |
| Minor    | 5     | N1, N2, N3, N4, N5         |

---

## 5. Design System Opportunities

### 5.1 Tokens to define before any component is built

| Token category     | Specific tokens needed                                                                                  | Notes                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Color              | 1 brand earth-tone palette (~6 shades), 1 neutral ramp (~9 stops), semantic colors for callout variants | Each callout variant should map to a token, not a hex           |
| Typography         | 1 serif (body), 1 sans (UI), 1 mono (rare — for cost/measurement data)                                  | 8-step scale, 1.25 ratio                                        |
| Spacing            | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px (consistent base of 4)                                      | Generous spacing fits the "groundedness" brand voice            |
| Border radius      | 0 (rare), 4 (cards), 8 (callouts), 999 (chips/pills)                                                    | Avoid extreme rounding — feels modern-tech, not earthen         |
| Elevation / shadow | **None.** Or one extremely subtle "raised" level.                                                       | Earthen homes are about groundedness; floating cards feel wrong |
| Line lengths       | Body max-width: ~720px (~65–75ch). Callout: ~560px.                                                     | Already discussed under em-dash voice                           |

### 5.2 Components to consolidate

| Currently treated as                        | Should be consolidated into                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| 11+ "Did You Know?" boxes                   | 5 distinct callout variants (C1)                                                     |
| 7+ different table treatments               | 3 table organisms: comparison, performance/data, and **deprecate** "table for cards" |
| Case study H3+prose (5+ instances)          | 1 Case Study Block organism (M2)                                                     |
| Bulleted lists with bold lead-in vs without | 2 list variants: standard bullets, definition list                                   |

### 5.3 Components to add (full list)

From section 2.5, the missing component priorities for first build:

1. Page hero image slot + inline figure (X01)
2. Process diagram slot (X02)
3. Newsletter capture + Cost calculator widget (X03, X04)
4. Sticky table of contents (X05)
5. Related-in-cluster sidebar/footer (X06)
6. Bridge link visual variant (X07)
7. Breadcrumb (X08)
8. Search (X09)
9. Author/contributor bio (X10)
10. Mobile nav drawer (X11)
11. Skip-to-content link (X12)

### 5.4 Documentation needs

For a content site this size (6 pillars + 37 planned satellites + 90-day publishing roadmap), the component documentation should include:

- **Component library** (Storybook or equivalent) with all variants visible side-by-side
- **Anchor text style guide** baked into the inline-link component's documentation (variant rules from the SEO strategy doc)
- **CMS-level content models** that enforce the right component for each content type (a "case study" content type in the CMS slots directly into O11, not into a generic "rich text" block)
- **Editorial guidelines** for callout variants (when to use stat vs principle vs example) — without this, content editors will default to whatever's first in the dropdown
- **Accessibility checklist** per template, run before every new pillar or satellite launches

### 5.5 Phased build recommendation

Aligned with the strategy doc's 90-day publishing roadmap:

| Sprint                | Components delivered                                                                                         | Pages enabled                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Sprint 0 (foundation) | Tokens, Atoms, Site Header, Site Footer, Page Hero, Breadcrumb, basic Body & Section                         | Static landing only                                        |
| Sprint 1              | Callout variants (5), Comparison Table, Step List, basic image components, Case Study Block                  | Earth Building Techniques + Benefits (month 1 of strategy) |
| Sprint 2              | Related-in-Cluster, TOC, Numbered Reasons, Featured Grid, Audience Callout, Pillar Nav                       | Homepage + Affordable Earthen Homes (month 1–2)            |
| Sprint 3              | Earth-Sheltered + Earthships templates (rely on existing organisms), Bridge link variant, Newsletter capture | Earth-Sheltered + Earthships pillars (month 2)             |
| Sprint 4              | Cost Calculator widget, Search, Author bio, Mobile nav polish, full accessibility audit                      | All satellites publishing begins (month 3+)                |

---

## Appendix A — Materials Reviewed

**Document 1:** `TheEarthenHomes_WebsiteContent.docx` — complete copy for 6 pages, dated 14 May 2026. Includes SEO metadata blocks (internal, not for render), prose body, callouts, tables, and lists.

**Document 2:** `TheEarthenHomes_InternalLinking_TopicalAuthority.pdf` — SEO strategy document specifying hub-and-spoke architecture, 5 content clusters, 37 satellite articles, anchor text rules, and a 90-day publishing roadmap.

**Materials NOT provided** (and required for a complete component audit): screenshots of any existing design, visual style guide, brand color palette, typography decisions, logo files, photography direction, existing component library, user research / persona documentation, analytics from any predecessor site, competitive UI references.

---

## Appendix B — Open Questions for the Project Team

These should be answered before component design begins.

1. Is there an existing brand visual identity (colors, typography, logo) that the components must conform to, or is this a greenfield design system?
2. Is the site running on a CMS (which one?), a static site generator, or custom? Component architecture differs significantly.
3. Who provides photography? Is there a photo library, a budget for commissioned shoots, or only stock? This determines how aggressively to design around image components.
4. Is dark mode a requirement?
5. Is internationalization in scope? (Content references "rural Pakistan to suburban California" — does the audience cross languages?)
6. What are the analytics goals — newsletter signups, time-on-page, AI citation share-of-voice, ad revenue, affiliate conversions? The conversion UI on the Affordable page (C5) depends on the answer.
7. Is the cost calculator (X04) in scope for v1, or a v2 enhancement?
8. Are there pre-existing trademarks or visual conventions in the natural-building community that the brand should signal alignment with (or avoid)?

---

_End of report._
