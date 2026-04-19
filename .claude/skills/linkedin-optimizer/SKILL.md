---
name: linkedin-optimizer
description: Audit and rewrite a LinkedIn profile (headline, About, experience, skills, banner) against 2026 algorithm priorities. Use when the user wants to improve their LinkedIn profile, get found by recruiters, or attract inbound leads.
---

# LinkedIn Optimizer

Audit and rewrite a marketer's LinkedIn profile against 2026 algorithm priorities. Produce concrete rewrites, not generic advice.

## 2026 LinkedIn Algorithm Priorities

Rank every suggestion against these four signals:

1. **Profile completeness** — every field filled, all sections present, verified contact info. Incomplete profiles are throttled in search.
2. **Recent activity** — posts, comments, reactions within the last 14 days. Dormant profiles rank lower in recruiter search.
3. **Keyword relevance** — exact-match terms in headline, About, and experience. The search index weighs headline + current role highest.
4. **Visual appeal** — banner, photo, featured section, media in experience. Profiles with media get 2x more profile views.

## Headline Formula

`[what you do] + [who you help] + [unique outcome / proof]`

- Max 220 characters.
- Include 3-5 searchable keywords (e.g., "Demand Gen", "B2B SaaS", "Paid Media", "Lifecycle Marketing").
- Lead with the role keyword — it carries the most weight in search.
- Avoid: "Passionate", "Results-driven", "Guru", "Ninja", emojis as the first character.

See `references/headline-examples.md` for 10 vetted examples.

## About Section Structure

2,600 character limit. First 3 lines (~220 chars) are critical — they appear above the "...see more" fold.

1. **Hook** (1 line) — a provocative stat, a contrarian take, or a sharp problem statement.
2. **What you do + who for** — one sentence. No jargon.
3. **Proof** — metrics, logos, awards, named outcomes.
4. **How you work / unique POV** — the thing only you would say.
5. **Clear CTA** — "DM me if...", "Book a call:", "Email: ...".

Use line breaks liberally. Walls of text kill read-through. See `references/about-template.md`.

## Experience Bullets

Formula: **Action verb + what you did + quantified outcome.**

- Start every bullet with a verb: Launched, Scaled, Rebuilt, Owned, Shipped, Cut, Doubled.
- Quantify: %, $, users, deals, time-to-value.
- 3-5 bullets per role. More than 5 = dilution.
- No fluff adjectives ("strategic", "innovative", "dynamic").

Bad: "Responsible for strategic oversight of content marketing initiatives."
Good: "Rebuilt content engine to 40 posts/quarter; drove 3.2M organic visits and $1.8M pipeline in 12 months."

## Skills Section

- Pick **50 skills** (the max). LinkedIn's algorithm uses this list heavily for recruiter search matches.
- The **top 3 are pinned** on the profile — choose the three terms recruiters actually type (e.g., "Demand Generation", "B2B Marketing", "Marketing Strategy" — not "Teamwork").
- Mix: 15 role keywords, 15 tool/platform names (HubSpot, Marketo, GA4, Webflow, Figma), 10 channel skills (SEO, Paid Social, Email), 10 soft/leadership skills.
- Get at least one endorsement on each of the top 3.

## Banner

- **1584 x 396 px**.
- Communicate the value prop in **5 words or less** (e.g., "I help B2B SaaS grow pipeline").
- Include: tagline, optional logo, optional URL/handle.
- High contrast, readable on mobile, no clutter in the bottom-left (profile photo overlaps there).

## Profile Photo

- **400 x 400 px minimum** (1:1 square).
- Head and shoulders, direct eye contact.
- Neutral or on-brand background, no distractions.
- Face fills ~60% of the frame.
- Recent (within 2 years), professional attire appropriate to the industry.

## Agent Checklist (run this when invoked)

1. **Ask for current content.** Request, in order:
   - Current headline
   - Current About section
   - Last 2-3 roles with current bullets
   - Current top 3 pinned skills (and full skills list if available)
   - Description of current banner + photo (or ask them to upload)
   - Target audience (recruiters? inbound leads? which role/industry?)
2. **Audit** each section against the rules above. Flag every violation with a one-line reason.
3. **Produce rewrites** in separate files under `linkedin/` at the project root:
   - `linkedin/headline.md` — 3 headline options ranked.
   - `linkedin/about.md` — full rewritten About section.
   - `linkedin/experience.md` — rewritten bullets for each role provided.
   - `linkedin/skills.md` — recommended 50 skills with top 3 highlighted.
   - `linkedin/banner-brief.md` — banner copy + layout direction for a designer.
   - `linkedin/audit.md` — the original audit with pass/fail per rule.
4. **Close with next actions**: top 3 changes to make first (highest ROI), plus a 14-day posting cadence suggestion to activate the "recent activity" signal.
