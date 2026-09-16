---
name: Portofolio Muhammad Rafiq Amin
description: A portfolio written as a product changelog; white paper, one ink, one green dot for what is live.
colors:
  paper: "#ffffff"
  paper-2: "#f6f7f8"
  ink: "#111318"
  ink-2: "#5b6068"
  rule: "#e6e8eb"
  rule-2: "#d3d6db"
  live: "#0f7b3f"
  live-dot: "#1fa35a"
typography:
  display:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(38px, 4.6vw, 60px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(28px, 3vw, 40px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  page-title:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(32px, 3.6vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(19px, 1.7vw, 23px)"
    fontWeight: 450
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  body-lg:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  caption:
    fontFamily: "Mona Sans, system-ui, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  focus: "4px"
  sm: "6px"
  lg: "10px"
  pill: "999px"
  circle: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  bar-h: "56px"
  wrap: "1120px"
  measure: "720px"
  rail: "180px"
  rail-gap: "40px"
  entry-gap: "44px"
  section-pad: "clamp(40px, 5vw, 64px) clamp(44px, 6vw, 80px)"
  month-pad: "32px 40px"
  stack: "10px"
  stack-md: "12px"
  stack-lg: "20px"
  row-pad: "14px 0"
components:
  button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
    height: "42px"
    typography: "{typography.body-sm}"
  button-hover:
    backgroundColor: "{colors.paper-2}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "#2a2e36"
  button-sm:
    padding: "7px 14px"
    height: "36px"
    typography: "{typography.label}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
    height: "34px"
    typography: "{typography.label}"
  chip-hover:
    backgroundColor: "{colors.paper-2}"
  chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  status:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "4px 10px 4px 8px"
    typography: "{typography.caption}"
  status-live:
    textColor: "{colors.live}"
  shot:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.lg}"
  shot-caption:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    padding: "9px 12px 11px"
    typography: "{typography.caption}"
  diagram:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "12px"
  topbar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.bar-h}"
  topbar-scrolled:
    backgroundColor: "rgba(255, 255, 255, 0.86)"
  brand:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  brand-avatar:
    rounded: "{rounded.circle}"
    size: "30px"
  nav-link:
    textColor: "{colors.ink-2}"
    padding: "0 12px"
    height: "{spacing.bar-h}"
    typography: "{typography.body-sm}"
  nav-link-active:
    textColor: "{colors.ink}"
  nav-toggle:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    size: "44px"
  nav-toggle-hover:
    backgroundColor: "{colors.paper-2}"
  nav-panel:
    backgroundColor: "{colors.paper}"
    padding: "8px {spacing.gutter} 16px"
  foot-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  nav-panel-link:
    textColor: "{colors.ink-2}"
    padding: "0 4px"
    height: "48px"
    typography: "{typography.body-lg}"
  avatar:
    rounded: "{rounded.circle}"
    size: "116px"
  date-rail:
    textColor: "{colors.ink-2}"
    width: "{spacing.rail}"
    typography: "{typography.body-sm}"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
---

# Design System: Portofolio Muhammad Rafiq Amin

## Overview

**Creative North Star: "The Release Log"**

The site reads like the changelog page of a product that keeps shipping, and the product is the person. Every project is a dated release entry with a checkable status; months run down the page with a sticky date rail on the left, and the reader sweeps from Sep 2026 back to Nov 2025 the way they would scan release notes. Nothing is pitched. A recruiter gets name, role, one sentence of position, and a live green dot on the newest entry inside the first screen; an engineer filters to Live and opens the links.

Material is plain white paper and one near-black ink with a single grey secondary tone; structure is carried by hairline rules, not by fills or boxes. There are no cards. The only colour the system itself owns is one green, and it is spent on a single meaning: this thing is live right now. Brand colours appear only inside the technology logos on the skills pages, and they are the logos' own colours, not the system's. One typeface, Mona Sans in a single variable file, does display, body and label work; the hierarchy is built from size, weight and the grey tone alone.

The build rejected the dark hero, the icon cloud, the card grid, and the previous engineering-drawing world (thick frames, title blocks, tracked-caps labels, a monospaced figures face, a 3D model). Motion is confined to entries rising 12px as they arrive, a 1px press on buttons, and the bar's own two gestures (the 2px underline drawing under the current page, the menu icon folding into a cross); there is no opening choreography.

**Key Characteristics:**
- Changelog anatomy: every release has the same parts in the same order (title + status, one description, one result line or a Masalah/Solusi/Hasil list, stack tags, links, optional screenshot).
- Hairline structure: 1px rules in two greys separate everything; no fills except the primary button, the pressed chip, and the tinted ground under screenshots.
- One accent, one meaning: green exists only for the Live status pill.
- One face: Mona Sans 600 for every heading, 400–550 for text, no uppercase tracking anywhere.
- One shadow in content: the screenshot frame carries a soft offset shadow; the only other shadows belong to the chrome, on the bar once content scrolls under it and on its open mobile panel.

## Colors

A white-and-ink monochrome with a warm-neutral grey and one green reserved for live status.

### Primary
- **Ink** (`ink`): the only "brand" colour. All headings and body text, the primary button fill, the pressed filter chip, focus outlines, text selection, and the skip link. Hover on the primary button lifts it to a slightly lighter ink (`#2a2e36`, hard-coded in the build).

### Secondary
- **Release Green** (`live`): the text and border tone of the Live status pill and nothing else. Its border is the same green at 35% alpha.
- **Live Dot** (`live-dot`): the filled 7px dot inside the Live pill, and the single red-dot equivalent (`.rec`) inside the hand-tracking illustration's HUD.

### Neutral
- **Paper** (`paper`): page ground, topbar ground at rest and the mobile nav panel, button, chip and menu-toggle ground, primary-button text, shot caption ground, diagram ground. Once the page has scrolled 4px the bar drops to paper at 86% alpha over a 12px backdrop blur; that is the only translucency and the only blur in the system.
- **Paper, tinted** (`paper-2`): hover ground for buttons and chips, the ground behind screenshot frames, the host box fill in the network diagram.
- **Ink, secondary** (`ink-2`): role line, meta line, section intro paragraphs, release descriptions, stack tags, date rail, table cells, captions, colophon, and the resting colour of status pills other than Live. Nav links rest here and turn to `ink` on hover or when current.
- **Rule** (`rule`): the hairline. Topbar bottom, mobile nav panel bottom and its row dividers (none after the last row), section tops, month tops, table row dividers, contact rows, skills-group tops, shot caption top.
- **Rule, strong** (`rule-2`): borders on things you can touch or look at: buttons, chips, the menu toggle, status pills, both avatar rings (intro and brand), screenshot and diagram frames, table head rule, underline colour of resting text links, the "·" separator between tags. Hover on buttons, the menu toggle and shot frames darkens it to `#b9bec6` (hard-coded).

### Named Rules
**The One Dot Rule.** Green means live and nothing else. It never colours a heading, a link, a button, or a decorative element. Demo statis, Kode privat and Repo publik pills stay grey; the honesty of the label comes from the words, not from a second or third colour.

**The Logo Exception Rule.** The only other hues on the site are the official technology logos in `img/tech.svg` (22px inline, 26px in rows, 24px under 480px). They are the vendors' colours and are never sampled into the system palette.

**The Underline Rule.** Links are ink text underlined in `rule-2`, 1px thick, 0.2em offset; the underline turns to `ink` on hover. Links do not change colour and are never green or blue.

## Typography

**Display Font:** Mona Sans (with system-ui, Segoe UI, Roboto, Arial, sans-serif), one self-hosted variable woff2, weight 200–900, width 75–125%
**Body Font:** Mona Sans (same file)
**Label/Mono Font:** none; `time` elements use `font-variant-numeric: tabular-nums` in the same face

**Character:** a single humanist grotesk doing everything, set tight at display size and loose nowhere. Weight is used in narrow steps (400 / 450 / 500 / 550 / 600) rather than jumps, so hierarchy reads as a quiet gradient. There is no uppercase, no letterspaced label voice, no italic, and no second face.

### Hierarchy
- **Display** (600, `clamp(38px, 4.6vw, 60px)`, 1.02, -0.022em, balanced): the h1 name on the home intro only.
- **Page title** (600, `clamp(32px, 3.6vw, 48px)`, 1.08, -0.02em): the h1 of Rilis, Server, Keahlian, Kontak; may carry an inline status pill at 14px.
- **Headline** (600, `clamp(28px, 3vw, 40px)`, 1.1, -0.018em): section h2s on the home page (Rilis terbaru, Keahlian, Kontak).
- **Title** (600, 22px, 1.2, -0.012em; 20px under 720px): release entry titles (h2 on Rilis, h3 on home), two-column headings, "Cara saya bekerja" heading.
- **Lead** (450, `clamp(19px, 1.7vw, 23px)`, 1.4, -0.005em, max 46ch): the one-sentence position under the name.
- **Role** (500, 20px; 18px under 720px, `ink-2`): the job-title line.
- **Body, large** (400, 17px, 1.55; 16px under 720px): section and page intros, release descriptions. The result line is the same size at 550 in `ink`; the mobile nav panel's links are the same size at 500.
- **Body** (400, 16px, 1.55): the base; skills descriptions, case-list text, how-I-work list.
- **Body, small** (500, 15px): buttons, text links, nav links (600 when current), the brand name (600), date rail, meta line, tables, contact rows, proof lines.
- **Label** (500, 14px): chips, button-sm, stack tags, case-list terms (600), skills-table head at 13px 600.
- **Caption** (500, 13px, 1.4): status pills, shot captions, diagram hint, diagram text.

### Named Rules
**The One Face Rule.** Every glyph on the site, including SVG diagram and illustration text, is Mona Sans via `var(--font)`. Do not add a monospace for figures; use `tabular-nums` on `time` instead.

**The Weight Ladder Rule.** Headings are 600, never heavier. Emphasis inside text is 550 (the result line, the Hasil row), links and labels 500, prose 400. Weight 700 or above does not appear in the build.

**The Sentence Case Rule.** Nothing is uppercase and nothing is tracked open. Eyebrows, kickers and tracked-caps labels do not exist in this world.

## Layout

One centred column, max 1120px (`wrap`), with a fluid gutter of `clamp(16px, 4vw, 40px)` on every section, the topbar and the colophon. Reading widths are capped inside it: release entries at 720px (`measure`), intros at 70ch, the lead at 46ch, the CTA line at 60ch.

The signature layout is the log: each month is a grid of a 180px date rail plus a 40px gap and the entries column. The rail is sticky at `bar-h + 28px` so the month label follows the entries under it. Months are separated by a hairline and padded 32px top / 40px bottom; entries within a month stack 44px apart. The home page shows three entries and a "Semua 16 rilis" link; Rilis shows all sixteen under a row of filter chips.

Other grids: the intro is 116px avatar + text with a 32px gap; the home skills summary is two equal columns at 32px 48px; Server uses a 1fr / 1.25fr two-column block at 40px 56px; the contact list is a 120px label column + value; the case list is an 88px term column + description; the skills table is a three-column table with a 30% first column.

Vertical rhythm: sections pad `clamp(40px, 5vw, 64px)` top and `clamp(44px, 6vw, 80px)` bottom and open with a hairline; the intro pads `clamp(40px, 6vw, 80px)` top. Inside an entry, each part sits 10–12px under the previous one and a screenshot 20px below. Rows in tables and lists pad 10–14px.

Breakpoints, each collapsing one grid:
- **900px**: the date rail goes static above its entries; entry gap 36px. The topbar collapses to brand + the WhatsApp button + a 44px menu toggle (grid `minmax(0,1fr) auto auto`, 10px gap; the CTA never leaves the bar) and the nav becomes an absolute paper panel under the bar holding the five links only: 48px hairline-divided rows at 17px, no rule after the last. It opens via `.topbar.open` (JS) and is always shown, toggle hidden, when `html` lacks the `js` class.
- **760px**: skills summary and two-col become one column.
- **720px**: intro stacks (avatar 96px), role 18px, entry titles 20px, body-large 16px.
- **640px**: skills table stacks each row as a block with `data-th` labels; phone-screenshot row becomes a horizontal scroll-snap strip at 62% width; the diagram hint appears.
- **480px**: contact rows and case rows stack; buttons stretch to fill their row; the brand name hides and the 30px avatar stands alone (on the home page it is then always visible, not scroll-gated).

Print: topbar (toggle included), chips, CTA strip and more-links are hidden, the wrap goes full width, entries avoid page breaks, filtered-out entries return, shadows and underlines are dropped, body drops to 12.5px on a 14mm page margin. The CV page carries its own copy of the same tokens with an A4 page frame.

## Elevation & Depth

The system is flat and stacked. Depth between elements is conveyed by the two rule greys (`rule` for dividers, `rule-2` for touchable or framed things) and by the tinted `paper-2` ground behind screenshots. In content the single exception is the screenshot frame, which carries a soft downward shadow so a 1024px capture reads as a placed print rather than a cutout.

The chrome has its own, smaller vocabulary. The sticky topbar is flat with a hairline underneath while the page sits at the top; once `scrollY` passes 4px it takes the `scrolled` class and becomes 86% paper over a 12px backdrop blur with a faint shadow, so content passing beneath reads as beneath (background and shadow cross-fade over 0.2s). Under 900px the open nav panel casts a slightly longer shadow onto the page. Both are separators between chrome and content, not elevation of a container.

### Shadow Vocabulary
- **Shot** (`box-shadow: 0 14px 32px -20px rgba(17, 19, 24, 0.4)`): the screenshot figure only. On hover it deepens to `0 18px 40px -20px rgba(17, 19, 24, 0.5)` and the border darkens, over 0.25s. Removed in print.
- **Bar, scrolled** (`box-shadow: 0 8px 24px -20px rgba(17, 19, 24, 0.35)`, with `backdrop-filter: blur(12px)` on `rgba(255, 255, 255, 0.86)`): the sticky topbar only, only after 4px of scroll. Never at rest, never on any other element.
- **Nav panel** (`box-shadow: 0 16px 32px -24px rgba(17, 19, 24, 0.4)`): the mobile nav panel under 900px while open.

### Named Rules
**The One Shadow Rule.** In content, only `figure.shot` may cast a shadow. Buttons, chips, the diagram, tables and any future container are flat with a `rule-2` border at most. The two chrome shadows (the scrolled bar, the open nav panel) exist to separate the bar from content moving under it and are not a licence for shadowed containers; the bar itself is flat at rest.

**The One Blur Rule.** Backdrop blur appears in exactly one place: the sticky bar in its scrolled state. No panel, overlay or frame is translucent or frosted.

**The Press Rule.** Pressing a button or chip moves it down 1px (`translateY(1px)`, 0.1s). Apart from the bar's two drawn gestures (the active underline's `scaleX` and the menu icon's line rotation, both 0.2s `ease-out`), that is the only transform in the component set; nothing lifts on hover.

## Shapes

Corners are gently rounded and come in exactly three sizes: 6px (`sm`) on buttons and the skip link, 10px (`lg`) on screenshot and diagram frames, and a full pill (999px) on chips and status pills. The avatar is a circle with a `rule-2` ring, at 116px in the intro and 30px in the bar's brand. The menu toggle is a 44px square at the 6px button radius. The current-page marker in the bar is a 2px ink bar, inset 12px from each side of the link and sitting on the hairline. Focus is a 2px solid ink outline offset 3px with a 4px radius. Borders are always 1px (1.5px only for the hollow status dot). Screenshots are clipped by the frame's overflow, phone screenshots are cropped to 430/900. SVG diagram boxes are 1.2px ink strokes with white fill; hosts are `paper-2` with a `rule-2` stroke; stores are dashed `3 3`; the bus is a 2px ink line and wires 1.2px `ink-2`.

## Components

### Topbar (`header.topbar#topbar`, `.brand`, `.site-nav`, `.nav-cta`, `.nav-toggle`)
Character: a thin masthead that stays put and frosts only once the page moves under it.
- **Style:** sticky, 56px on every width, paper ground, hairline bottom, three-column grid (`auto minmax(0, 1fr) auto`: brand / nav / CTA, in that markup order, with the toggle last) with a 20px gap inside the wrap and the fluid gutter.
- **Brand:** a 30px round avatar (`img/avatar.webp`, `rule-2` ring) and the name at 15px 600 ink, 10px apart, no underline; the name is ellipsised when squeezed and hidden under 480px. On the home page (`body.home`) the avatar starts at opacity 0 / `scale(0.6)`, since the 116px intro avatar is already on screen, and fades up over 0.25s (`ease-out` on the scale) once the bar is `scrolled`; under 480px it is always visible.
- **Nav links:** a list of full-height (56px) items, 0 12px padding, 4px apart, right-aligned in the middle column, 15px 500 `ink-2`; ink on hover (0.15s). The current page (`aria-current="page"`) is ink 600 with a 2px ink underline drawn by `::after` at the bar's bottom edge, inset 12px each side, scaling in from the left over 0.2s `ease-out`.
- **Action:** one `btn btn-primary btn-sm` "Chat WhatsApp" (`.nav-cta`) in the third column, a direct child of the bar, so it stays beside the toggle at every width.
- **Scrolled** (`.topbar.scrolled`, set by JS when `scrollY > 4`): paper at 86% over a 12px backdrop blur, with the bar shadow; background and shadow transition 0.2s. Without JS the bar simply stays opaque paper.
- **Mobile (900px):** the bar becomes brand + CTA + a 44px bordered toggle (`.nav-toggle`, paper ground, `rule-2` border, 6px radius, hover `paper-2`; grid `minmax(0, 1fr) auto auto`, 10px gap) holding a 20px three-line icon whose lines rotate into a cross when `aria-expanded="true"`. The nav becomes an absolute paper panel under the bar (`8px gutter 16px` padding, hairline bottom, the panel shadow) holding only the five links: 48px rows divided by hairlines at 17px 500, no rule after the last row, no underline marker. `.topbar.open` shows it; Escape, an outside click or choosing a link closes it; `html:not(.js)` shows the panel permanently and hides the toggle.
- **Reduced motion:** the bar, its links, the underline and the icon lines lose their transitions.

### Buttons (`.btn`, `.btn-primary`, `.btn-sm`)
Character: quiet, bordered, slightly rounded; the primary is the ink itself.
- **Shape:** 6px radius, 1px `rule-2` border, 42px min height, 10px 18px padding, 15px 600, inline-flex with an 8px icon gap.
- **Default:** paper ground; hover tints to `paper-2` with a darker border (`#b9bec6`).
- **Primary:** ink fill and border, paper text; hover `#2a2e36`.
- **Small:** 36px, 7px 14px, 14px.
- **Active:** 1px press. **Focus:** global ink outline. Under 480px buttons grow to fill the row.

### Text links (`.textlink`, `.links a`, inline `a`)
- **Style:** ink, 500, underline in `rule-2` at 0.2em offset; hover underline in ink. Outbound links end with a 14px `#i-out` arrow and internal ones with `#i-right` from the inline sprite. `.more-link` is 16px 600 with no underline until hover.

### Chips (`.chip[aria-pressed]`)
Character: status filter toggles on Rilis; a pressed chip inverts to ink.
- **Style:** pill, 1px `rule-2` border, 34px min height, 7px 14px, 14px 500, paper ground; hover `paper-2`; active 1px press.
- **State:** `aria-pressed="true"` fills with ink and sets paper text. Five chips: Semua, Live, Demo statis, Kode privat, Repo publik. Without JS all entries show; with JS the chip hides non-matching entries and empty months, and a hash link to a hidden entry resets the filter to Semua.

### Status pills (`.status`, `.status-live`, `.status-demo`, `.status-private`, `.status-public`)
Character: the honesty label; sits inline after the entry title.
- **Style:** pill, 1px `rule-2` border, 4px 10px 4px 8px, 13px 500, `ink-2`, with a leading 7px ring drawn in `currentColor` at 1.5px.
- **Live:** text in `live`, border in `live` at 35% alpha, ring filled with `live-dot`.
- **Kode privat:** ring filled with `ink-2`. **Demo statis** and **Repo publik:** the base hollow ring; the build has no dedicated rule for either, so they are visually identical.

### Release entry (`.release`)
Character: the unit of the whole site; identical anatomy so the reader can sweep.
- **Title:** 22px 600 with the status pill wrapped inline (6px 12px gap).
- **Description** (`.desc`): 17px `ink-2`, 10px below.
- **Result** (`.result`): 17px 550 ink, one line, 10px below; or a **case list** (`dl.case`): hairline-topped rows of Masalah / Solusi / Hasil with an 88px 14px 600 term column, `ink-2` descriptions, the last row (Hasil) in ink at 550.
- **Tags** (`.tags`): 14px `ink-2` list separated by `rule-2` middle dots, 12px below.
- **Links** (`.links`): 15px 500 underlined links, 8px 20px apart.
- **Arrival:** with JS and motion allowed, entries not yet on screen start at opacity 0 / +12px and rise over 0.32s `cubic-bezier(0.2, 0.8, 0.2, 1)` when they intersect (rootMargin -8%); entries already in view get `.in` before the `reveal` class is set, so nothing flickers. Reduced motion or no IntersectionObserver: everything visible, no transition.

### Date rail (`.log > .month > .when`)
Character: the changelog's month column.
- **Style:** 15px 500 `ink-2`, 180px wide, sticky at `bar-h + 28px`, static under 900px. `time` uses tabular figures.

### Screenshot frame (`figure.shot`, `.shot-cap`, `.shots-phone`, `.illus`)
Character: a placed print with a soft shadow.
- **Style:** 1px `rule-2` border, 10px radius, `paper-2` ground, overflow hidden, 20px above; the One Shadow; the image is a block at 100% width with explicit dimensions and lazy loading. Live screenshots are wrapped in a link to the live site.
- **Caption:** hairline top, 9px 12px 11px, 13px `ink-2` on paper.
- **Phone row:** flex row of frames at 180–250px, 16px gap, 430/900 crop; horizontal scroll-snap strip under 640px.
- **Illustration variant** (`.illus`, `.il`): an inline SVG (handportal's 21-point hand) drawn in fixed dark greys (`#1b1e24`, `#2f343c`, `#8a8f98`) with white bones and a HUD in system tokens; captioned "Ilustrasi, bukan tangkapan layar".

### Diagram (`figure.diagram`, `.dg`, `.diagram-hint`)
Character: the network plan on Server, drawn in the page's own ink.
- **Style:** 1px `rule-2` border, 10px radius, paper ground, 12px padding, horizontal scroll with a 600px minimum SVG width; a 13px hint appears under 640px. Text 13px 500 ink, small 12px 400 `ink-2`.

### Tables (`table.spec`, `table.skills-table`)
- **Spec:** 15px, 118px 600 heads, `ink-2` cells, hairline rows, 10px vertical padding.
- **Skills:** 15px, 12px 20px 12px 0 cells, hairline rows; head row 13px 600 `ink-2` over a `rule-2` rule; group rows 18px 600 with 32px top padding over a `rule-2` rule; the first column carries 22px logo icons (`.ti-set`) before the name. Under 640px the head hides and each row stacks with `data-th:` prefixes in 600 ink.

### Skills summary (`.skills dl`, `.ti-row`) and How-I-work (`.how ol`)
- **Skills:** two columns, each group hairline-topped with an 18px 600 term, `ink-2` description, a 15px proof line with underlined links, and a row of 26px logo icons 12px apart.
- **How:** numbered list, 10px gap, 70ch, `ink-2` text with ink 600 tabular markers.

### Contacts (`.contacts`) and CTA strip (`.cta-strip`)
- **Contacts:** hairline-separated rows, 120px `ink-2` 500 label + underlined value, 14px vertical padding; stacks under 480px.
- **CTA strip:** hairline-topped section padded `clamp(32px, 4vw, 44px)` vertically, with an 18px line at 60ch and a `.actions` row (primary button, secondary button, text links) 20–26px below.

### Colophon (`footer.colophon`, `.foot-links`)
Character: one quiet line closing every page.
- **Style:** hairline top, one flex row (space-between, centred, wraps at 8px 24px), 18px / 26px vertical padding, 14px `ink-2`.
- **Left:** "© 2026 Muhammad Rafiq Amin · HTML, CSS, dan JavaScript tanpa framework" (the home page appends ", Beranda sekitar 190 KB"); the year is filled by JS.
- **Right:** `nav.foot-links` with GitHub · LinkedIn · Email · Sumber halaman, 6px 18px apart, as 500-weight ink links underlined in `rule-2` at 0.2em, underline ink on hover (0.15s).

## Do's and Don'ts

### Do:
- **Do** give every project the release anatomy: title + status pill, description, result line or Masalah/Solusi/Hasil, tags, links, then the screenshot.
- **Do** ship one of the status pills (Live / Demo statis / Kode privat / Repo publik) on every entry; only Live is green.
- **Do** separate with 1px hairlines (`rule`) and frame touchables with 1px `rule-2`; let the tinted `paper-2` ground carry hover and screenshot backing.
- **Do** keep Mona Sans 600 for all headings with negative tracking that scales with size (-0.012em at 22px to -0.022em at 60px), and step text weight in 400 / 450 / 500 / 550.
- **Do** use the three radii only: 6px buttons, 10px frames, pill chips and pills.
- **Do** keep motion to the 12px / 320ms entry arrival, the 1px press, and the bar's two 200ms gestures (underline draw, icon morph), and honour `prefers-reduced-motion` with no transition at all.
- **Do** put technology logos from `img/tech.svg` only in the Keahlian table and the home skills rows, at 22–26px, next to the technology's name.

### Don't:
- **Don't** add a card, a filled panel, or a shadowed container; `figure.shot` is the only shadowed element in content, and the bar's scrolled shadow and nav-panel shadow stay on the chrome.
- **Don't** use translucency or backdrop blur anywhere but the sticky bar in its scrolled state.
- **Don't** use green for anything but the Live pill, and don't introduce any other accent hue in system styles.
- **Don't** set anything in uppercase, tracked caps, or a second typeface; there are no eyebrows, kickers or monospaced figures.
- **Don't** colour links or change their colour on hover; only the underline moves from `rule-2` to `ink`.
- **Don't** build a dark hero, an icon cloud, a card grid, or any opening animation.
- **Don't** raise any element on hover; the only transforms are the 1px press and the bar's underline draw and icon morph.
