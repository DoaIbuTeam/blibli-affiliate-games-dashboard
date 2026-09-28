// ============================================================
// STATIC CONFIG (mirrors what used to be server-side db.json)
// ============================================================
const STORAGE_KEY = "blibliDashboardState_v2";

const LEVELS = [
  { id: "explorer", name: "Explorer", minXp: 0 },
  { id: "bronze", name: "Bronze Affiliate", minXp: 500 },
  { id: "silver", name: "Silver Affiliate", minXp: 1500 },
  { id: "gold", name: "Gold Affiliate", minXp: 3000 },
  { id: "elite", name: "Elite Affiliate", minXp: 6000 },
];

const QUEST_TEMPLATES = [
  { id: "q_easy", difficulty: "Easy", title: "Share 3 produk ke audiens", type: "share", target: 3, xp: 50 },
  { id: "q_medium", difficulty: "Medium", title: "Generate 5 link affiliate", type: "link", target: 5, xp: 100 },
  { id: "q_hard", difficulty: "Hard", title: "Catat 3 transaksi", type: "transaction", target: 3, xp: 250 },
];

// Quest khusus Nano Affiliate (followers < 10K) — ringan, cuma 1x aksi
const NANO_QUESTS = [
  { id: "n_link", difficulty: "Nano", title: "Generate 1 link dari Nano Kit", type: "nano_link", target: 1, xp: 30 },
  { id: "n_share", difficulty: "Nano", title: "Share link ke 1 Story / grup WhatsApp", type: "nano_share", target: 1, xp: 30 },
];
const ALL_QUESTS = [...NANO_QUESTS, ...QUEST_TEMPLATES];
const NANO_LINK_BONUS_XP = 5;

// Nano Kit: pilihan produk cepat per kategori (contoh, bukan data produk asli)
const NANO_KIT = [
  { id: "grocery", label: "🛒 Kebutuhan Harian", source: "Ranch Market", items: ["Belanja bulanan hemat", "Snack & minuman favorit", "Perlengkapan rumah tangga"] },
  { id: "elec", label: "🔌 Elektronik", source: "Blibli Mall", items: ["Aksesori HP", "Peralatan dapur kecil", "Gadget kerja & belajar"] },
  { id: "travel", label: "✈️ Travel & Event", source: "tiket.com", items: ["Tiket wisata weekend", "Tiket konser & event", "Staycation dekat rumah"] },
];

const BADGE_DEFS = [
  { id: "first_blood", title: "First Blood", desc: "Transaksi pertama berhasil", field: "totalTransactions", target: 1 },
  { id: "link_machine", title: "Link Machine", desc: "Generate 50 affiliate link", field: "totalLinksGenerated", target: 50 },
  { id: "on_fire", title: "On Fire", desc: "Streak 7 hari beruntun", field: "streak", target: 7 },
  { id: "money_maker", title: "Money Maker", desc: "Komisi tembus Rp1.000.000", field: "commissionEarned", target: 1000000 },
  { id: "nano_starter", title: "Nano Starter", desc: "Link pertama dari Nano Kit", field: "totalNanoLinks", target: 1 },
  { id: "nano_hustler", title: "Nano Hustler", desc: "10 link dari Nano Kit", field: "totalNanoLinks", target: 10 },
  { id: "quest_master", title: "Quest Master", desc: "Selesaikan Easy + Medium + Hard dalam 1 hari", field: "allQuestsInOneDay", target: 1 },
];

const REWARD_VAULT = [
  { id: "v1", title: "Voucher Rp10K", cost: 500 },
  { id: "v2", title: "Exclusive Content Pack", cost: 1000 },
  { id: "v3", title: "Campaign Boost", cost: 1500 },
  { id: "v4", title: "Premium Affiliate Badge", cost: 3000 },
];

const COMMISSION_PER_TRANSACTION = 75000;
const MILESTONES = [500000, 1000000, 2000000, 5000000, 10000000];

// Data tier (sesuai data lomba). Urutan di dropdown otomatis alphabetical.
const TIERS = {
  1: ["Jakarta Pusat", "Jakarta Selatan", "Bandung Raya", "Kota Tangerang"],
  2: ["Sukabumi", "Garut", "Kota Surabaya", "Karawang", "Cianjur", "Malang", "Jember", "Kota Medan", "Cirebon", "Sidoarjo"],
  3: ["Kutai Kartanegara", "Kota Padang", "Kampar", "Banyu Asin", "Sukoharjo", "Karanganyar", "Wonosobo", "Kota Samarinda", "Kudus", "Pamekasan"],
};
function tierOf(city) {
  for (const t of [1, 2, 3]) if (TIERS[t].includes(city)) return t;
  return null;
}
function cityLabel(city) {
  const t = tierOf(city);
  return t ? `(T-${t}) ${city}` : city;
}
function sortedCities(tier) {
  return [...TIERS[tier]].sort((a, b) => a.localeCompare(b, "id"));
}

const LEADERBOARD_SEED = [
  { name: "Nadia R.", city: "Jakarta Selatan", xp: 5200, streak: 14, links: 140 },
  { name: "Fajar S.", city: "Bandung Raya", xp: 4100, streak: 9, links: 96 },
  { name: "Dinda A.", city: "Kota Tangerang", xp: 3600, streak: 21, links: 80 },
  { name: "Bima P.", city: "Sukabumi", xp: 2950, streak: 5, links: 70 },
  { name: "Citra W.", city: "Garut", xp: 2400, streak: 3, links: 55 },
  { name: "Yoga T.", city: "Kota Surabaya", xp: 1980, streak: 11, links: 48 },
  { name: "Salma H.", city: "Kutai Kartanegara", xp: 1550, streak: 2, links: 40 },
  { name: "Rangga F.", city: "Kota Padang", xp: 1200, streak: 6, links: 33 },
  { name: "Wulan D.", city: "Kampar", xp: 900, streak: 4, links: 25 },
];

function defaultState() {
  return {
    user: {
      name: null,
      city: null,
      xp: 0,
      walletXp: 0,
      streak: 0,
      lastActiveDate: null,
      totalLinksGenerated: 0,
      totalTransactions: 0,
      totalShares: 0,
      totalNanoLinks: 0,
      commissionEarned: 0,
      unlockedBadges: [],
      redeemedRewards: [],
    },
    questProgress: { date: null, q_easy: 0, q_medium: 0, q_hard: 0, n_link: 0, n_share: 0, completed: [] },
  };
}

// ============================================================
// STORAGE HELPERS
// ============================================================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, user: { ...defaultState().user, ...parsed.user } };
  } catch (e) {
    console.error("Gagal baca localStorage, pakai state default.", e);
    return defaultState();
  }
}
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Gagal simpan ke localStorage.", e);
  }
}

let state = loadState();

// ============================================================
// GAME LOGIC (same rules as the old server.js)
// ============================================================
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function isYesterday(dateStr, today) {
  if (!dateStr) return false;
  const diffDays = Math.round((new Date(today) - new Date(dateStr)) / 86400000);
  return diffDays === 1;
}
function computeLevel(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1] || null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const xpIntoLevel = xp - current.minXp;
  const xpForNext = next ? next.minXp - current.minXp : null;
  const progressPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100)) : 100;
  return {
    id: current.id,
    name: current.name,
    xpIntoLevel,
    xpForNext,
    nextName: next ? next.name : null,
    progressPct,
    isMaxLevel: !next,
  };
}
function ensureQuestDay() {
  const today = todayStr();
  if (state.questProgress.date !== today) {
    state.questProgress = { date: today, q_easy: 0, q_medium: 0, q_hard: 0, n_link: 0, n_share: 0, completed: [] };
  }
  return today;
}
function grantXp(amount) {
  state.user.xp += amount;
  state.user.walletXp += amount;
}
function bumpStreakIfFirstToday(today) {
  if (state.user.lastActiveDate === today) return;
  if (isYesterday(state.user.lastActiveDate, today)) {
    state.user.streak += 1;
  } else {
    state.user.streak = 1;
  }
  state.user.lastActiveDate = today;
  grantXp(20);
}
function progressQuest(type, amount) {
  const template = ALL_QUESTS.find((q) => q.type === type);
  if (!template) return;
  const qId = template.id;
  if (state.questProgress.completed.includes(qId)) return;

  state.questProgress[qId] = Math.min(template.target, (state.questProgress[qId] || 0) + amount);

  if (state.questProgress[qId] >= template.target) {
    state.questProgress.completed.push(qId);
    grantXp(template.xp);
    if (QUEST_TEMPLATES.every((q) => state.questProgress.completed.includes(q.id))) {
      unlockBadge("quest_master");
    }
  }
}
function unlockBadge(id) {
  if (!state.user.unlockedBadges.includes(id)) state.user.unlockedBadges.push(id);
}
function checkBadges() {
  BADGE_DEFS.forEach((b) => {
    if (b.field === "allQuestsInOneDay") return;
    if (state.user[b.field] >= b.target) unlockBadge(b.id);
  });
}
function nextMoveText() {
  for (const t of ALL_QUESTS) {
    if (!state.questProgress.completed.includes(t.id)) {
      const done = state.questProgress[t.id] || 0;
      const remaining = t.target - done;
      return `Kamu tinggal ${remaining} lagi untuk selesaiin quest "${t.title}" (+${t.xp} XP).`;
    }
  }
  return "Semua quest hari ini selesai! Streak kamu aman, balik lagi besok buat quest baru. 🔥";
}

// ============================================================
// ACTIONS
// ============================================================
function doShare() {
  const today = ensureQuestDay();
  state.user.totalShares += 1;
  grantXp(5);
  bumpStreakIfFirstToday(today);
  progressQuest("share", 1);
  checkBadges();
  saveState(state);
}
function doLink(productName, productUrl) {
  const today = ensureQuestDay();
  const slug = state.user.name ? state.user.name.toLowerCase().replace(/[^a-z0-9]+/g, "") : "affiliate";
  const code = Math.random().toString(36).slice(2, 8);
  const affiliateLink = `https://blibli.id/a/${slug}/${code}`;

  state.user.totalLinksGenerated += 1;
  grantXp(10);
  bumpStreakIfFirstToday(today);
  progressQuest("link", 1);
  checkBadges();
  saveState(state);

  return { affiliateLink, productName, productUrl, xpGained: 10 };
}
function doNanoLink(item) {
  const today = ensureQuestDay();
  const slug = state.user.name ? state.user.name.toLowerCase().replace(/[^a-z0-9]+/g, "") : "affiliate";
  const code = Math.random().toString(36).slice(2, 8);
  const affiliateLink = `https://blibli.id/a/${slug}/${code}`;
  const caption = `Lagi nyari ${item.toLowerCase()}? Aku belanja di Blibli — 100% original, jadi aman banget. Cek link aku ya 👇\n${affiliateLink}`;

  state.user.totalLinksGenerated += 1;
  state.user.totalNanoLinks += 1;
  grantXp(10 + NANO_LINK_BONUS_XP);
  bumpStreakIfFirstToday(today);
  progressQuest("nano_link", 1);
  progressQuest("link", 1);
  checkBadges();
  saveState(state);
  return { affiliateLink, caption, item, xpGained: 10 + NANO_LINK_BONUS_XP };
}
function doNanoShare() {
  const today = ensureQuestDay();
  state.user.totalShares += 1;
  grantXp(5);
  bumpStreakIfFirstToday(today);
  progressQuest("nano_share", 1);
  progressQuest("share", 1);
  checkBadges();
  saveState(state);
}
function doTransaction() {
  const today = ensureQuestDay();
  state.user.totalTransactions += 1;
  state.user.commissionEarned += COMMISSION_PER_TRANSACTION;
  grantXp(50);
  bumpStreakIfFirstToday(today);
  progressQuest("transaction", 1);
  checkBadges();
  saveState(state);
}
function redeemReward(id) {
  const reward = REWARD_VAULT.find((r) => r.id === id);
  if (!reward) return;
  if (state.user.redeemedRewards.includes(id)) return;
  if (state.user.walletXp < reward.cost) return;
  state.user.walletXp -= reward.cost;
  state.user.redeemedRewards.push(id);
  saveState(state);
}

// ============================================================
// UI RENDERING
// ============================================================
const onboardCard = document.getElementById("onboardCard");
const dashboard = document.getElementById("dashboard");
const topbarUser = document.getElementById("topbarUser");
let currentMetric = "xp";

function populateCitySelect(select, placeholder) {
  select.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = placeholder;
  select.appendChild(ph);
  [1, 2, 3].forEach((t) => {
    const group = document.createElement("optgroup");
    group.label = `Tier ${t}`;
    sortedCities(t).forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = cityLabel(c);
      group.appendChild(opt);
    });
    select.appendChild(group);
  });
}

function init() {
  populateCitySelect(document.getElementById("onboardCity"), "Pilih kota/kabupaten");
  if (!state.user.name || !state.user.city || !tierOf(state.user.city)) {
    onboardCard.classList.remove("hidden");
  } else {
    startDashboard();
  }
}

document.getElementById("onboardForm").addEventListener("submit", (e) => {
  e.preventDefault();
  state.user.name = document.getElementById("onboardName").value.trim();
  state.user.city = document.getElementById("onboardCity").value.trim();
  saveState(state);
  onboardCard.classList.add("hidden");
  startDashboard();
});

function startDashboard() {
  dashboard.classList.remove("hidden");
  topbarUser.textContent = `${state.user.name} · ${cityLabel(state.user.city)}`;
  refreshAll();
}

function refreshAll() {
  renderDashboardState();
  renderRewards();
  renderEarnings();
  renderNanoKit();
  renderLeaderboard();
  renderTierLeaderboard();
}

function renderDashboardState() {
  ensureQuestDay();
  saveState(state);

  const level = computeLevel(state.user.xp);
  document.getElementById("userName").textContent = state.user.name;
  document.getElementById("levelName").textContent = level.name;
  document.getElementById("streakCount").textContent = state.user.streak;

  document.getElementById("xpBarFill").style.width = level.progressPct + "%";
  document.getElementById("xpBarLabel").textContent = level.isMaxLevel
    ? `${state.user.xp} XP · level maksimal tercapai 👑`
    : `${level.xpIntoLevel} / ${level.xpForNext} XP menuju ${level.nextName}`;

  document.getElementById("nextMoveText").textContent = nextMoveText();

  renderQuests();
  renderJourney(level);
  renderBadges();
}

function questItemHtml(t) {
  const progress = state.questProgress[t.id] || 0;
  const completed = state.questProgress.completed.includes(t.id);
  const pct = Math.min(100, Math.round((progress / t.target) * 100));
  return `
      <div class="quest-item ${completed ? "done" : ""}">
        <div class="quest-item-top">
          <div class="quest-title-wrap">
            <span class="quest-diff ${t.difficulty}">${t.difficulty}</span>
            <span class="quest-title">${t.title}</span>
          </div>
          <span class="quest-reward">${completed ? "Selesai ✅" : `+${t.xp} XP`}</span>
        </div>
        <div class="quest-progress-row">
          <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
          <span class="quest-progress-count">${progress}/${t.target}</span>
        </div>
      </div>`;
}

function renderQuests() {
  document.getElementById("questList").innerHTML = QUEST_TEMPLATES.map(questItemHtml).join("");
  document.getElementById("nanoQuestList").innerHTML = NANO_QUESTS.map(questItemHtml).join("");
}

function renderJourney(currentLevel) {
  const track = document.getElementById("journeyTrack");
  track.innerHTML = LEVELS.map((lvl, i) => {
    const isDone = state.user.xp >= (LEVELS[i + 1] ? LEVELS[i + 1].minXp : Infinity);
    const isCurrent = lvl.id === currentLevel.id;
    return `
      <div class="journey-step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}">
        <div class="journey-line"></div>
        <div class="journey-dot">${isDone ? "✓" : i + 1}</div>
        <div class="journey-name">${lvl.name}</div>
        <div class="journey-xp">${lvl.minXp} XP</div>
      </div>`;
  }).join("");
}

function renderBadges() {
  const grid = document.getElementById("badgeGrid");
  grid.innerHTML = BADGE_DEFS.map((b) => {
    const unlocked = state.user.unlockedBadges.includes(b.id);
    const progressValue = b.field === "allQuestsInOneDay" ? QUEST_TEMPLATES.filter((q) => state.questProgress.completed.includes(q.id)).length : state.user[b.field];
    const progressLine = unlocked ? "Unlocked ✅" : `${progressValue} / ${b.target}`;
    return `
      <div class="badge-item ${unlocked ? "unlocked" : ""}">
        <div class="badge-item-title">${unlocked ? "🏅" : "🔒"} ${b.title}</div>
        <div class="badge-item-desc">${b.desc}</div>
        <div class="badge-item-progress">${progressLine}</div>
      </div>`;
  }).join("");
}

// ---------- nano kit ----------
let nanoCat = NANO_KIT[0].id;
let lastNano = null;

function renderNanoKit() {
  const cats = document.getElementById("nanoCats");
  cats.innerHTML = NANO_KIT.map(
    (c) => `<button class="nano-cat ${c.id === nanoCat ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`
  ).join("");
  const cat = NANO_KIT.find((c) => c.id === nanoCat);
  document.getElementById("nanoItems").innerHTML =
    `<div class="nano-source">Via ${cat.source}</div>` +
    cat.items
      .map(
        (it) => `
      <div class="nano-item">
        <span>${it}</span>
        <button class="btn btn-primary" data-item="${it}">Generate</button>
      </div>`
      )
      .join("");
}

function nanoResultHtml() {
  const r = lastNano;
  return `
    <strong>Link + caption untuk "${r.item}"</strong>
    ${r.affiliateLink}
    <div class="nano-result-caption">${r.caption.replace(/\n/g, "<br>")}</div>
    <span class="xp-tag">+${r.xpGained} XP</span>
    <div class="nano-result-actions">
      <button class="btn btn-outline" data-act="copy-link">Salin Link</button>
      <button class="btn btn-outline" data-act="copy-caption">Salin Caption</button>
      <button class="btn btn-primary" data-act="shared" ${r.shared ? "disabled" : ""}>${r.shared ? "Sudah di-share ✅" : "✅ Sudah aku share (+5 XP)"}</button>
    </div>`;
}

async function copyText(text, btn) {
  const original = btn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = "Tersalin ✓";
  } catch (e) {
    btn.textContent = "Salin manual ya";
  }
  setTimeout(() => (btn.textContent = original), 1500);
}

document.getElementById("nanoCats").addEventListener("click", (e) => {
  const btn = e.target.closest(".nano-cat");
  if (!btn) return;
  nanoCat = btn.dataset.cat;
  renderNanoKit();
});

document.getElementById("nanoItems").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-item]");
  if (!btn) return;
  lastNano = { ...doNanoLink(btn.dataset.item), shared: false };
  const box = document.getElementById("nanoResult");
  box.classList.remove("hidden");
  box.innerHTML = nanoResultHtml();
  refreshAll();
});

document.getElementById("nanoResult").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn || !lastNano) return;
  if (btn.dataset.act === "copy-link") copyText(lastNano.affiliateLink, btn);
  if (btn.dataset.act === "copy-caption") copyText(lastNano.caption, btn);
  if (btn.dataset.act === "shared" && !lastNano.shared) {
    doNanoShare();
    lastNano.shared = true;
    document.getElementById("nanoResult").innerHTML = nanoResultHtml();
    refreshAll();
  }
});

// ---------- quick actions ----------
document.getElementById("linkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById("productName").value;
  const productUrl = document.getElementById("productUrl").value;
  const res = doLink(productName, productUrl);

  const box = document.getElementById("linkResult");
  box.classList.remove("hidden");
  box.innerHTML = `
    <strong>Link affiliate untuk "${res.productName}"</strong>
    ${res.affiliateLink}
    <span class="xp-tag">+${res.xpGained} XP</span>`;

  refreshAll();
  e.target.reset();
});

document.getElementById("shareBtn").addEventListener("click", () => {
  doShare();
  refreshAll();
});

document.getElementById("txBtn").addEventListener("click", () => {
  doTransaction();
  refreshAll();
});

// ---------- reward vault ----------
function renderRewards() {
  document.getElementById("walletXp").textContent = state.user.walletXp;
  const list = document.getElementById("rewardList");
  list.innerHTML = REWARD_VAULT.map((r) => {
    const redeemed = state.user.redeemedRewards.includes(r.id);
    const affordable = state.user.walletXp >= r.cost;
    return `
      <div class="reward-item">
        <div>
          <div class="reward-item-title">${r.title}</div>
          <div class="reward-item-cost">${r.cost} XP</div>
        </div>
        <button class="btn ${redeemed ? "btn-outline" : "btn-primary"}"
          data-id="${r.id}" ${redeemed || !affordable ? "disabled" : ""}>
          ${redeemed ? "Sudah ditukar" : "Redeem"}
        </button>
      </div>`;
  }).join("");

  list.querySelectorAll("button:not(:disabled)").forEach((btn) => {
    btn.addEventListener("click", () => {
      redeemReward(btn.dataset.id);
      renderRewards();
      renderDashboardState();
    });
  });
}

// ---------- earnings lab ----------
function renderEarnings() {
  const projections = [5, 10, 25, 50].map((n) => ({ sales: n, estimate: n * COMMISSION_PER_TRANSACTION }));
  const current = state.user.commissionEarned;
  const nextMilestone = MILESTONES.find((m) => m > current) || MILESTONES[MILESTONES.length - 1];
  const prevMilestone = [0, ...MILESTONES].reverse().find((m) => m <= current) || 0;
  const progressPct = Math.min(100, Math.round(((current - prevMilestone) / (nextMilestone - prevMilestone || 1)) * 100));
  const remaining = Math.max(0, nextMilestone - current);

  const table = document.getElementById("earningsTable");
  table.innerHTML = `
    <thead><tr><th>Target Sales</th><th>Estimasi Komisi</th></tr></thead>
    <tbody>
      ${projections.map((p) => `<tr><td>${p.sales} sales</td><td>${formatRupiah(p.estimate)}</td></tr>`).join("")}
    </tbody>`;

  document.getElementById("milestoneLabel").textContent =
    remaining > 0
      ? `${formatRupiah(remaining)} lagi menuju milestone ${formatRupiah(nextMilestone)}`
      : "Milestone tertinggi tercapai! 🎉";
  document.getElementById("milestoneFill").style.width = progressPct + "%";
}
function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

// ---------- leaderboard ----------
const METRIC_LABEL = { xp: "XP", streak: "Hari", links: "Link" };
let currentTier = 1;
let tierMetric = "xp";

function allEntries() {
  const entries = [...LEADERBOARD_SEED];
  if (state.user.name) {
    entries.push({
      name: `${state.user.name} (kamu)`,
      city: state.user.city,
      xp: state.user.xp,
      streak: state.user.streak,
      links: state.user.totalLinksGenerated,
      isYou: true,
    });
  }
  return entries;
}

function rowsHtml(entries, metric) {
  if (entries.length === 0) {
    return `<tr><td colspan="4" class="muted" style="text-align:center;padding:16px">Belum ada affiliate di sini.</td></tr>`;
  }
  return entries
    .map(
      (e, i) => `
      <tr class="${e.isYou ? "you" : ""}">
        <td><span class="rank-badge ${i < 3 ? "top" : ""}">${i + 1}</span></td>
        <td>${e.name}</td>
        <td>${cityLabel(e.city)}</td>
        <td>${e[metric]} ${METRIC_LABEL[metric]}</td>
      </tr>`
    )
    .join("");
}

document.getElementById("metricTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".metric-tab");
  if (!btn) return;
  document.querySelectorAll("#metricTabs .metric-tab").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentMetric = btn.dataset.metric;
  renderLeaderboard();
});

document.getElementById("tierTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".metric-tab");
  if (!btn) return;
  document.querySelectorAll("#tierTabs .metric-tab").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentTier = Number(btn.dataset.tier);
  renderTierLeaderboard();
});

document.getElementById("tierMetricTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".metric-tab");
  if (!btn) return;
  document.querySelectorAll("#tierMetricTabs .metric-tab").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  tierMetric = btn.dataset.metric;
  renderTierLeaderboard();
});

function renderLeaderboard() {
  const citySelect = document.getElementById("cityFilter");
  if (citySelect.options.length === 0) {
    const all = document.createElement("option");
    all.value = "";
    all.textContent = "Semua Kota/Kabupaten";
    citySelect.appendChild(all);
    [1, 2, 3].forEach((t) => {
      const group = document.createElement("optgroup");
      group.label = `Tier ${t}`;
      sortedCities(t).forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = cityLabel(c);
        group.appendChild(opt);
      });
      citySelect.appendChild(group);
    });
    citySelect.addEventListener("change", renderLeaderboard);
  }

  let entries = allEntries();
  const city = citySelect.value;
  if (city) entries = entries.filter((e) => e.city === city);
  entries.sort((a, b) => b[currentMetric] - a[currentMetric]);
  document.getElementById("leaderboardBody").innerHTML = rowsHtml(entries, currentMetric);
}

function renderTierLeaderboard() {
  const entries = allEntries()
    .filter((e) => tierOf(e.city) === currentTier)
    .sort((a, b) => b[tierMetric] - a[tierMetric]);
  document.getElementById("tierBody").innerHTML = rowsHtml(entries, tierMetric);

  const myTier = tierOf(state.user.city);
  const idx = entries.findIndex((e) => e.isYou);
  const note = document.getElementById("tierNote");
  if (myTier === currentTier && idx >= 0) {
    note.textContent = `Kamu ada di Tier ${currentTier} — peringkat #${idx + 1} dari ${entries.length} affiliate.`;
  } else if (myTier) {
    note.textContent = `Kamu terdaftar di Tier ${myTier}. Ini leaderboard khusus Tier ${currentTier}.`;
  } else {
    note.textContent = "";
  }
}

// ---------- reset (buat latihan demo berkali-kali) ----------
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset semua progress demo (XP, streak, badge, dll)? Ini nggak bisa dibatalin.")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  dashboard.classList.add("hidden");
  document.getElementById("cityFilter").innerHTML = "";
  document.getElementById("onboardForm").reset();
  document.getElementById("nanoResult").classList.add("hidden");
  lastNano = null;
  onboardCard.classList.remove("hidden");
});

init();
