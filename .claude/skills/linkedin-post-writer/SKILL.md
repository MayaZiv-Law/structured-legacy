---
name: linkedin-post-writer
description: Draft LinkedIn posts in the user's voice using proven formats (POV, story, listicle, contrarian, case study). Use when the user asks to write, draft, or repurpose a LinkedIn post.
---

# LinkedIn Post Writer

Draft scroll-stopping LinkedIn posts in the user's authentic voice. Use this skill whenever the user asks to write, draft, refine, or repurpose a LinkedIn post.

## Workflow

1. **Voice calibration** (see checklist below).
2. **Pick a format** that fits the topic (or let the user choose).
3. **Draft 3 variants** with different hooks.
4. **Save** to `content/drafts/YYYY-MM-DD-topic.md`.

---

## The 5 Post Formats

### 1. POV / Contrarian
Challenge a widely-held belief, back it with evidence or lived experience, and end with a CTA.

**Structure:**
- Hook: the belief everyone parrots
- Pivot: "Here's what I've actually seen..."
- Evidence: 2-3 concrete points or a short anecdote
- Reframe: the better mental model
- CTA: a question that invites disagreement

**Worked example:**
> "Hustle culture is dead" is the laziest take on LinkedIn.
>
> I've worked with 40+ founders this year. The ones winning aren't grinding 80-hour weeks. But they're not "balanced" either.
>
> They're obsessed. Selectively.
>
> 4 hours of deep work beats 12 hours of shallow busywork. Every time.
>
> What's one thing you're obsessed with right now?

### 2. Story
Personal narrative arc. Hook -> tension -> turning point -> lesson -> CTA.

**Structure:**
- Hook: a vivid, specific moment ("It was 11pm on a Tuesday...")
- Tension: the stakes, the struggle
- Turning point: what shifted
- Lesson: the generalizable insight
- CTA: invite the reader's version

**Worked example:**
> I got fired on my birthday.
>
> 2019. VP pulled me into a conference room with cupcakes on the table. "We're letting you go."
>
> I spent 6 months convinced I was broken.
>
> Then I took one freelance client. Then three. Then a waitlist.
>
> Getting fired was the best thing that ever happened to my career. It forced me to bet on myself.
>
> What's a "worst thing" that turned out to be the best?

### 3. Listicle
A bold claim followed by a numbered list (3-7 items), closing with a summary line.

**Structure:**
- Hook: a bold or counterintuitive claim
- Setup: one line of context
- List: 3-7 punchy items (one line each ideally)
- Summary: a one-line takeaway
- CTA: which one resonates?

**Worked example:**
> 7 signs you're working with a bad client (before you sign):
>
> After 8 years of consulting, these are the red flags I charge 2x for or walk away from:
>
> 1. They won't name a budget.
> 2. "We move fast" = no process.
> 3. Multiple "final" decision-makers.
> 4. They trash their last vendor.
> 5. "Can you hop on a quick call?" on day one.
> 6. Contract edits in track changes at midnight.
> 7. Payment terms longer than 30 days.
>
> Your calendar is a finite resource. Price accordingly.
>
> Which one have you ignored and regretted?

### 4. Case Study
Problem -> what you did -> result (metrics) -> takeaway.

**Structure:**
- Hook: the outcome or the problem, tightly framed
- Problem: client/situation in 2-3 lines
- What you did: 3-5 bullet steps
- Result: hard numbers
- Takeaway: the principle
- CTA: where could this apply for the reader?

**Worked example:**
> We doubled a B2B SaaS's demo bookings in 6 weeks without adding headcount.
>
> The problem: 12k monthly visitors, 0.4% demo conversion. CMO was ready to fire the agency.
>
> What we did:
> - Rewrote the hero to lead with outcome, not feature
> - Killed 3 pricing tiers, kept 2
> - Added a 60-second product tour above the fold
> - Moved social proof from footer to hero
> - Retargeted bounced traffic with a case study ad
>
> Result: 0.4% -> 0.9% demo conversion. +$180k pipeline in 42 days.
>
> The takeaway: most conversion problems are clarity problems, not traffic problems.
>
> Where are you confusing visitors you could be converting?

### 5. Observation / Pattern
"I've noticed X across N clients/companies..." -> insight -> why it matters.

**Structure:**
- Hook: "I've noticed a pattern across [N] [people/companies]..."
- The pattern: 1-2 sentences
- Evidence: quick signals or examples
- Insight: why it happens
- Why it matters: the implication
- CTA: have they seen it too?

**Worked example:**
> I've noticed a pattern across 30+ early-stage startups I've advised this year.
>
> The ones that scale past $1M ARR all did the same unglamorous thing: they talked to 10 customers a week. Every week. For a year.
>
> Not "user research." Not surveys. Actual conversations.
>
> The ones that stalled? They built features from Slack threads.
>
> Your roadmap is only as smart as your last 10 customer calls.
>
> When was your last one?

---

## 2026 LinkedIn Algorithm Rules

- **Hook in the first 2 lines** (above the "...see more" cutoff, roughly 210 characters). If you don't earn the expand, nothing else matters.
- **Short paragraphs** - 1 to 2 lines each. Whitespace is a feature.
- **No external links in the body.** LinkedIn suppresses reach on posts with outbound links. Put the link in the first comment and reference it ("link in comments").
- **3-5 hashtags max.** Mix one broad (#Marketing), one niche (#B2BSaaS), one branded or community tag.
- **End with a question.** Comments are the highest-weight engagement signal. Ask something specific and easy to answer.
- **Avoid link previews, @mentions of low-follower accounts, and edits within the first hour** - all correlate with reach penalties.
- **Post length sweet spot:** 900-1,300 characters for most formats; stories can run 1,500-1,800.
- **First 60 minutes matter.** Reply to every comment in the first hour to signal active discussion.

---

## Voice Calibration Checklist

Before drafting, do this:

1. **Look for voice samples** at `linkedin/voice-samples.md`. Read the user's last 5 posts there.
2. **Extract:**
   - **Tone:** warm/dry/sharp/irreverent/earnest?
   - **Pacing:** long sentences or staccato? Do they use one-line paragraphs?
   - **Vocabulary:** signature words, industry jargon level, profanity comfort
   - **Idiosyncrasies:** do they open with numbers? Use em dashes? Drop punctuation? Sign off with a catchphrase?
   - **Point of view:** first-person singular, plural "we," or observational "you"?
3. **Mirror, don't mimic.** Match rhythm and vocabulary, not structure verbatim.
4. **If no samples exist:** ask the user for 2-3 recent posts or a one-paragraph voice brief before drafting. Do not guess.

---

## Output Contract

When invoked, always produce **3 variants** of the requested post. Each variant must:

- Use a **different hook style** (e.g., story opener, stat opener, contrarian claim)
- Be **labeled clearly** (`### Variant 1 - Contrarian hook`, `### Variant 2 - Story hook`, `### Variant 3 - Stat hook`)
- Be **self-contained** (hook through CTA, hashtags included)
- Respect the algorithm rules above

Save the output to `content/drafts/YYYY-MM-DD-topic.md` using today's date and a kebab-case topic slug (e.g., `2026-04-19-pricing-redflags.md`). Include a short header with the topic, target format, and any voice notes at the top of the file.

---

## References

- `references/hook-library.md` - 25 proven hooks grouped by type
- `references/formats-detailed.md` - full worked example per format with commentary
