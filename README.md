# Blibli Affiliate Dashboard 2.0

**A gamified home base for Blibli Affiliates, built to get first-time Nano Affiliates started and keep them coming back.**

Prototype for the MCC Career Insight × Blibli case competition.
Live demo: `https://doaibuteam.github.io/blibli-affiliate-games-dashboard/`

---

## The problem we're solving

Blibli has a strong ecosystem and a 100% original-product guarantee, but its Affiliate program has an **adoption gap**.

Everyday creators are already busy on social-first platforms where starting is free, links spread through the algorithm, and small impulse purchases dominate. Blibli is still seen as the premium destination for bigger-ticket items. Meanwhile, social commerce already makes up nearly a quarter of Indonesia's e-commerce GMV, so the window to become an everyday Affiliate's go-to income stream is narrowing.

> *"How can Blibli formulate a highly scalable strategy to market for its Affiliate program to aggressively acquire and activate mass market creators across diverse demographics, while leveraging its premium omnichannel ecosystem to win market share against algorithm-driven, natively social competitors?"*

That question actually comes down to two things:
1. **Acquisition.** How do we get a Nano Affiliate (under 10K followers) to sign up?
2. **Activation and retention.** How do we get them to share a link *tomorrow*, and the day after?

Most affiliate programs are good at the first and quietly lose people at the second. **This dashboard is our answer to the second half** and it's designed to sit behind whatever acquisition campaign Blibli runs.

## Meet Blibli Affiliate Games

A new Affiliate signs up, generates one link, never shares it, and drifts away. That's **where we're losing them** and **the gap** we want to close. Social-native platforms keep users coming back with feeds and algorithmic rewards. Blibli doesn't have a feed so it needs another reason to open the app every day. **Our answer: small daily goals, visible progress, and recognition from people in a similar situation**.

The first action takes about a minute. From there, *each completed action gives Affiliates a reason to keep going*.

## How the prototype maps to the casebook

| Casebook ask | What you'll see in the demo |
|---|---|
| **Analysis 2**: reduce friction for first-time affiliates and drive daily link sharing | **Nano Affiliate Kit**: pick a category, pick a product, get a working link plus a ready-to-post caption in one tap. **Daily quests** and a **streak** give people a reason to come back tomorrow. |
| **Analysis 1**: attract mass-market affiliates without losing the premium, original-product reputation | Every generated caption carries the "100% original" message, so a first-time Affiliate can promote everyday items without worrying about their own credibility. **Earnings Lab** shows what a handful of sales is actually worth. |
| **Analysis 3**: content that TikTok-native networks can't copy | The Kit spans Ranch Market groceries, Blibli Mall electronics, and tiket.com travel and events, so one Affiliate can build a mixed lifestyle feed from a single dashboard. |
| **Analysis 4**: long-term loyalty from top performers | **XP levels**, **badges**, a **Reward Vault**, and **leaderboards** give people something to work toward beyond the first commission. |
| **Guideline 3**: reach untapped Tier-2 and Tier-3 cities | **Tier leaderboards** (see below) and a city/regency selector built around the competition's actual Tier 1/2/3 list. |
| **Guideline 4**: keep new affiliates active and converting | Streak bonuses, quest sequencing ("Your Next Move"), and a reward loop tied to real actions: links, shares, and transactions. |

## Feature tour

1. **Nano Affiliate Kit and Nano Quests.** Two starter quests ("generate 1 link from the Kit", "share it to one Story or WhatsApp group") are deliberately tiny so a brand-new Affiliate finishes them in the first session. Nano badges (*Nano Starter*, *Nano Hustler*) mark the milestones.
2. **Daily quests.** Three difficulty levels (Easy, Medium, Hard) so people pick an intensity that fits their day: share 3 products, generate 5 links, log 3 transactions. Harder quests pay more XP.
3. **Streaks.** Consecutive active days build a streak and the first action of each day earns a bonus.
4. **XP, levels and journey.** Five levels from Explorer to Elite Affiliate, with a visible path so progress never feels abstract.
5. **Badges.** Seven badges, from *First Blood* to *Quest Master*, each with a progress counter that shows how close you are.
6. **Reward Vault.** XP becomes something you can spend (vouchers, content packs, campaign boosts, a premium badge), which keeps the loop from being points for points' sake.
7.**Earnings Lab.** A quick projection of commission at different sales targets, plus a milestone bar. Motivation works better when the number is concrete.

### Leaderboards, and why there are two kinds

- **Overall leaderboard.** Filter by any city or regency, and rank by Top XP, Top Streak, or Most Active (links).
- **Per-tier leaderboards.** Separate boards for Tier 1, Tier 2 and Tier 3.

The tier boards are a deliberate design choice. If someone in a Tier-3 regency is ranked against Jakarta Selatan, the gap can feel impossible to close. Instead, Affiliates compete with peers in comparable markets. That makes the competition feel more relevant while also making Tier-2 and Tier-3 growth visible in its own right which directly supporting this case's focus on untapped markets.

Cities and tiers in the demo follow the competition's published lists:
- **Tier 1:** Jakarta Pusat, Jakarta Selatan, Bandung Raya, Kota Tangerang
- **Tier 2:** Sukabumi, Garut, Kota Surabaya, Karawang, Cianjur, Malang, Jember, Kota Medan, Cirebon, Sidoarjo
- **Tier 3:** Kutai Kartanegara, Kota Padang, Kampar, Banyu Asin, Sukoharjo, Karanganyar, Wonosobo, Kota Samarinda, Kudus, Pamekasan

## A two-minute walkthrough

1. Open the demo and pick a city. Notice it shows its tier, e.g. `(T-3) Kota Padang`.
2. In **Nano Affiliate Kit**, choose *Travel & Event* and tap **Generate** on any item. You get a link and a caption immediately, plus XP.
3. Tap **Sudah aku share**. Both Nano Quests complete, a badge unlocks, and **Your Next Move** points to what's next.
4. Scroll to **Leaderboard per Tier**. Switch between Tier 1, 2 and 3 and see where you'd rank against peers in your own tier.
5. Use **+1 Transaksi** in Daily Actions to watch commission, XP and the Earnings Lab milestone move together.

## What's real and what's simulated

This is a static prototype, so we want to be upfront about what's simulated
- **Simulated:** all transactions, the affiliate links (they're placeholder URLs), leaderboard rivals, and the Rp75,000-per-sale commission in Earnings Lab. The XP values and level thresholds are tuning assumptions, not measured data.
- **From the casebook:** the problem framing, the target segment (Nano Affiliates under 10K followers), the ecosystem (Blibli Mall, tiket.com, Ranch Market), and the 100% originality guarantee.
- **Not claimed:** we're not presenting any result or uplift number from this prototype. The point is to show the mechanics we'd A/B test.

## How it would go live

In a real rollout, the prototype's mock actions become live data: link generation, clicks, and transaction events come from the affiliate backend, and tier assignment comes from Blibli's own city classification. A sensible first step would be a limited pilot in a few Tier-2 and Tier-3 cities, measuring the numbers that matter for this problem: first-link rate, seven-day return rate, and links shared per active Affiliate. That would show whether the loop is working before any wider rollout.

## Run it

It's plain HTML, CSS and JavaScript, so there's nothing to install.

- **Locally:** double-click `index.html`.
- **GitHub Pages:** push the files to a repo, go to *Settings → Pages*, choose the `main` branch and `/ (root)`, and save. The site is live in a minute or two.

Progress is saved in your browser's `localStorage`. The **Reset demo data** link at the bottom starts everything over, which is handy when you want to run the walkthrough again.

## Files

```
index.html   page structure
styles.css   styling
app.js       game rules, quests, badges, tiers, leaderboards (config constants at the top)
assets/      logos
```

To tweak the game, edit the constants at the top of `app.js`: `QUEST_TEMPLATES`, `NANO_QUESTS`, `NANO_KIT`, `BADGE_DEFS`, `REWARD_VAULT`, `LEVELS`, and `TIERS`.

---

*Built for the MCC Career Insight × Blibli case competition, 2026.*
