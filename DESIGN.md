---
name: Portofolio Muhammad Rafiq Amin
description: A portfolio drawn as a set of ISO 5457 engineering sheets; the person is dimensioned like a machine part.
colors:
  paper: "#fbfbf8"
  ink: "#111111"
  ink-2: "#3b3b3b"
  rule: "rgba(17, 17, 17, 0.42)"
  dim: "#0b57d0"
  dim-deep: "#083f98"
  rev: "#d3271b"
  cyan: "#0f2f5f"
  cyan-2: "#16407a"
  cyan-ink: "#ffffff"
  cyan-ink-2: "#bcd0ee"
  cyan-rule: "rgba(255, 255, 255, 0.42)"
typography:
  display:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 60px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(20px, 2.3vw, 30px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  title:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(20px, 2vw, 26px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Saira, Segoe UI, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.1em"
  figures:
    fontFamily: "B612 Mono, Cascadia Mono, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  figures-mark:
    fontFamily: "B612 Mono, Cascadia Mono, Consolas, monospace"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  zone: "22px"
  sheet-gap: "16px"
  bar-h: "56px"
  cell-pad: "14px 18px"
  sheet-pad: "clamp(28px, 4vw, 56px)"
  row-pad: "8px"
  note-pad: "10px 0 10px 34px"
  detail-gap: "40px"
components:
  index-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.bar-h}"
    typography: "{typography.label}"
  index-tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "0 16px"
    typography: "{typography.label}"
  index-tab-hover:
    backgroundColor: "rgba(17, 17, 17, 0.05)"
  index-tab-active-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    size: "22px"
  index-action:
    backgroundColor: "{colors.dim}"
    textColor: "{colors.paper}"
    padding: "0 18px"
    typography: "{typography.label}"
  index-action-hover:
    backgroundColor: "{colors.ink}"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet-pad}"
  sheet-blueprint:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.cyan-ink}"
    rounded: "{rounded.none}"
  title-block-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "{spacing.cell-pad}"
    height: "84px"
  title-block-action:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "{spacing.cell-pad}"
    width: "190px"
  title-block-action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  title-block-action-primary:
    backgroundColor: "{colors.dim}"
    textColor: "{colors.paper}"
    padding: "{spacing.cell-pad}"
  cell-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "8px 16px"
    height: "42px"
    typography: "{typography.label}"
  cell-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  cell-link-primary:
    backgroundColor: "{colors.dim}"
    textColor: "{colors.paper}"
    padding: "8px 16px"
    height: "42px"
  cell-link-primary-hover:
    backgroundColor: "{colors.ink}"
  stamp:
    textColor: "{colors.rev}"
    padding: "5px 12px 6px"
    typography: "{typography.label}"
  stamp-live:
    textColor: "{colors.rev}"
    padding: "3px 8px"
  stamp-demo:
    textColor: "{colors.dim}"
    padding: "3px 8px"
  stamp-private:
    textColor: "{colors.ink}"
    padding: "3px 8px"
  bom-chip:
    textColor: "{colors.ink}"
    padding: "4px 9px"
    typography: "{typography.label}"
  table-group-row:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "6px 10px"
  contact-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "20px"
  contact-cell-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  contact-cell-primary:
    backgroundColor: "{colors.dim}"
    textColor: "{colors.paper}"
    padding: "20px"
---

# Design System: Portofolio Muhammad Rafiq Amin

## Overview

**Creative North Star: "The Drawing Set"**

The whole site is one bound set of engineering drawings. Every surface is a sheet: a thick black border, A–F / 1–8 zone letters in the margin, a title block along the bottom edge, and content laid out as notes columns, drawing tables, detail frames, and callout balloons. The person is treated as the component being drawn: a photo cutout becomes an elevation with a dimension line and leadered balloons. Nothing is decorated; everything is annotated. Density is high and deliberate, closer to a datasheet than a landing page, and the reader is trusted to scan.

Material is white drawing paper and black ink in three line weights. Colour is rationed like CAD layers: dimension blue for anything that measures or links, revision red for status stamps, and one cyanotype sheet where the server is drawn white-on-blue. Depth is entirely structural: rules, borders, and inversions, never shadows. Motion happens once, when the sheet-1 linework draws itself on, and then the set is still.

The build rejects the dark hero, the icon cloud, and the card grid. It also rejects glyph icons in general: the only icons are two hairline arrow marks in a sprite. Lettering is Saira in tracked uppercase; every figure, date, sheet number, and zone letter is set in B612 Mono.

**Key Characteristics:**
- Sheet-per-section: one 3px-bordered frame per topic, stacked with a 16px gutter, each closing with a title block.
- Three ink weights (3px border, 1.5px medium, 1px hairline) carry all hierarchy; there are no fills except inversions.
- Rationed colour: blue for dimensions and links, red for stamps, one blueprint sheet inverted via token override.
- Two faces with strict roles: Saira for lettering, B612 Mono for figures and marks.
- Zero radius, zero shadow, one draw-on animation.

## Colors

A monochrome paper-and-ink base with two CAD layer colours and one inverted cyanotype sheet.

### Primary
- **Dimension Blue** (`dim`): the measuring layer. Inline links, dimension lines and arrowheads on the elevation, the primary action cell in the title block, the index-bar WhatsApp action, primary cell links, the primary contact cell, caret and selection colour. It is the only colour allowed to fill a surface on a white sheet.
- **Dimension Blue, deep** (`dim-deep`): hover state for inline text links only.

### Secondary
- **Revision Red** (`rev`): the stamp layer. Used exclusively on stamps: the rotated TERSEDIA availability stamp in the sheet-1 title block and the LIVE stamp in detail captions. It never fills; it is always a 2px or 1.5px outline with matching text.

### Tertiary
- **Cyanotype** (`cyan` with a `cyan-2` highlight in a radial gradient at 28% 18%): the ground of the single blueprint sheet (sheet 3, server). On that sheet `cyan-ink` (white) replaces ink, `cyan-ink-2` replaces ink-2 for secondary text, and `cyan-rule` replaces the hairline. Blue and red both collapse to white there, so links, primary actions, and stamps are all white-on-cyan.

### Neutral
- **Drawing Paper** (`paper`): page and sheet ground, index bar ground, inverted-element text.
- **Ink** (`ink`): all text, all borders, the fill of inverted cells (active tab number, group rows, hover states).
- **Ink, secondary** (`ink-2`): title-block keys, head notes, status lines, detail type lines, last column of the BOM table, colophon.
- **Hairline Rule** (`rule`, 42% ink): table row dividers, note dividers, detail dividers, index tab separators, contact-cell inner grid.

### Named Rules
**The Layer Rule.** Colour is a CAD layer, not decoration. Blue means "this measures or links", red means "this is a status stamp". No other hue enters a white sheet; if a new element needs emphasis, invert it to ink-on-paper instead.

**The Override Rule.** The blueprint sheet inverts by reassigning the tokens (`--ink`, `--ink-2`, `--rule`, `--paper`, `--dim`, `--dim-deep`, `--rev`) on the sheet element, not by restyling components. Any new component that reads only from those tokens works on both grounds automatically; a component that hard-codes a hex will break on sheet 3.

**The Print Rule.** In print the blueprint sheet drops its gradient and returns to black ink on white, and sticky elements go static. The system must survive on paper because the world is paper.

## Typography

**Display Font:** Saira (with Segoe UI, Arial, sans-serif), self-hosted woff2 at 400/500/600/700/800
**Body Font:** Saira (same family; the site is single-face for lettering)
**Label/Mono Font:** B612 Mono (with Cascadia Mono, Consolas, monospace), self-hosted at 400/700

**Character:** Saira is the drafter's lettering: wide, square, and set in tracked uppercase for every label, caption, and heading. B612 Mono (an aircraft-cockpit face) is reserved for anything a reader would check against a value: sheet numbers, revision letters, dates, counts, phone numbers, zone letters, and the MRA mark. The pairing reads as instrument panel, not editorial.

### Hierarchy
- **Display** (800, `clamp(38px, 4.2vw, 60px)`, 0.98, -0.03em, uppercase): the h1 name on sheet 1 only. Tight tracking is unique to this size; everything smaller tracks open.
- **Headline** (700, `clamp(20px, 2.3vw, 30px)`, 1.2, +0.05em, uppercase, max 34ch, balanced): sheet h2 titles in the sheet head.
- **Title** (700, `clamp(20px, 2vw, 26px)`, 1.15, -0.01em, sentence case, balanced): detail h3 names (project titles). Schedule h3 is the fixed 22px sibling.
- **Role** (600, `clamp(17px, 1.6vw, 21px)`, +0.01em): the job-title line under the h1.
- **Body** (400, 15px, 1.55): note list items and case-table cells. Notes columns cap at 62ch, flow notes at 72ch, blueprint lead at 62ch.
- **Body, small** (400, 14px, 1.5): drawing tables, head notes, status lines, title-block values (600), schedule notes.
- **Label** (700, 12px, +0.1em, uppercase): the workhorse. Table captions, column heads (+0.12em), title-block keys, index tabs, cell links, BOM chips, stamps, figcaptions, detail captions (600, +0.06em). Group rows drop to 11px. Notes headings use +0.05em.
- **Figures** (B612 Mono 400, 12–13px, tabular-nums): sheet/rev/scale values, revision list, table figure cells, note counters, zone labels (10px).
- **Mark** (B612 Mono 700, 18px, +0.1em): the MRA mark in the title block; 15px in the index bar and callout balloon numbers.

### Named Rules
**The Figures Rule.** Any string a reader might verify (a number, a date, a sheet reference, a revision letter, a phone number) is set in B612 Mono with tabular figures. Prose numbers inside a sentence stay in Saira.

**The Tracked Caps Rule.** Labels at 12px and below are uppercase with 0.1em tracking (0.12em on table heads, 0.06em on detail captions). Wide tracking on caps labels is native to the drafting world and is a deliberate decision, not a defect; do not "fix" it toward normal tracking. Display-size type tracks tight (-0.03em) and never goes wide.

**The One Display Rule.** There is one display-size heading in the set, the h1 on sheet 1. Later sheets open with a Headline h2, never another display.

## Layout

The page is a vertical stack of full-width sheets under a fixed 56px index bar. Each sheet is a bordered frame with a 16px gutter on both sides and between sheets (`sheet-gap`); main content starts at `bar-h + sheet-gap`, and anchors scroll to the same offset. Inside the frame, a 22px zone strip runs along the top (1–8) and left (A–F) edges in 10px B612 Mono with 1px dividers; the sheet body pads `clamp(28px, 4vw, 56px)` and adds the zone width on the left.

Sheet 1 is a three-row, two-column general-arrangement grid: elevation (sticky, sized from viewport height at a 600/760 ratio) on the left at 0.92fr, head / notes / tables stacked on the right at 1.08fr, with a `clamp(28px, 4vw, 64px)` column gap and 16px row gap. Sheet 2 stacks details, each a two-column article (sticky detail frame 0.9fr, notes 1.1fr, 40px vertical padding, hairline divider). Sheets 3 and 6 use a 1.15/0.85 or 1/1 two-column grid with `clamp(32px, 5vw, 72px)` gaps. Wide tables (schedule 820px, BOM 760px) sit in a horizontal-scroll wrapper.

Rhythm inside cells is tight and consistent: 8px table row padding, 10px note row padding with a 34px counter gutter, 14px 18px title-block cell padding on an 84px min height, 20px contact cell padding, 6px chip gap, 10px link gap.

Breakpoints, each removing one layer of the drawing rather than reflowing everything:
- **1180px**: title block collapses to four columns and the availability stamp hides (sheet 6 keeps it).
- **980px**: all two-column grids become one column; sticky elevation and detail frames go static (max 520px / 560px); the index bar hides the set title and revision.
- **760px**: `sheet-gap` drops to 10px; zone strips are removed; sheet body pads 24px 18px 28px; title block becomes a two-column form with meta, revision, and action rows spanning full width (64px action min height); the flow diagram switches to its tall variant with a scroll cue; scrolling tables gain a dashed right edge; contact cells stack; index tabs show numbers only.
- **480px**: the MRA set mark leaves the index bar.
- **420px**: h2 fixes at 26px and the h1 at 38px.

## Elevation & Depth

There are no shadows anywhere in the build. Depth is structural: line weight, inversion, and stacking order. A sheet is defined by its 3px border, a cell by a 1.5px rule, a row by a 1px hairline at 42% ink. Emphasis is inversion (ink fill, paper text) and hover is the same inversion applied on demand. The index bar and sticky figures sit above the flow by z-index alone, closed off by a 1.5px rule rather than a drop shadow. The single tonal surface in the set is the blueprint sheet's radial gradient from `cyan-2` to `cyan`, which reads as paper texture, not light.

### Named Rules
**The Three Weights Rule.** Every border in the system is one of 3px (sheet frame, title-block top), 1.5px (cells, table heads, captions, index bar, callout strokes), or 1px (rows, dividers, chips, zone lines). No other stroke width, and no shadow, may be introduced.

**The Inversion Rule.** A hovered, active, or emphasised cell fills with ink and sets its text in paper (`.15s ease`); on the blueprint sheet it fills with `cyan-ink-2` and sets text in cyan. That is the only state change the system uses for surfaces.

## Shapes

Every corner in the set is square: 0px radius on sheets, cells, chips, stamps, links, frames, and the active tab number. Form is rectilinear and gridded, and the only rotation is the availability stamp at -3deg. Focus is a 2px dashed dimension-blue outline offset 3px, itself square. SVG linework uses square linecaps, `vector-effect: non-scaling-stroke`, and a 6 5 dash for hidden or dashed lines; callout balloons are paper-filled circles with a 1.5px ink stroke and a mono number. Detail images are cropped to 16/10 inside a 1.5px frame; the elevation cutout is a 600/760 box.

## Components

### Index Bar (`.index-bar`, daftar gambar)
Character: the set's contents page, pinned to the top edge.
- **Style:** fixed, 56px tall, paper ground, 1.5px ink rule beneath; three regions (set mark, sheet tabs, meta/action) divided by 1.5px rules.
- **Tabs:** 12px 600 tracked-caps name beside a 22px square number in B612 Mono with a 1.5px ink border; tabs are separated by hairlines and hover to a 5% ink tint. The active tab's number inverts (ink fill, paper text, `.2s` ease-out); `script.js` moves the active class with an IntersectionObserver (`rootMargin -56px 0 -40% 0`) so it chases the sheet in view.
- **Action:** the right-most cell is a dimension-blue fill with paper text (`Chat WhatsApp`), hovering to ink.
- **Mobile:** set title and revision leave at 980px, tab names at 760px, the set mark at 480px.

### Sheet (`.sheet`)
Character: one bordered drawing sheet per topic.
- **Corner Style:** square.
- **Border:** 3px ink; blueprint variant borders in white.
- **Background:** paper; `.blueprint` variant uses the cyan radial gradient and reassigns tokens.
- **Zones:** 22px strips with 1–8 across the top and A–F down the left, hidden below 760px.
- **Head:** `.sheet-head` grid, h2 plus a 34ch head note, closed by a 1.5px rule.

### Title Block (`.title-block`, `.tb-cell`)
Character: the signature component; every sheet ends with it, and it is where the reader acts.
- **Style:** a 3px top rule, then a row of cells divided by 1.5px rules, each 84px min height, 14px 18px padding. Cell types: mono mark (84px square, B612 Mono 700 18px), project (key/value pairs), meta (four key/value pairs of sheet, rev, scale, drawn-by), revision list (three-column grid, 12px), stamp, and action.
- **Keys (`.tb-k`):** 12px 700 tracked caps in ink-2. **Values (`.tb-v`):** 14px 600; figures take the mono face.
- **Action (`.tb-action`):** 190px min width; value at 15px 700 uppercase. Hover inverts to ink. `.tb-action-primary` is dimension blue with paper text (white on cyan on the blueprint sheet).
- **Mobile:** below 760px cells wrap into full-width rows separated by 1.5px top rules.

### Buttons (cell links, `.cell-link`)
Character: a title-block cell that came loose; there is no rounded pill anywhere.
- **Shape:** square, 1.5px ink border, 42px min height, 8px 16px padding.
- **Default:** 12px 700 tracked caps on paper; hover inverts to ink/paper.
- **Primary:** dimension-blue fill and border with paper text; hover goes to ink.
- **Focus:** the global 2px dashed blue outline.
- **Icons:** an optional 12px hairline arrow (`#i-arrow`) from the sprite, 6px after the label.

### Stamps (`.stamp`, `.stamp-live`, `.stamp-demo`, `.stamp-private`)
Character: rubber stamps on the drawing.
- **Availability stamp:** 2px revision-red outline, red 13px 800 tracked caps with a 12px sub-line, rotated -3deg; lives in the sheet-1 and sheet-6 title blocks.
- **Status stamps:** inline, unrotated, 1.5px `currentColor` outline, 12px 800 +0.1em caps, 3px 8px padding. Colour encodes status: `Live` in revision red, `Demo statis` in dimension blue, `Kode privat` in ink. These three labels are mandatory on every project detail.

### Chips (BOM, `.bom li`)
Character: material call-outs, not tags.
- **Style:** 1px ink border, 12px 700 tracked caps, 4px 9px padding, 6px gap, no fill, no hover.

### Drawing Tables (`.dt`)
Character: schedules and bills of material.
- **Caption:** 12px 700 tracked caps, left aligned, 1.5px rule beneath.
- **Head:** 12px 700 +0.12em caps over a 1.5px rule. **Rows:** 8px 10px 8px 0 padding, hairline dividers, 14px text; figure cells 13px mono nowrap.
- **Group rows:** ink fill, paper text, 11px caps, used to section the BOM table.
- **Variants:** `.qty` (right-aligned 18px 700 totals), `.legend`, `.case` (104px caps row heads, 15px cells), `.sched` and `.bom-table` (min-width tables inside `.table-scroll`), `.tr-form` (120px row heads).

### Notes (`.notes`)
Character: the GENERAL NOTES column of a drawing.
- **Heading:** 12px 700 +0.05em caps over a 1.5px rule.
- **Items:** counter-numbered in B612 Mono at the left gutter (34px), 15px body, 10px vertical padding, hairline dividers.

### Detail Frame (`.detail-frame`)
Character: a numbered detail view with a caption strip.
- **Style:** 1.5px ink border, sticky below the index bar on desktop, 16/10 image cropped from the top; border turns dimension blue on hover.
- **Caption strip:** 1.5px top rule, 8px 12px padding, 12px 600 caps with a `Detail A` id at 800 / +0.1em, then the project name and its status stamps.
- **Plan variant:** the same frame holding a `plan-ink` SVG with 16px 12px 8px padding.

### Elevation and Callouts (`.elevation`, `.elevation-marks`)
Character: the person drawn as a component.
- **Style:** photo cutout at a 600/760 aspect (grayscale 0.08, contrast 1.04) with an SVG overlay: dimension lines in blue (1.5px, square caps, blue arrowheads, 12px 700 Saira label), leader lines in ink ending in an ink dot, and balloons as paper-filled 1.5px ink circles with a 15px mono number. Figcaption is a space-between strip over a 1.5px rule in tracked caps.
- **Motion:** stroke-dashoffset draw-on once on load, 0.9s with `cubic-bezier(0.16, 1, 0.3, 1)` (main dimension 1.2s), staggered 0.25s / 0.9s / 1.15s; labels and dots fade in 0.35s afterwards. `prefers-reduced-motion` renders the final state immediately and clamps every transition.

### Plan and Flow Diagrams (`.plan-ink`, `.flow`)
Character: schematics drawn in the sheet's current ink.
- **Style:** `currentColor` strokes at 1.5 (thick 3, dashed 6 5), paper-filled boxes in the flow diagram, 13px 500 Saira text with 700 bold and 12px small variants and a 12px 700 +0.1em plan label. The flow ships wide and tall variants, swapped at 760px with a caps scroll cue.

### Contact Cells (`.contact-cells`)
Character: a title block scaled up into a two-by-two form.
- **Style:** 1.5px ink outer border, hairline inner grid, 20px padding; each cell stacks a tracked-caps key, a 16px 700 value (mono for the phone number), and a 12px caps underlined action.
- **States:** hover inverts to ink/paper; the primary (WhatsApp) cell is dimension blue at rest.

### Colophon (`.colophon`)
Character: the sheet-set footer, outside any frame.
- **Style:** 13px ink-2, space-between, links in dimension blue, 8px / 32px vertical padding.

## Do's and Don'ts

### Do:
- **Do** frame every new surface as a sheet: 3px ink border, zone strips, a sheet head over a 1.5px rule, and a title block at the bottom.
- **Do** put every action in a cell: title-block action, cell link, index action, or contact cell, all square, all inverting to ink on hover, blue only for the single primary action per sheet.
- **Do** set every verifiable figure in B612 Mono with `tabular-nums` via `.fig`.
- **Do** keep labels at 12px, 700, uppercase, 0.1em tracking; that is the system's label voice.
- **Do** read colour only through the tokens so the blueprint override and print stylesheet keep working.
- **Do** ship one of the three status stamps (Live / Demo statis / Kode privat) on every project detail.
- **Do** keep motion to a one-shot draw-on with the exponential ease-out and honour `prefers-reduced-motion` with a static final state.

### Don't:
- **Don't** add shadows, radii, gradients (beyond the blueprint ground), or fills other than ink and dimension blue on a white sheet.
- **Don't** introduce a fourth stroke width or a second accent hue; red is for stamps only, blue for measurement and links only.
- **Don't** use glyph or emoji icons, icon fonts, or an icon cloud; the sprite's two hairline arrows are the entire icon vocabulary.
- **Don't** build a dark hero, a card grid, or a rounded pill button; the world rejected them at the direction stage and the build never contains them.
- **Don't** add a second display-size heading; later sheets open with a tracked-caps h2.
- **Don't** hard-code `#111111` or `#fbfbf8` in a component; it will not invert on the blueprint sheet.
