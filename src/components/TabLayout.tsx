"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { restaurants } from "@/data/restaurants";

/* ── TIME DATA ──────────────────────────────────────────────────── */
const TIME_DATA: Record<number, { name: string; count: string; hero: string; sun: string }> = {
  5:  { name: "first light",           count: "3 venues →",  hero: '"4am. the city between shifts."',                                 sun: "🌅" },
  6:  { name: "7am in bombay",         count: "8 venues →",  hero: '"the city is stirring. find the coffee first."',                  sun: "🌅" },
  7:  { name: "7am in bombay",         count: "8 venues →",  hero: '"7am. the best tables are empty. sit down."',                     sun: "☀️" },
  8:  { name: "7am in bombay",         count: "8 venues →",  hero: '"it\'s morning. find the coffee first. everything else can wait."', sun: "☀️" },
  9:  { name: "the long breakfast",    count: "11 venues →", hero: '"slow morning. the right kind."',                                 sun: "☀️" },
  10: { name: "the long breakfast",    count: "11 venues →", hero: '"10am. the city is gentle. let the morning last."',               sun: "☀️" },
  11: { name: "that pre-noon feeling", count: "8 venues →",  hero: '"almost lunch. that pre-noon hunger is real."',                   sun: "🌤️" },
  12: { name: "the noon table",        count: "9 venues →",  hero: '"midday bombay. the best long lunches start right now."',         sun: "🌤️" },
  13: { name: "the noon table",        count: "9 venues →",  hero: '"1pm. you know what you want."',                                  sun: "🌤️" },
  14: { name: "the slow afternoon",    count: "7 venues →",  hero: '"post-lunch. the city moves slower. lean into it."',              sun: "🌤️" },
  15: { name: "the slow afternoon",    count: "7 venues →",  hero: '"that 3pm feeling. coffee again, or something more."',            sun: "🌤️" },
  16: { name: "the golden hour table", count: "6 venues →",  hero: '"the sun is dropping. get up high for it."',                     sun: "🌆" },
  17: { name: "the golden hour table", count: "6 venues →",  hero: '"golden hour. the views are worth it."',                         sun: "🌆" },
  18: { name: "bombay's prime hour",   count: "10 venues →", hero: '"it\'s evening. the best part of the day in bombay."',            sun: "🌆" },
  19: { name: "bombay's prime hour",   count: "10 venues →", hero: '"7pm. the tables are filling. yours should too."',                sun: "🌆" },
  20: { name: "bombay's prime hour",   count: "10 venues →", hero: '"prime time. the city is in it. so are you."',                   sun: "🌆" },
  21: { name: "cocktail connoisseurs", count: "8 venues →",  hero: '"9pm. the bars are where the real conversations happen."',        sun: "🌙" },
  22: { name: "cocktail connoisseurs", count: "8 venues →",  hero: '"10pm. the night is long. the city knows it."',                   sun: "🌙" },
  23: { name: "bombay doesn't sleep",  count: "8 venues →",  hero: '"most places have called it. these haven\'t."',                   sun: "🌙" },
  0:  { name: "bombay doesn't sleep",  count: "8 venues →",  hero: '"the city after midnight. still going."',                         sun: "🌙" },
  1:  { name: "bombay doesn't sleep",  count: "5 venues →",  hero: '"still up. so is bombay."',                                       sun: "🌙" },
  2:  { name: "bombay doesn't sleep",  count: "5 venues →",  hero: '"the last few standing."',                                        sun: "🌙" },
  3:  { name: "bombay doesn't sleep",  count: "3 venues →",  hero: '"3am. barely anything open. these ones are."',                    sun: "🌙" },
  4:  { name: "first light",           count: "3 venues →",  hero: '"the bakeries are warming up."',                                  sun: "🌅" },
};

function formatHour(h: number) {
  if (h === 0) return "12am";
  if (h < 12) return h + "am";
  if (h === 12) return "12pm";
  return (h - 12) + "pm";
}
function isNight(h: number) { return h >= 21 || h < 5; }

/* ── VENUE DATA FOR SWIPE ───────────────────────────────────────── */
const SWIPE_VENUES = [
  { name: "Masque",     loc: "Mahalaxmi · Modern Indian",     desc: "No shortcuts. No compromises. The most considered meal in the city.",          tags: ["tasting menu","date night","◆ approved"], hours: "7pm – 11pm", price: "₹₹₹₹", bg: "#e4e0d8", approved: true  },
  { name: "The Table",  loc: "Colaba · Contemporary",         desc: "The best room in bombay. The kind of place you always mean to go back to.",     tags: ["date night","wine","◆ approved"],          hours: "12pm – 11pm",price: "₹₹₹",  bg: "#eae7e2", approved: true  },
  { name: "Ekaa",       loc: "Fort · Contemporary Indian",    desc: "Cooking with intention. The Fort address that makes sense of modern Indian.",    tags: ["hidden gem","tasting menu","◆ approved"], hours: "7pm – 11pm", price: "₹₹₹",  bg: "#ddd9d3", approved: true  },
  { name: "Torii",      loc: "Khar West · Progressive Asian", desc: "Progressive Asian done right. The kind of meal you plan your week around.",     tags: ["date night","◆ approved"],                hours: "7pm – 11pm", price: "₹₹₹₹", bg: "#e2dfd9", approved: true  },
  { name: "Bastian",    loc: "Bandra West · Seafood",         desc: "The rooftop, the view, the catch. Bombay seafood at its most honest.",          tags: ["rooftop","seafood","casual"],              hours: "12pm – 1am", price: "₹₹₹",  bg: "#e0ddd6", approved: false },
  { name: "Gigi",       loc: "Bandra · Japanese Fusion",      desc: "The new opening that earned its hype. The right kind of noise.",                tags: ["new opening","date night"],               hours: "12pm – 11pm",price: "₹₹₹",  bg: "#eae7e2", approved: false },
  { name: "Woodside Inn",loc:"Bandra West · Cocktail Bar",   desc: "Late night done properly. The cocktails earn it.",                               tags: ["late night","cocktails","bar"],            hours: "5pm – 2am",  price: "₹₹",   bg: "#ddd9d2", approved: false },
];

/* ── VOTE DATA ──────────────────────────────────────────────────── */
const INITIAL_VOTE = [
  { name: "Masque",    sub: "Mahalaxmi · Modern Indian · ◆", votes: 4, leading: true  },
  { name: "The Table", sub: "Colaba · Contemporary · ◆",     votes: 3, leading: false },
  { name: "Bastian",   sub: "Bandra · Seafood · Rooftop",    votes: 1, leading: false },
];

/* ── PROFILE DATA ───────────────────────────────────────────────── */
const PR2_DATA = {
  been: [
    { n: "Masque",     loc: "mahalaxmi · modern indian",     c: "#e4e0d8", ok: true,  tags: ["tasting menu","date night"] },
    { n: "The Table",  loc: "colaba · contemporary",         c: "#eae7e2", ok: true,  tags: ["date night","wine"]         },
    { n: "Ekaa",       loc: "fort · contemporary indian",    c: "#ddd9d3", ok: true,  tags: ["hidden gem","tasting menu"] },
    { n: "Subko",      loc: "fort · specialty coffee",       c: "#e8e5de", ok: false, tags: ["coffee","solo friendly"]    },
    { n: "Gigi",       loc: "bandra · japanese fusion",      c: "#eae7e2", ok: false, tags: ["new opening","date night"]  },
    { n: "Torii",      loc: "khar · progressive asian",      c: "#e2dfd9", ok: true,  tags: ["date night","◆ approved"]  },
  ],
  want: [
    { n: "Bastian",       loc: "bandra · seafood",              c: "#e0ddd6", ok: false, tags: ["rooftop","seafood"]           },
    { n: "Woodside Inn",  loc: "bandra · cocktail bar",         c: "#ddd9d2", ok: false, tags: ["late night","cocktails"]      },
    { n: "Indian Accent", loc: "bkc · modern indian",           c: "#e4e0d8", ok: true,  tags: ["tasting menu","special"]      },
  ],
  saved: [
    { n: "Masque",     loc: "mahalaxmi · modern indian",     c: "#e4e0d8", ok: true,  tags: ["tasting menu"] },
    { n: "Gigi",       loc: "bandra · japanese fusion",      c: "#eae7e2", ok: false, tags: ["new opening"]  },
  ],
};
const PR2_COUNTS = [47, 31, 12];
const PR2_TABS = ["been", "want", "saved"] as const;

/* ── FRIENDS FEED DATA ──────────────────────────────────────────── */
const FEED_ITEMS = [
  { avt: "PK", dark: true,  time: "2m",        type: "saved", name: "Priya",  action: " saved Masque — ", aside: "again.",          tag: "◆ tasting menu · mahalaxmi", gold: true,  thumb: "#e4e0d8", thumbName: "Masque"     },
  { avt: "RM", dark: false, time: "18m",       type: "want",  name: "Rahul",  action: " added Ekaa to his list. ", aside: "Third time this month.", tag: "fort · contemporary indian", gold: false, thumb: "#ddd9d3", thumbName: "Ekaa"       },
  { avt: "AS", dark: false, time: "1h",        type: "been",  name: "Aditi",  action: " marked Bastian as been. ", aside: "Lucky.",  tag: "bandra · seafood · rooftop", gold: false, thumb: "#e0ddd6", thumbName: "Bastian"    },
  { avt: "PK", dark: true,  time: "2h",        type: "want",  name: "Priya",  action: " wants to go to Torii. ", aside: "You do too.", tag: "◆ khar · progressive asian", gold: true,  thumb: "#eae7e2", thumbName: "Torii"      },
  { avt: "NK", dark: false, time: "3h",        type: "been",  name: "Nikhil", action: " ate at Gigi. ", aside: "First timer.",     tag: "bandra · japanese fusion", gold: false,  thumb: "#ebe8e3", thumbName: "Gigi"       },
  { avt: "SM", dark: false, time: "5h",        type: "saved", name: "Sara",   action: " saved The Table. ", aside: "Always The Table.", tag: "◆ colaba · contemporary", gold: true, thumb: "#e4e0d8", thumbName: "The Table"  },
  { avt: "RM", dark: false, time: "yesterday", type: "been",  name: "Rahul",  action: " been to Masque. ", aside: "Finally.",      tag: "◆ mahalaxmi · modern indian", gold: true, thumb: "#ddd9d3", thumbName: "Masque"     },
];

/* ── DARK-MODE STYLE HELPERS ────────────────────────────────────── */
type DS = { bg: string; border: string; text: string; sub: string; accent: string };
function dk(dark: boolean): DS {
  return dark
    ? { bg: "#111009", border: "#2a2724", text: "#e8e4de", sub: "#4a4742", accent: "#d4962a" }
    : { bg: "#ffffff",  border: "#e8e4de", text: "#111009", sub: "#8a8680", accent: "#d4962a" };
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function TabLayout() {
  const initHour = typeof window !== "undefined" ? new Date().getHours() : 12;
  const [tab, setTab] = useState<"home"|"explore"|"map"|"friends"|"profile">("home");
  const [hour, setHour] = useState(initHour);
  const [isDark, setIsDark] = useState(isNight(initHour));
  const [manualDark, setManualDark] = useState(false);
  const [monsoon, setMonsoon] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [swipeOpen, setSwipeOpen] = useState(false);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [swipeSaved, setSwipeSaved] = useState<string[]>([]);
  const [swipeTonight, setSwipeTonight] = useState<string[]>([]);
  const [voteOpen, setVoteOpen] = useState(false);
  const [voteData, setVoteData] = useState(INITIAL_VOTE.map(v => ({ ...v })));
  const [voteTotal, setVoteTotal] = useState(8);
  const [userVoted, setUserVoted] = useState(false);
  const [myVoteIdx, setMyVoteIdx] = useState(-1);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [pr2Tab, setPr2Tab] = useState(0);
  const [feedFilter, setFeedFilter] = useState<"all"|"saved"|"been"|"want">("all");
  const [expandedCard, setExpandedCard] = useState<string|null>(null);
  const [actState, setActState] = useState<Record<string, boolean>>({});
  const [swipeDone, setSwipeDone] = useState(false);
  const [voteShareMsg, setVoteShareMsg] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const d = dk(isDark);

  /* auto dark from slider */
  useEffect(() => {
    if (!monsoon) setIsDark(isNight(hour));
  }, [hour, monsoon]);

  /* draw map when map tab visible */
  useEffect(() => {
    if (tab === "map") {
      setTimeout(() => drawMap(canvasRef.current, isDark), 80);
    }
  }, [tab, isDark]);

  /* redraw map on dark toggle */
  useEffect(() => {
    if (tab === "map") drawMap(canvasRef.current, isDark);
  }, [isDark]);

  const switchTab = useCallback((t: typeof tab) => {
    setTab(t);
    setAiOpen(false);
  }, []);

  const toggleAct = (key: string) => {
    setActState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const timeInfo = TIME_DATA[hour] ?? TIME_DATA[8];
  const heroLine = monsoon ? '"the city is wet. find the places that embrace it."' : timeInfo.hero;
  const leadName = monsoon ? "monsoon in bombay" : timeInfo.name;
  const leadCount = monsoon ? "12 venues →" : timeInfo.count;
  const sunIco = monsoon ? "🌧" : timeInfo.sun;

  /* ── SHELL STYLES ─────────────────────────────────────────────── */
  const shellBg = monsoon ? "#1a2e4a" : d.bg;
  const shellBorder = monsoon ? "#2a4a6a" : d.border;

  return (
    <div style={{ width: 560, background: shellBg, border: `1px solid ${shellBorder}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", minHeight: 720, transition: "background 600ms, border-color 600ms", fontFamily: "inherit" }}>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <Header tab={tab} isDark={isDark} monsoon={monsoon} sunIco={sunIco} manualDark={manualDark}
        onTabChange={switchTab}
        onManualDark={() => {
          const next = !manualDark;
          setManualDark(next);
          setIsDark(next);
        }}
      />

      {/* ── SLIDER AREA (home only) ────────────────────────────── */}
      {tab === "home" && (
        <SliderArea hour={hour} isDark={isDark} monsoon={monsoon}
          onHour={(h) => { setHour(h); }}
          onMonsoon={() => setMonsoon(m => !m)}
          leadCount={leadCount}
        />
      )}

      {/* ── PANELS ────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* HOME */}
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", display: tab === "home" ? "block" : "none", scrollbarWidth: "thin" }}>
          <HomePanel
            isDark={isDark} monsoon={monsoon} heroLine={heroLine} leadName={leadName} leadCount={leadCount}
            expandedCard={expandedCard} setExpandedCard={setExpandedCard}
            actState={actState} toggleAct={toggleAct}
          />
        </div>

        {/* EXPLORE */}
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", display: tab === "explore" ? "block" : "none" }}>
          <ExplorePanel isDark={isDark} />
        </div>

        {/* MAP */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: tab === "map" ? "block" : "none" }}>
          <MapPanel isDark={isDark} canvasRef={canvasRef} actState={actState} toggleAct={toggleAct} />
        </div>

        {/* FRIENDS */}
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", display: tab === "friends" ? "block" : "none" }}>
          <FriendsPanel isDark={isDark} feedFilter={feedFilter} setFeedFilter={setFeedFilter}
            onOpenVote={() => setVoteOpen(true)} />
        </div>

        {/* PROFILE */}
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", display: tab === "profile" ? "block" : "none" }}>
          <ProfilePanel isDark={isDark} pr2Tab={pr2Tab} setPr2Tab={setPr2Tab}
            onShareCard={() => setShareOpen(true)} />
        </div>

        {/* AI OVERLAY */}
        {aiOpen && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(17,16,9,.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
            onClick={() => setAiOpen(false)}>
            <div style={{ background: d.bg, width: "100%", maxHeight: "86%", borderRadius: "8px 8px 0 0", overflow: "hidden", display: "flex", flexDirection: "column", transition: "background 600ms" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ padding: "18px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 24, height: 24, background: isDark ? "#d4962a" : "#111009", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" fill="white"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: d.text }}>where tonight?</p>
                    <p style={{ fontSize: 10, color: d.sub, marginTop: 2 }}>tell us what you&apos;re after</p>
                  </div>
                </div>
                <button style={{ background: "none", border: "none", fontSize: 13, color: d.sub, cursor: "pointer", fontFamily: "inherit" }} onClick={() => setAiOpen(false)}>✕</button>
              </div>
              <div style={{ padding: "14px 20px 24px", overflowY: "auto", flex: 1 }}>
                <input style={{ width: "100%", border: `1.5px solid ${isDark ? "#4a4742" : "#111009"}`, borderRadius: 3, padding: "11px 12px", fontSize: 11, color: d.text, outline: "none", background: isDark ? "#1a1714" : "#fff", marginBottom: 14, fontFamily: "inherit" }} placeholder="cuisine, neighbourhood, vibe, occasion..." />
                <p style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: d.sub, marginBottom: 7 }}>try asking</p>
                <div style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none", marginBottom: 18, paddingBottom: 2 }}>
                  {['"take me somewhere in Bandra tonight"','"best sushi for a date night"','"rooftop with cocktails"','"still open after midnight"'].map(p => (
                    <span key={p} style={{ padding: "6px 11px", border: `1px solid ${d.border}`, borderRadius: 14, fontSize: 10, color: d.text, background: isDark ? "#1a1714" : "#fff", whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0 }}>{p}</span>
                  ))}
                </div>
                <p style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: d.sub, marginBottom: 9 }}>or pick a mode</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>
                  {[
                    { ico: "⧉", title: "card swipe",    sub: "yes · no · tonight",       action: () => { setSwipeOpen(true); setSwipeIdx(0); setSwipeSaved([]); setSwipeTonight([]); setSwipeDone(false); setAiOpen(false); } },
                    { ico: "⟳", title: "surprise me",   sub: "fully random · trust us",   action: undefined },
                    { ico: "◉", title: "mood wheel",    sub: "hungry · who · how far",    action: undefined },
                    { ico: "◐", title: "after dark",    sub: "late venues only",          action: undefined },
                    { ico: "▲", title: "hunger meter",  sub: "snack to full feast",       action: undefined },
                    { ico: "⊙", title: "city map",      sub: "pick a neighbourhood",      action: () => { switchTab("map"); setAiOpen(false); } },
                  ].map(m => (
                    <button key={m.title} onClick={m.action} style={{ border: `1px solid ${d.border}`, borderRadius: 3, padding: 10, cursor: "pointer", background: isDark ? "#1a1714" : "#fff", fontFamily: "inherit", textAlign: "left", width: "100%" }}>
                      <p style={{ fontSize: 15, marginBottom: 5 }}>{m.ico}</p>
                      <p style={{ fontSize: 10, fontWeight: 500, color: d.text, marginBottom: 2 }}>{m.title}</p>
                      <p style={{ fontSize: 9, color: d.sub }}>{m.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SWIPE OVERLAY */}
        {swipeOpen && (
          <SwipeOverlay
            venues={SWIPE_VENUES} idx={swipeIdx} saved={swipeSaved} tonight={swipeTonight} done={swipeDone}
            onAction={(action) => {
              const v = SWIPE_VENUES[swipeIdx];
              if (action === "save") setSwipeSaved(p => [...p, v.name]);
              if (action === "tonight") setSwipeTonight(p => [...p, v.name]);
              const next = swipeIdx + 1;
              if (next >= SWIPE_VENUES.length) {
                setSwipeDone(true);
              } else {
                setSwipeIdx(next);
              }
            }}
            onClose={() => setSwipeOpen(false)}
          />
        )}

        {/* VOTE OVERLAY */}
        {voteOpen && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(17,16,9,.55)", zIndex: 350, display: "flex", alignItems: "flex-end" }}
            onClick={e => { if (e.target === e.currentTarget) setVoteOpen(false); }}>
            <div style={{ width: "100%", background: d.bg, borderRadius: "8px 8px 0 0", transition: "background 600ms" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${d.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: d.text }}>saturday dinner?</p>
                  <p style={{ fontSize: 9, color: d.sub, marginTop: 2 }}>priya&apos;s circle · closes sat 6pm</p>
                </div>
                <button style={{ background: "none", border: "none", fontSize: 14, color: d.sub, cursor: "pointer", fontFamily: "inherit" }} onClick={() => setVoteOpen(false)}>✕</button>
              </div>
              <div style={{ padding: "16px 20px 22px" }}>
                {voteData.map((opt, i) => {
                  const pct = Math.round(opt.votes / voteTotal * 100);
                  return (
                    <div key={opt.name} onClick={() => {
                      if (userVoted) return;
                      setUserVoted(true); setMyVoteIdx(i);
                      const next = voteData.map((o, j) => j === i ? { ...o, votes: o.votes + 1, leading: true } : { ...o, leading: false });
                      setVoteData(next); setVoteTotal(t => t + 1);
                    }} style={{ marginBottom: 8, padding: "10px 12px", border: `1px solid ${opt.leading ? "#d4962a" : i === myVoteIdx ? d.text : d.border}`, borderRadius: 3, cursor: userVoted ? "default" : "pointer", position: "relative", overflow: "hidden", background: isDark ? "#1a1714" : "#fff" }}>
                      <div style={{ position: "absolute", inset: 0, width: `${pct}%`, background: i === myVoteIdx ? "rgba(17,16,9,.06)" : "rgba(212,150,42,.1)", zIndex: 0, transition: "width 500ms ease" }} />
                      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 500, color: d.text }}>{opt.name}{i === myVoteIdx && <span style={{ fontSize: 8, color: "#3a9a3a", marginLeft: 4 }}>your vote</span>}</p>
                          <p style={{ fontSize: 9, color: d.sub, marginTop: 2 }}>{opt.sub}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 11, fontWeight: 500, color: "#d4962a" }}>{pct}%</p>
                          <p style={{ fontSize: 8, color: d.sub, marginTop: 1 }}>{opt.votes} {opt.votes === 1 ? "vote" : "votes"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {userVoted && <p style={{ fontSize: 9, color: d.sub, marginBottom: 10, fontStyle: "italic" }}>you voted. results are live.</p>}
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  <button onClick={() => { setVoteShareMsg(true); setTimeout(() => setVoteShareMsg(false), 2500); }} style={{ flex: 1, padding: 10, background: "#111009", color: "#fff", border: "none", borderRadius: 2, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>share with your circle →</button>
                  <button onClick={() => setVoteOpen(false)} style={{ padding: "10px 16px", background: isDark ? "#1a1714" : "#fff", color: d.text, border: `1px solid ${d.border}`, borderRadius: 2, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>close</button>
                </div>
                {voteShareMsg && <p style={{ fontSize: 9, color: "#3a9a3a", marginTop: 8, textAlign: "center", fontStyle: "italic" }}>link copied to clipboard ✓</p>}
              </div>
            </div>
          </div>
        )}

        {/* SHARE CARD OVERLAY */}
        {shareOpen && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(17,16,9,.75)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) setShareOpen(false); }}>
            <div style={{ width: "100%", maxWidth: 290 }} onClick={e => e.stopPropagation()}>
              <div style={{ background: "#111009", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ padding: "24px 22px 18px" }}>
                  <p style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "#3a3732", marginBottom: 16 }}>◆ bombay platelist · 2025</p>
                  <p style={{ fontSize: 9, color: "#d4962a", letterSpacing: ".08em", marginBottom: 5 }}>your bombay type</p>
                  <p style={{ fontSize: 30, fontWeight: 300, fontStyle: "italic", color: "#f0ede8", lineHeight: 1.15, marginBottom: 16 }}>the tasting<br />menu regular</p>
                  <div style={{ height: 1, background: "#2a2724", marginBottom: 14 }} />
                  <p style={{ fontSize: 7, letterSpacing: ".12em", textTransform: "uppercase", color: "#3a3732", marginBottom: 5 }}>places you loved</p>
                  <p style={{ fontSize: 10, color: "#c8c4be", marginBottom: 10, lineHeight: 1.6 }}>Masque · Ekaa · Torii</p>
                  <p style={{ fontSize: 9, color: "#4a4742", lineHeight: 1.8 }}>47 places · 8 tasting menus<br />bandra home turf · mumbai</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                    {["◆ 8 tasting menus","bandra regular","modern indian","hidden gems"].map((t,i) => (
                      <span key={t} style={{ fontSize: 8, padding: "2px 7px", border: `1px solid ${i<2?"#d4962a":"#2a2724"}`, borderRadius: 1, color: i<2?"#d4962a":"#4a4742" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ height: 34, background: "#0a0907", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px solid #1e1c17" }}>
                  <span style={{ fontSize: 8, color: "#2a2724", letterSpacing: ".08em" }}>bombayplatelist.in</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 7, padding: "14px 22px 18px", background: "transparent" }}>
                <button onClick={() => { setShareSuccess(true); setTimeout(() => setShareOpen(false), 2200); }} style={{ flex: 1, padding: 10, background: "#d4962a", border: "none", borderRadius: 2, fontSize: 10, color: "#111009", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>save to camera roll</button>
                <button onClick={() => setShareOpen(false)} style={{ padding: "10px 14px", background: "none", border: "1px solid #3a3732", borderRadius: 2, fontSize: 10, color: "#6a6662", cursor: "pointer", fontFamily: "inherit" }}>close</button>
              </div>
              {shareSuccess && <p style={{ textAlign: "center", fontSize: 9, color: "#3a9a3a", fontStyle: "italic" }}>saved! share it wherever ◆</p>}
            </div>
          </div>
        )}
      </div>

      {/* ── AI BUTTON ─────────────────────────────────────────────── */}
      {!aiOpen && !swipeOpen && (
        <button onClick={() => setAiOpen(true)} style={{ position: "absolute", bottom: 20, right: 20, background: isDark ? "#1a1714" : "#111009", color: "#fff", border: isDark ? "1px solid #2a2724" : "none", borderRadius: 22, padding: "9px 15px 9px 12px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, zIndex: 200, fontFamily: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" fill="white" opacity=".9"/>
            <path d="M16 3L16.7 5.3L19 6L16.7 6.7L16 9L15.3 6.7L13 6L15.3 5.3L16 3Z" fill="white" opacity=".55"/>
          </svg>
          dial it in
        </button>
      )}
    </div>
  );
}

/* ── HEADER ───────────────────────────────────────────────────────── */
function Header({ tab, isDark, monsoon, sunIco, manualDark, onTabChange, onManualDark }: {
  tab: string; isDark: boolean; monsoon: boolean; sunIco: string; manualDark: boolean;
  onTabChange: (t: "home"|"explore"|"map"|"friends"|"profile") => void;
  onManualDark: () => void;
}) {
  const d = dk(isDark);
  const hdrBg = monsoon ? "#1a2e4a" : d.bg;
  const hdrBorder = monsoon ? "#2a4a6a" : d.border;
  const wmColor = monsoon ? "#a8c8e8" : d.text;

  const TABS = [
    { id: "home",    label: "home",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: "explore", label: "explore", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
    { id: "map",     label: "map",     icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
    { id: "friends", label: "friends", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
    { id: "profile", label: "profile", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ] as const;

  return (
    <div style={{ height: 56, background: hdrBg, borderBottom: `1px solid ${hdrBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0, zIndex: 100, transition: "background 600ms, border-color 600ms" }}>
      <span style={{ fontSize: 13, fontWeight: 400, color: wmColor, letterSpacing: "-.01em", transition: "color 600ms" }}>
        bombay <span style={{ color: "#d4962a" }}>◆</span> platelist
      </span>
      <div style={{ display: "flex" }}>
        {TABS.map(t => {
          const on = tab === t.id;
          const onColor = monsoon ? "#88b8d8" : d.text;
          const offColor = monsoon ? "#3a5a7a" : (isDark ? "#4a4742" : "#c0bcb6");
          return (
            <div key={t.id} onClick={() => onTabChange(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 10px", borderTop: `2px solid ${on ? onColor : "transparent"}`, cursor: "pointer", transition: "all 120ms", color: on ? onColor : offColor }}>
              {t.icon}
              <span style={{ fontSize: 8, letterSpacing: ".04em", color: on ? onColor : offColor, fontWeight: on ? 500 : 400, transition: "color 120ms" }}>{t.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {isDark && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#111009", border: "1px solid #d4962a", borderRadius: 2, padding: "3px 8px", fontSize: 9, color: "#d4962a", letterSpacing: ".08em" }}>◐ bombay after dark</span>
        )}
        <span style={{ fontSize: 12 }}>{sunIco}</span>
        {tab !== "home" && (
          <button onClick={onManualDark} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", borderRadius: 3 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={manualDark ? "#d4962a" : "#8a8680"} strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          </button>
        )}
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: monsoon ? "#2a4a6a" : d.border, transition: "background 600ms" }} />
        <span style={{ fontSize: 10, color: monsoon ? "#3a5a7a" : d.sub, transition: "color 600ms" }}>mumbai</span>
      </div>
    </div>
  );
}

/* ── SLIDER AREA ──────────────────────────────────────────────────── */
function SliderArea({ hour, isDark, monsoon, onHour, onMonsoon, leadCount }: {
  hour: number; isDark: boolean; monsoon: boolean; leadCount: string;
  onHour: (h: number) => void; onMonsoon: () => void;
}) {
  const sliderBg = monsoon ? "#1a2e4a" : isDark ? "#111009" : "#fff";
  const sliderBorder = monsoon ? "#2a4a6a" : isDark ? "#2a2724" : "#e8e4de";
  const lblColor = monsoon ? "#4a7aad" : isDark ? "#4a4742" : "#8a8680";
  const timeColor = monsoon ? "#88b8d8" : isDark ? "#d4962a" : "#111009";
  const hintColor = monsoon ? "#3a5a7a" : isDark ? "#3a3732" : "#c0bcb6";
  const hint = monsoon ? "🌧 indoor mode active · cosy venues only" : isDark ? "◐ bombay after dark is active" : "drag past 9pm to see bombay after dark";

  return (
    <>
      <div style={{ padding: "10px 20px 0", flexShrink: 0, display: "flex", alignItems: "center", gap: 10, background: sliderBg, transition: "background 600ms" }}>
        <span style={{ fontSize: 10, color: lblColor, whiteSpace: "nowrap", minWidth: 70, transition: "color 600ms" }}>{formatHour(hour)}</span>
        <input type="range" min="0" max="23" value={hour} step="1"
          onChange={e => onHour(parseInt(e.target.value))}
          style={{ flex: 1, WebkitAppearance: "none", appearance: "none", height: 3, background: monsoon ? "#2a4a6a" : isDark ? "#2a2724" : "#e8e4de", outline: "none", borderRadius: 2, cursor: "pointer" }}
        />
        <span style={{ fontSize: 10, fontWeight: 500, color: timeColor, minWidth: 38, textAlign: "right", transition: "color 600ms" }}>{formatHour(hour)}</span>
        <button onClick={onMonsoon} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", border: `1px solid ${monsoon ? "#2a4a6a" : isDark ? "#2a2724" : "#e8e4de"}`, borderRadius: 12, fontSize: 9, color: monsoon ? "#a8c8e8" : isDark ? "#4a4742" : "#8a8680", cursor: "pointer", flexShrink: 0, background: monsoon ? "#1a2e4a" : isDark ? "#1a1714" : "#fff", transition: "all 200ms" }}>
          🌧 monsoon
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "3px 20px 6px", flexShrink: 0, borderBottom: `1px solid ${sliderBorder}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: sliderBg, transition: "border-color 600ms, background 600ms" }}>
        <span style={{ fontSize: 9, color: hintColor, letterSpacing: ".02em", transition: "color 600ms" }}>{hint}</span>
      </div>
      {monsoon && (
        <div style={{ background: "#1a2e4a", borderBottom: "1px solid #2a4a6a", padding: "7px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 9, color: "#a8c8e8", fontStyle: "italic" }}>&ldquo;the city is wet. go inside. go well.&rdquo;</span>
          <span style={{ fontSize: 8, color: "#4a7aad", letterSpacing: ".04em" }}>◐ indoor mode · {leadCount}</span>
        </div>
      )}
    </>
  );
}

/* ── VENUE CARD ───────────────────────────────────────────────────── */
function VenueCard({ id, name, sub, desc, tags, hours, price, bg, approved, isDark, expanded, onExpand, actState, onAct }: {
  id: string; name: string; sub: string; desc: string; tags: string[]; hours: string; price: string;
  bg: string; approved: boolean; isDark: boolean; expanded: boolean;
  onExpand: () => void; actState: Record<string, boolean>; onAct: (key: string) => void;
}) {
  const d = dk(isDark);
  const ACT_CFG = {
    been: { on: { ico: "✓", color: "#2d6a2d", lbl: "been" },   off: { ico: "✓", color: "", lbl: "been" } },
    save: { on: { ico: "♥", color: "#c0392b", lbl: "saved" },   off: { ico: "♡", color: "", lbl: "save" } },
    go:   { on: { ico: "⊞", color: "#111009", lbl: "queued" }, off: { ico: "⊡", color: "", lbl: "want to go" } },
  };
  return (
    <div style={{ width: 152, flexShrink: 0, cursor: "pointer" }} onClick={onExpand}>
      <div style={{ height: 100, borderRadius: 3, position: "relative", overflow: "hidden", background: bg, transition: "background 600ms" }}>
        {approved && <span style={{ position: "absolute", top: 6, right: 6, fontSize: 9, color: "#d4962a", lineHeight: 1 }}>◆</span>}
      </div>
      <p style={{ fontSize: 12, fontWeight: 500, color: d.text, marginTop: 7, marginBottom: 2, transition: "color 600ms" }}>{name}</p>
      <p style={{ fontSize: 10, color: d.sub, transition: "color 600ms" }}>{sub}</p>
      {expanded && (
        <div style={{ border: `1px solid ${d.border}`, borderTop: "none", borderRadius: "0 0 3px 3px", padding: 11, background: isDark ? "#1a1714" : "#fff", transition: "background 600ms, border-color 600ms" }}
          onClick={e => e.stopPropagation()}>
          <p style={{ fontSize: 10, fontStyle: "italic", color: d.text, lineHeight: 1.6, marginBottom: 9 }}>&ldquo;{desc}&rdquo;</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 9 }}>
            {tags.map(t => (
              <span key={t} style={{ fontSize: 9, padding: "2px 6px", border: `1px solid ${t.includes("◆") ? "#d4962a" : d.border}`, borderRadius: 1, color: t.includes("◆") ? "#d4962a" : d.sub, transition: "all 600ms" }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 9, color: d.sub, marginBottom: 9, transition: "color 600ms" }}>{hours} · {price}</p>
          <div style={{ display: "flex", gap: 5 }}>
            {(["been","save","go"] as const).map(type => {
              const key = `${id}-${type}`;
              const on = !!actState[key];
              const cfg = ACT_CFG[type][on ? "on" : "off"];
              return (
                <button key={type} onClick={() => onAct(key)} style={{ flex: 1, padding: "7px 4px", border: `1px solid ${d.border}`, borderRadius: 2, fontSize: 9, background: isDark ? "#1a1714" : "#fff", cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, transition: "background 150ms", fontFamily: "inherit" }}>
                  <span style={{ fontSize: 12, color: cfg.color || d.text }}>{cfg.ico}</span>
                  <span style={{ fontSize: 8, color: cfg.color || d.sub }}>{cfg.lbl}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── HOME PANEL ───────────────────────────────────────────────────── */
function HomePanel({ isDark, monsoon, heroLine, leadName, leadCount, expandedCard, setExpandedCard, actState, toggleAct }: {
  isDark: boolean; monsoon: boolean; heroLine: string; leadName: string; leadCount: string;
  expandedCard: string|null; setExpandedCard: (id: string|null) => void;
  actState: Record<string, boolean>; toggleAct: (key: string) => void;
}) {
  const d = dk(isDark);
  const panelBg = monsoon ? "#1a2e4a" : d.bg;
  const heroBorder = monsoon ? "#2a4a6a" : d.border;
  const heroColor = monsoon ? "#88b8d8" : d.text;

  /* derive from restaurants data */
  const morningSpots = restaurants.filter(r => r.tags.includes("Sunday Morning")).slice(0,6);
  const approved     = restaurants.filter(r => r.pahalsPick).slice(0, 6);
  const motherDay    = restaurants.filter(r => r.tags.includes("Date Night Done Right")).slice(0,4);
  const girlsNight   = restaurants.filter(r => r.tags.includes("Girls' Night Out")).slice(0,6);
  const afterMid     = restaurants.filter(r => r.tags.includes("After Midnight")).slice(0,6);
  const oldBombay    = restaurants.filter(r => r.tags.includes("Old Bombay")).slice(0,6);
  const hidden       = restaurants.filter(r => r.tags.includes("Hidden Mumbai")).slice(0,6);

  function VRow({ list, prefix }: { list: typeof restaurants; prefix: string }) {
    return (
      <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", gap: 10, paddingBottom: 4 }}>
        {list.map(r => (
          <VenueCard key={r.id} id={`${prefix}-${r.id}`}
            name={r.name} sub={`${r.area} · ${r.cuisine[0]}`}
            desc={`${r.name} — ${r.cuisine.join(", ")} in ${r.area}.`}
            tags={r.tags.slice(0,3)} hours="see venue" price={r.priceRange}
            bg="#e4e0d8" approved={!!r.pahalsPick} isDark={isDark}
            expanded={expandedCard === `${prefix}-${r.id}`}
            onExpand={() => setExpandedCard(expandedCard === `${prefix}-${r.id}` ? null : `${prefix}-${r.id}`)}
            actState={actState} onAct={toggleAct}
          />
        ))}
      </div>
    );
  }

  function Slbl({ name, count }: { name: string; count?: string }) {
    return (
      <div style={{ borderTop: `1px solid ${isDark ? "#e8e4de" : "#111009"}`, paddingTop: 10, display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, transition: "border-color 600ms" }}>
        <span style={{ fontSize: 11, color: d.text, fontWeight: 400, transition: "color 600ms" }}>{name}</span>
        {count && <span style={{ fontSize: 9, color: d.sub, transition: "color 600ms" }}>{count}</span>}
      </div>
    );
  }

  function Sec({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return <div style={{ padding: "22px 20px 0", ...style }}>{children}</div>;
  }

  return (
    <div style={{ background: panelBg, transition: "background 600ms" }}>
      {/* Hero italic line */}
      <p style={{ fontSize: 13, fontStyle: "italic", fontWeight: 300, color: heroColor, lineHeight: 1.5, textAlign: "center", padding: "20px 20px 18px", borderBottom: `1px solid ${heroBorder}`, transition: "all 600ms" }}>
        {heroLine}
      </p>

      {/* Lead time section */}
      <Sec>
        <Slbl name={leadName} count={leadCount} />
        <VRow list={morningSpots} prefix="lead" />
      </Sec>

      {/* Occasion strip */}
      <div style={{ background: isDark ? "#1a1714" : "#f5f3f0", borderTop: `1px solid ${d.border}`, borderBottom: `1px solid ${d.border}`, padding: "18px 20px", marginTop: 22, transition: "background 600ms, border-color 600ms" }}>
        <div style={{ borderTop: `1px solid ${d.text}`, paddingTop: 10, display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontStyle: "italic", color: d.text }}>mother&apos;s day — take her somewhere special</span>
          <span style={{ fontSize: 9, color: "#d4962a", letterSpacing: ".06em" }}>this sunday</span>
        </div>
        <p style={{ fontSize: 10, color: d.sub, marginBottom: 14 }}>the good tables fill fast</p>
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", gap: 10 }}>
          {motherDay.slice(0,3).map(r => (
            <VenueCard key={r.id} id={`occ-${r.id}`}
              name={r.name} sub={`${r.area} · ${r.cuisine[0]}`}
              desc={`${r.name} — a special occasion worth booking.`}
              tags={r.tags.slice(0,3)} hours="see venue" price={r.priceRange}
              bg="#e4e0d8" approved={!!r.pahalsPick} isDark={isDark}
              expanded={expandedCard === `occ-${r.id}`}
              onExpand={() => setExpandedCard(expandedCard === `occ-${r.id}` ? null : `occ-${r.id}`)}
              actState={actState} onAct={toggleAct}
            />
          ))}
        </div>
      </div>

      {/* Just approved */}
      <Sec>
        <Slbl name="◆ just approved" count="8 venues →" />
        <VRow list={approved} prefix="appr" />
      </Sec>

      <div style={{ height: 1, background: d.border, margin: "22px 20px 0", transition: "background 600ms" }} />

      {/* Girls' Night Out */}
      <Sec>
        <Slbl name="girls' night out" count={`${girlsNight.length} venues →`} />
        <p style={{ fontSize: 10, color: d.sub, marginTop: -8, marginBottom: 12, fontStyle: "italic" }}>cocktail bars, see-and-be-seen spots, bandra to juhu</p>
        <VRow list={girlsNight} prefix="girls" />
      </Sec>

      <div style={{ height: 1, background: d.border, margin: "22px 20px 0", transition: "background 600ms" }} />

      {/* After Midnight */}
      <Sec>
        <Slbl name="after midnight" count={`${afterMid.length} venues →`} />
        <p style={{ fontSize: 10, color: d.sub, marginTop: -8, marginBottom: 12, fontStyle: "italic" }}>still open, still worth it, no judgment</p>
        <VRow list={afterMid} prefix="midnight" />
      </Sec>

      <div style={{ height: 1, background: d.border, margin: "22px 20px 0", transition: "background 600ms" }} />

      {/* Old Bombay */}
      <Sec>
        <Slbl name="old bombay" count={`${oldBombay.length} venues →`} />
        <p style={{ fontSize: 10, color: d.sub, marginTop: -8, marginBottom: 12, fontStyle: "italic" }}>restaurants that have outlasted everything the city threw at them</p>
        <VRow list={oldBombay} prefix="old" />
      </Sec>

      <div style={{ height: 1, background: d.border, margin: "22px 20px 0", transition: "background 600ms" }} />

      {/* Hidden Mumbai */}
      <Sec>
        <Slbl name="hidden mumbai" count={`${hidden.length} venues →`} />
        <p style={{ fontSize: 10, color: d.sub, marginTop: -8, marginBottom: 12, fontStyle: "italic" }}>no gram presence. locals only. you&apos;re welcome</p>
        <VRow list={hidden} prefix="hidden" />
      </Sec>

      <div style={{ paddingBottom: 80 }} />
    </div>
  );
}

/* ── EXPLORE PANEL ────────────────────────────────────────────────── */
function ExplorePanel({ isDark }: { isDark: boolean }) {
  const d = dk(isDark);
  const [selTime, setSelTime] = useState("bombay's prime hour");
  const AREAS = [["Bandra","80+"],["BKC","45+"],["Colaba","28+"],["Fort","24+"],["Lower Parel","32+"],["Worli","22+"],["Juhu","30+"],["Andheri","35+"]];
  const VIBES = [
    { ico: "🌃", n: "after dark",    s: "late night venues"   },
    { ico: "💑", n: "date night",    s: "set the mood"        },
    { ico: "🍱", n: "tasting menus", s: "the full experience" },
    { ico: "☕", n: "coffee first",  s: "specialty & third wave" },
    { ico: "🏙️", n: "rooftops",      s: "the view is the point" },
    { ico: "💎", n: "hidden gems",   s: "◆ only"              },
  ];
  return (
    <div>
      <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${d.border}`, transition: "border-color 600ms" }}>
        <input style={{ width: "100%", border: `1.5px solid ${d.text}`, borderRadius: 3, padding: "11px 12px", fontSize: 11, color: d.text, outline: "none", background: isDark ? "#1a1714" : "#fff", marginBottom: 14, fontFamily: "inherit", transition: "all 600ms" }}
          placeholder="search a venue, area, cuisine, vibe..." />
        <div style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none", marginBottom: 10, paddingBottom: 2 }}>
          {["open now","near me","date night","hidden gems","tasting menus","late night"].map(t => (
            <span key={t} style={{ padding: "4px 10px", border: `1px solid ${d.border}`, borderRadius: 2, fontSize: 9, color: d.text, background: isDark ? "#1a1714" : "#fff", whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, transition: "all 600ms" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none", marginBottom: 0, paddingBottom: 2 }}>
          {["☕ 7am in bombay","🍳 the long breakfast","bombay's prime hour","🌙 bombay doesn't sleep","🌧 monsoon"].map(tp => (
            <div key={tp} onClick={() => setSelTime(tp)} style={{ padding: "6px 12px", background: selTime === tp ? (isDark ? "#e8e4de" : "#111009") : (isDark ? "#1a1714" : "#f5f3f0"), border: `1px solid ${selTime === tp ? (isDark ? "#e8e4de" : "#111009") : d.border}`, borderRadius: 14, fontSize: 10, color: selTime === tp ? (isDark ? "#111009" : "#fff") : d.sub, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 600ms" }}>{tp}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: "18px 20px 40px" }}>
        <p style={{ fontSize: 10, fontWeight: 500, color: d.text, marginBottom: 12, transition: "color 600ms" }}>browse by area</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 20 }}>
          {AREAS.map(([name, count]) => (
            <div key={name} style={{ border: `1px solid ${d.border}`, borderRadius: 3, padding: 11, cursor: "pointer", background: isDark ? "#1a1714" : "#fff", transition: "all 600ms" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: d.text, marginBottom: 2, transition: "color 150ms" }}>{name}</p>
              <p style={{ fontSize: 9, color: d.sub, transition: "color 150ms" }}>{count}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, fontWeight: 500, color: d.text, marginBottom: 12, transition: "color 600ms" }}>browse by vibe</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 }}>
          {VIBES.map(v => (
            <div key={v.n} style={{ border: "1px solid #f0dfa0", borderRadius: 3, padding: 12, background: isDark ? "#1a1714" : "#fff", cursor: "pointer", transition: "all 600ms" }}>
              <div style={{ fontSize: 16, marginBottom: 5 }}>{v.ico}</div>
              <p style={{ fontSize: 11, fontWeight: 500, color: d.text, marginBottom: 2, transition: "color 600ms" }}>{v.n}</p>
              <p style={{ fontSize: 9, color: d.sub, transition: "color 600ms" }}>{v.s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MAP PANEL ────────────────────────────────────────────────────── */
function MapPanel({ isDark, canvasRef, actState, toggleAct }: {
  isDark: boolean; canvasRef: React.RefObject<HTMLCanvasElement | null>;
  actState: Record<string, boolean>; toggleAct: (key: string) => void;
}) {
  const d = dk(isDark);
  const [selPill, setSelPill] = useState("all");
  const MAP_CARDS = [
    { name: "Masque",    sub: "Mahalaxmi · Modern Indian", tag: "tasting menu", approved: true,  bg: "#e4e0d8" },
    { name: "Ekaa",      sub: "Fort · Contemporary Indian",tag: "hidden gem",   approved: true,  bg: "#ddd9d3" },
    { name: "Torii",     sub: "Khar West · Progressive Asian",tag: "date night",approved: true, bg: "#e2dfd9" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: isDark ? "#111009" : "#e8e3d8", transition: "background 600ms" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      <input style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 380, zIndex: 20, background: isDark ? "#1a1714" : "#fff", border: `1px solid ${d.border}`, borderRadius: 3, padding: "9px 12px", fontSize: 11, color: d.text, outline: "none", fontFamily: "inherit" }} placeholder="search for a place, area, or vibe" readOnly />
      <div style={{ position: "absolute", top: 50, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 20, maxWidth: 520 }}>
        {["all","open now","date night","rooftop","late night"].map(p => (
          <span key={p} onClick={() => setSelPill(p)} style={{ padding: "4px 10px", background: selPill === p || (p !== "all" && false) ? "#111009" : (isDark ? "#1a1714" : "#fff"), border: `1px solid ${selPill === p ? "#111009" : d.border}`, borderRadius: 12, fontSize: 9, color: selPill === p ? "#fff" : d.text, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 600ms" }}>{p}</span>
        ))}
      </div>
      <div style={{ position: "absolute", top: 84, left: "50%", transform: "translateX(-50%)", background: isDark ? "#1a1714" : "#fff", border: `1px solid ${d.border}`, borderRadius: 12, padding: "3px 10px", fontSize: 9, color: d.text, zIndex: 20 }}>showing 140+ places</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: isDark ? "#1a1714" : "#fff", borderTop: `1px solid ${d.border}`, padding: "10px 12px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", zIndex: 20, transition: "all 600ms" }}>
        {MAP_CARDS.map(c => (
          <div key={c.name} style={{ width: 185, flexShrink: 0, border: `1px solid ${d.border}`, borderRadius: 3, overflow: "hidden", cursor: "pointer", background: isDark ? "#1a1714" : "#fff", transition: "border-color 600ms" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: 60, height: 60, background: c.bg, flexShrink: 0 }} />
              <div style={{ flex: 1, padding: "7px 9px 5px" }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: d.text, marginBottom: 2 }}>{c.name}{c.approved && <span style={{ color: "#d4962a", fontSize: 8 }}> ◆</span>}</p>
                <p style={{ fontSize: 9, color: d.sub, marginBottom: 3 }}>{c.sub}</p>
                <span style={{ fontSize: 8, padding: "1px 4px", background: isDark ? "#222018" : "#f5f3f0", color: d.sub, borderRadius: 1 }}>{c.tag}</span>
              </div>
            </div>
            <div style={{ display: "flex", borderTop: `1px solid ${d.border}` }}>
              {(["been","save","go"] as const).map(type => {
                const key = `map-${c.name}-${type}`;
                const labels = { been: "been", save: "save", go: "want to go" };
                const icons  = { been: actState[key] ? "✓" : "✓", save: actState[key] ? "♥" : "♡", go: actState[key] ? "⊞" : "⊡" };
                return (
                  <button key={type} onClick={() => toggleAct(key)} style={{ flex: 1, padding: 5, border: "none", background: isDark ? "#1a1714" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderRight: type !== "go" ? `1px solid ${d.border}` : "none", transition: "background 600ms", fontFamily: "inherit" }}>
                    <span style={{ fontSize: 10, color: actState[key] ? "#d4962a" : d.text }}>{icons[type]}</span>
                    <span style={{ fontSize: 8, color: d.sub }}>{labels[type]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FRIENDS PANEL ────────────────────────────────────────────────── */
function FriendsPanel({ isDark, feedFilter, setFeedFilter, onOpenVote }: {
  isDark: boolean; feedFilter: string; setFeedFilter: (f: "all"|"saved"|"been"|"want") => void; onOpenVote: () => void;
}) {
  const d = dk(isDark);
  const FRIENDS = [
    { avt: "PK", dark: true,  name: "priya"  },
    { avt: "RM", dark: false, name: "rahul"  },
    { avt: "AS", dark: false, name: "aditi"  },
    { avt: "NK", dark: false, name: "nikhil" },
    { avt: "SM", dark: false, name: "sara"   },
  ];
  const filtered = feedFilter === "all" ? FEED_ITEMS : FEED_ITEMS.filter(f => f.type === feedFilter);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flexShrink: 0, padding: "14px 20px 0", borderBottom: `1px solid ${d.border}`, transition: "border-color 600ms" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: d.text, marginBottom: 12, transition: "color 600ms" }}>your circle</p>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 14 }}>
          {FRIENDS.map(f => (
            <div key={f.avt} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: f.dark ? "#111009" : "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 500, color: f.dark ? "#d4962a" : "#8a8680" }}>{f.avt}</div>
              <span style={{ fontSize: 8, color: isDark ? "#4a4742" : "#8a8680" }}>{f.name}</span>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1px dashed #c0bcb6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#c0bcb6" }}>+</div>
            <span style={{ fontSize: 8, color: "#c0bcb6" }}>add</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, padding: "10px 20px", borderBottom: `1px solid ${d.border}`, flexShrink: 0, overflowX: "auto", scrollbarWidth: "none", alignItems: "center", transition: "border-color 600ms" }}>
        {([["all","all activity"],["saved","saves"],["been","been"],["want","want to go"]] as const).map(([type, label]) => (
          <span key={type} onClick={() => setFeedFilter(type)} style={{ padding: "4px 10px", background: feedFilter === type ? "#111009" : (isDark ? "#1a1714" : "#f5f3f0"), border: `1px solid ${feedFilter === type ? "#111009" : d.border}`, borderRadius: 12, fontSize: 9, color: feedFilter === type ? "#fff" : d.sub, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 600ms" }}>{label}</span>
        ))}
        <button onClick={onOpenVote} style={{ padding: "4px 10px", background: isDark ? "#d4962a" : "#111009", border: `1px solid ${isDark ? "#d4962a" : "#111009"}`, borderRadius: 12, fontSize: 9, color: isDark ? "#111009" : "#fff", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, marginLeft: "auto", fontFamily: "inherit" }}>⊟ start a vote</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "thin" }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "13px 20px", borderBottom: `1px solid ${isDark ? "#2a2724" : "#f5f3f0"}`, cursor: "pointer" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: item.dark ? "#111009" : (isDark ? "#2a2724" : "#f0ede8"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 500, color: item.dark ? "#d4962a" : d.sub }}>{item.avt}</div>
              {i === 0 && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#d4962a" }} />}
              <span style={{ fontSize: 8, color: "#c0bcb6", whiteSpace: "nowrap" }}>{item.time}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: d.text }}>{item.name}</span>
              <span style={{ fontSize: 11, color: d.text }}>{item.action}</span>
              <em style={{ fontSize: 11, color: d.sub }}>{item.aside}</em>
              <div>
                <span style={{ display: "inline-block", fontSize: 8, padding: "2px 6px", border: `1px solid ${item.gold ? "#d4962a" : d.border}`, borderRadius: 1, color: item.gold ? "#d4962a" : d.sub, marginTop: 5 }}>{item.tag}</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
                <span style={{ fontSize: 9, padding: "2px 7px", border: `1px solid ${d.border}`, borderRadius: 10, color: d.sub, cursor: "pointer", background: isDark ? "#1a1714" : "#fff" }}>♥ same</span>
                <span style={{ fontSize: 9, padding: "2px 7px", border: `1px solid ${d.border}`, borderRadius: 10, color: d.sub, cursor: "pointer", background: isDark ? "#1a1714" : "#fff" }}>⊡ want to go</span>
              </div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 3, background: item.thumb, flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(17,16,9,.5)", padding: "2px 3px", fontSize: 7, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.thumbName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PROFILE PANEL ────────────────────────────────────────────────── */
function ProfilePanel({ isDark, pr2Tab, setPr2Tab, onShareCard }: {
  isDark: boolean; pr2Tab: number; setPr2Tab: (i: number) => void; onShareCard: () => void;
}) {
  const d = dk(isDark);
  const tabKey = PR2_TABS[pr2Tab];
  const places = PR2_DATA[tabKey];
  return (
    <div style={{ height: "100%", overflowY: "auto", scrollbarWidth: "thin" }}>
      {/* Header */}
      <div style={{ background: d.bg, borderBottom: `1px solid ${d.border}`, transition: "background 600ms, border-color 600ms", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 12, padding: "18px 16px 14px", alignItems: "flex-start" }}>
          <div style={{ width: 48, height: 48, borderRadius: 4, background: isDark ? "#2a2724" : "#f0ede8", border: `1px solid ${d.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 500, color: d.text, flexShrink: 0 }}>P</div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, color: d.text, marginBottom: 2 }}>P.</p>
            <p style={{ fontSize: 10, color: d.sub, marginBottom: 8 }}>member since 2025 · mumbai</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 2, fontWeight: 500, background: isDark ? "#e8e4de" : "#111009", color: isDark ? "#111009" : "#e8e4de" }}>◆ 47 places</span>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 2, fontWeight: 500, background: isDark ? "#2a2724" : "#f0ede8", color: isDark ? "#4a4742" : "#8a8680", border: `1px solid ${d.border}` }}>bandra regular</span>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 2, fontWeight: 500, background: isDark ? "#2a2724" : "#f0ede8", color: isDark ? "#4a4742" : "#8a8680", border: `1px solid ${d.border}` }}>modern indian fan</span>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${d.border}`, borderBottom: `1px solid ${d.border}` }}>
          {[["47","been"],["31","want to go"],["12","saved"]].map(([n, l], i) => (
            <div key={l} onClick={() => setPr2Tab(i)} style={{ padding: "11px 0", textAlign: "center", borderRight: i < 2 ? `1px solid ${d.border}` : "none", cursor: "pointer" }}>
              <p style={{ fontSize: 20, fontWeight: 500, color: pr2Tab === i ? d.text : "#c0bcb6", transition: "color 120ms" }}>{n}</p>
              <p style={{ fontSize: 9, color: pr2Tab === i ? d.text : "#c0bcb6", marginTop: 2, letterSpacing: ".04em", transition: "color 120ms" }}>{l}</p>
            </div>
          ))}
        </div>
        {/* Tab row */}
        <div style={{ display: "flex" }}>
          {PR2_TABS.map((t, i) => (
            <div key={t} onClick={() => setPr2Tab(i)} style={{ flex: 1, padding: "9px 0", textAlign: "center", fontSize: 9, color: pr2Tab === i ? d.text : d.sub, cursor: "pointer", borderBottom: `2px solid ${pr2Tab === i ? d.text : "transparent"}`, letterSpacing: ".05em", fontWeight: pr2Tab === i ? 500 : 400, background: d.bg, transition: "all 120ms" }}>{t}</div>
          ))}
        </div>
      </div>
      {/* Places list */}
      <div style={{ borderBottom: `1px solid ${d.border}`, background: d.bg }}>
        {places.length === 0 ? (
          <p style={{ textAlign: "center", padding: "28px 20px", fontSize: 11, color: d.sub, fontStyle: "italic", lineHeight: 1.6 }}>nothing here yet.<br />places you mark will show up here.</p>
        ) : (
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
            {places.slice(0,3).map(p => (
              <div key={p.n} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer", padding: "8px 10px", border: `1px solid ${isDark ? "#2a2724" : "#f0ede8"}`, borderRadius: 3, background: isDark ? "#1a1714" : "#fff" }}>
                <div style={{ width: 44, height: 44, borderRadius: 3, background: p.c, flexShrink: 0, position: "relative" }}>
                  {p.ok && <span style={{ position: "absolute", top: 3, right: 4, fontSize: 8, color: "#111009" }}>◆</span>}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: d.text, marginBottom: 2 }}>{p.n}</p>
                  <p style={{ fontSize: 9, color: d.sub }}>{p.loc}</p>
                  <div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>
                    {p.tags.slice(0,2).map(t => (
                      <span key={t} style={{ fontSize: 8, padding: "2px 5px", border: `1px solid ${d.border}`, borderRadius: 1, color: d.sub }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {PR2_COUNTS[pr2Tab] > 3 && <p style={{ textAlign: "center", padding: 9, fontSize: 9, color: d.text, cursor: "pointer", borderTop: `1px solid ${isDark ? "#2a2724" : "#f0ede8"}` }}>see all {PR2_COUNTS[pr2Tab]} →</p>}
      </div>
      {/* Body */}
      <div style={{ background: isDark ? "#0e0d08" : "#f7f5f2", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Bombay type card */}
        <div style={{ background: isDark ? "#1a1714" : "#111009", borderRadius: 4, padding: 14, border: isDark ? `1px solid #2a2724` : "none" }}>
          <p style={{ fontSize: 9, letterSpacing: ".1em", color: "#4a4742", marginBottom: 6 }}>your bombay type</p>
          <p style={{ fontSize: 18, fontWeight: 500, color: "#e8e4de", lineHeight: 1.2, marginBottom: 3 }}>the tasting<br />menu regular</p>
          <p style={{ fontSize: 10, color: "#4a4742", marginBottom: 12 }}>based on 47 places · updates monthly</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
            {[["◆ 8 tasting menus",true],["bandra home turf",true],["modern indian",false],["hidden gem seeker",false]].map(([t, hi]) => (
              <span key={String(t)} style={{ fontSize: 9, padding: "3px 9px", borderRadius: 2, border: `1px solid ${hi ? "#e8e4de" : "#2a2724"}`, color: hi ? "#e8e4de" : "#6a6662" }}>{String(t)}</span>
            ))}
          </div>
          <button onClick={onShareCard} style={{ fontSize: 9, padding: "7px 12px", borderRadius: 2, cursor: "pointer", letterSpacing: ".05em", width: "100%", textAlign: "center", background: "transparent", border: "1px solid #2a2724", color: "#4a4742", fontFamily: "inherit" }}>share your type →</button>
        </div>
        {/* Lists */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: d.text }}>your lists · 6</span>
            <span style={{ fontSize: 9, color: d.text, cursor: "pointer" }}>+ new</span>
          </div>
          <div style={{ display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
            {[
              { bg: "#111009",  txt: "where i take people who visit", name: "for guests",       count: "8 places"  },
              { bg: "#1e2e20",  txt: "places for when it rains",       name: "monsoon list",     count: "5 places"  },
              { bg: "#2e2820",  txt: "my order-the-same-thing spots",  name: "creature comforts",count: "11 places" },
              { bg: "#1a2430",  txt: "special occasion only",          name: "celebrations",     count: "4 places"  },
            ].map(l => (
              <div key={l.name} style={{ width: 110, flexShrink: 0, border: `1px solid ${isDark ? "#2a2724" : "#e0ddd8"}`, borderRadius: 3, overflow: "hidden", background: isDark ? "#1a1714" : "#fff", cursor: "pointer" }}>
                <div style={{ height: 66, background: l.bg, display: "flex", alignItems: "flex-end", padding: "7px 8px" }}>
                  <span style={{ fontSize: 8, fontStyle: "italic", color: "rgba(255,255,255,.42)", lineHeight: 1.4 }}>{l.txt}</span>
                </div>
                <p style={{ fontSize: 9, fontWeight: 500, color: d.text, padding: "6px 8px 2px", lineHeight: 1.3 }}>{l.name}</p>
                <p style={{ fontSize: 8, color: d.sub, padding: "0 8px 7px" }}>{l.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 30 }} />
    </div>
  );
}

/* ── SWIPE OVERLAY ────────────────────────────────────────────────── */
function SwipeOverlay({ venues, idx, saved, tonight, done, onAction, onClose }: {
  venues: typeof SWIPE_VENUES; idx: number; saved: string[]; tonight: string[];
  done: boolean; onAction: (a: "skip"|"save"|"tonight") => void; onClose: () => void;
}) {
  const v = venues[idx];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#f0ede8", zIndex: 400, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 48, background: "#111009", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 14, color: "#d4962a" }}>⧉</span>
          <div>
            <div style={{ fontSize: 12, color: "#f0ede8", fontWeight: 500 }}>card swipe</div>
            <div style={{ fontSize: 9, color: "#4a4742" }}>yes · no · going tonight</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#4a4742", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
      </div>
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 4, padding: "12px 20px 0", flexShrink: 0 }}>
        {venues.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, background: i < idx ? "#c0bcb6" : i === idx ? "#d4962a" : "#e8e4de", borderRadius: 1, transition: "background 300ms" }} />
        ))}
      </div>
      {/* Card area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", overflow: "hidden" }}>
        {done ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 32, color: "#d4962a", marginBottom: 16 }}>◆</div>
            <div style={{ fontSize: 18, fontWeight: 300, color: "#111009", marginBottom: 6 }}>nice. your queue is set.</div>
            <div style={{ fontSize: 10, color: "#8a8680", marginBottom: 20, lineHeight: 1.8 }}>
              {[tonight.length > 0 && `${tonight.length} for tonight`, saved.length > 0 && `${saved.length} saved`, (venues.length - saved.length - tonight.length) > 0 && `${venues.length - saved.length - tonight.length} skipped`].filter(Boolean).join(" · ")}
            </div>
            <button onClick={onClose} style={{ padding: "10px 24px", background: "#111009", color: "#fff", border: "none", borderRadius: 2, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>back to the app</button>
          </div>
        ) : v && (
          <div style={{ width: "100%", maxWidth: 300, background: "#fff", border: "1px solid #e8e4de", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: 200, background: v.bg, position: "relative", display: "flex", alignItems: "flex-end", padding: 14 }}>
              {v.approved && <span style={{ position: "absolute", top: 12, right: 12, fontSize: 11, color: "#d4962a", fontWeight: 500 }}>◆</span>}
              <div>
                <div style={{ fontSize: 20, fontWeight: 300, color: "#111009", lineHeight: 1.2, marginBottom: 2 }}>{v.name}</div>
                <div style={{ fontSize: 10, color: "#111009", opacity: 0.5 }}>{v.loc}</div>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <p style={{ fontSize: 10, fontStyle: "italic", color: "#111009", lineHeight: 1.6, marginBottom: 10 }}>&ldquo;{v.desc}&rdquo;</p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                {v.tags.map(t => (
                  <span key={t} style={{ fontSize: 8, padding: "2px 6px", border: `1px solid ${t.includes("approved") ? "#d4962a" : "#e8e4de"}`, borderRadius: 1, color: t.includes("approved") ? "#d4962a" : "#8a8680" }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize: 9, color: "#8a8680" }}>{v.hours} · {v.price}</p>
            </div>
          </div>
        )}
      </div>
      {/* Buttons */}
      {!done && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: "12px 20px 20px", flexShrink: 0, background: "#f0ede8" }}>
          {([["skip","✕",48,"#8a8680"],["tonight","↑",60,"#111009"],["save","♡",48,"#c0392b"]] as const).map(([action, ico, size, color]) => (
            <button key={action} onClick={() => onAction(action)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              <div style={{ width: size, height: size, borderRadius: "50%", border: "1px solid #e8e4de", background: action === "tonight" ? "#111009" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: action === "tonight" ? 20 : action === "save" ? 18 : 16, color: action === "tonight" ? "#fff" : color }}>
                {ico}
              </div>
              <span style={{ fontSize: 8, color: "#8a8680", letterSpacing: ".04em" }}>{action}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── CANVAS MAP DRAW ──────────────────────────────────────────────── */
function drawMap(canvas: HTMLCanvasElement | null, dark: boolean) {
  if (!canvas) return;
  const parent = canvas.parentElement;
  if (!parent) return;
  const W = parent.offsetWidth;
  const H = parent.offsetHeight - 110;
  if (H < 100) return;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = dark ? "#111009" : "#e8e3d8";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = dark ? "#1a2830" : "#c8dce8";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.1); ctx.lineTo(W * 0.2, H * 0.04); ctx.lineTo(W * 0.26, H * 0.18);
  ctx.lineTo(W * 0.3, H * 0.35); ctx.lineTo(W * 0.25, H * 0.52); ctx.lineTo(W * 0.18, H * 0.68);
  ctx.lineTo(W * 0.08, H * 0.82); ctx.lineTo(0, H * 0.9); ctx.closePath(); ctx.fill();

  const rc = dark ? "#2a2420" : "#ccc7b4";
  const rd = (pts: number[][], w: number, col: string) => {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
  };
  rd([[W*.35,0],[W*.32,H*.2],[W*.3,H*.4],[W*.27,H*.6],[W*.22,H*.8],[W*.18,H]], 2.5, rc);
  rd([[W*.58,0],[W*.55,H*.2],[W*.52,H*.42],[W*.47,H*.62],[W*.4,H*.82],[W*.33,H]], 2, rc);
  rd([[0,H*.25],[W*.22,H*.24],[W*.45,H*.22],[W*.68,H*.2],[W*.9,H*.19],[W,H*.18]], 1.5, rc);
  rd([[0,H*.5],[W*.28,H*.48],[W*.55,H*.46],[W*.8,H*.44],[W,H*.43]], 1.5, rc);

  const pins = [
    { x:.74, y:.1,  n:"Andheri",     c:22 },
    { x:.62, y:.16, n:"Versova",     c:8  },
    { x:.54, y:.4,  n:"Bandra",      c:32 },
    { x:.76, y:.41, n:"BKC",         c:22 },
    { x:.46, y:.51, n:"Lower Parel", c:16 },
    { x:.6,  y:.53, n:"Worli",       c:12 },
    { x:.36, y:.72, n:"Fort",        c:13 },
    { x:.64, y:.74, n:"Colaba",      c:14 },
  ];
  pins.forEach(a => {
    const ax = W * a.x, ay = H * a.y;
    const r = a.c > 25 ? 10 : a.c > 15 ? 8 : 6;
    if (a.c > 18) {
      ctx.beginPath(); ctx.arc(ax, ay, r + 5, 0, Math.PI * 2);
      ctx.fillStyle = dark ? "rgba(212,150,42,.12)" : "rgba(17,16,9,.1)"; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(ax, ay, r, 0, Math.PI * 2);
    const pinCol = (a.n === "Bandra" || a.n === "BKC") ? "#d4962a" : (dark ? "#e8e4de" : "#111009");
    ctx.fillStyle = pinCol; ctx.fill();
    ctx.fillStyle = dark ? "#111009" : "#fff";
    ctx.font = `bold ${r > 7 ? "7" : "6"}px sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("◆", ax, ay);
    ctx.fillStyle = dark ? "#a8a4a0" : "#111009";
    ctx.font = "9px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.fillText(a.n, ax, ay + r + 3);
  });
}
