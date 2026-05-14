"use client";
import { useState } from "react";
import YourList from "./YourList";
import ExploreByMoment from "./ExploreByMoment";
import StatsCounter from "./StatsCounter";
import BrowseTab from "./BrowseTab";

/* ── TYPES ───────────────────────────────────────────────────── */
type Friend = { initials: string };
type VenueData = {
  name: string; neighbourhood: string; cuisine: string;
  approved: boolean; img: string;
};
type ActivityData = {
  friend: Friend; fname: string; action: string;
  venue: string; neighbourhood: string; cuisine: string;
  img: string; approved: boolean;
};
type ListData = {
  title: string; curator: string; curatorInitials: string;
  count: number; img: string;
};
type CuratorData = {
  initials: string; name: string; descriptor: string;
  thumbs: [string, string, string];
};
type RankedData = {
  rank: number; venue: string; neighbourhood: string;
  friends: Friend[]; rating: string;
};

/* ── DATA ────────────────────────────────────────────────────── */
const F: Record<string, Friend> = {
  PA: { initials: "PA" }, PK: { initials: "PK" }, AR: { initials: "AR" },
  SM: { initials: "SM" }, VN: { initials: "VN" }, TJ: { initials: "TJ" },
};

const NEW_OPENINGS: VenueData[] = [
  { name: "Sixteen 33",     neighbourhood: "Bandra",            cuisine: "Contemporary",    approved: true,  img: "#E4E0D8" },
  { name: "Bodega39",       neighbourhood: "Goregaon",          cuisine: "Bar & Kitchen",   approved: true,  img: "#EAE7E2" },
  { name: "Kyma",           neighbourhood: "BKC",               cuisine: "Greek Seafood",   approved: true,  img: "#DDD9D3" },
  { name: "Indian Accent",  neighbourhood: "Jio World Centre",  cuisine: "Modern Indian",   approved: true,  img: "#E0DDD6" },
  { name: "Pompa",          neighbourhood: "Bandra",            cuisine: "Mexican",         approved: true,  img: "#E4E0D8" },
  { name: "Lyla",           neighbourhood: "BKC",               cuisine: "Spanish",         approved: true,  img: "#EAE7E2" },
  { name: "Nusara",         neighbourhood: "Lower Parel",       cuisine: "Thai",            approved: true,  img: "#DDD9D3" },
  { name: "Gigi",           neighbourhood: "Bandra",            cuisine: "Italian",         approved: true,  img: "#E0DDD6" },
];

const RECENTLY_APPROVED: VenueData[] = [
  { name: "Pa Pa Ya",       neighbourhood: "BKC",     cuisine: "Pan-Asian",           approved: true, img: "#E4E0D8" },
  { name: "The Table",      neighbourhood: "Colaba",  cuisine: "Contemporary",        approved: true, img: "#EAE7E2" },
  { name: "Tresind",        neighbourhood: "BKC",     cuisine: "Progressive Indian",  approved: true, img: "#DDD9D3" },
  { name: "Hakkasan",       neighbourhood: "Bandra",  cuisine: "Chinese",             approved: true, img: "#E0DDD6" },
  { name: "Foo Asian Tapas",neighbourhood: "Bandra",  cuisine: "Asian",               approved: true, img: "#E4E0D8" },
  { name: "One8 Commune",   neighbourhood: "BKC",     cuisine: "All-day dining",      approved: true, img: "#EAE7E2" },
  { name: "Yauatcha",       neighbourhood: "BKC",     cuisine: "Dim Sum",             approved: true, img: "#DDD9D3" },
  { name: "CinCin",         neighbourhood: "BKC",     cuisine: "Italian",             approved: true, img: "#E0DDD6" },
  { name: "Bastian",        neighbourhood: "Worli",   cuisine: "Seafood",             approved: true, img: "#E4E0D8" },
];

const AREAS = [
  "Bandra", "Colaba", "Kala Ghoda", "Fort", "BKC", "Lower Parel",
  "Worli", "Juhu", "Versova", "Andheri", "Mahalaxmi", "Matunga", "Powai", "Santacruz",
];

const VIBES = [
  "date night", "sunday brunch", "natural wine", "big groups", "outdoor seating",
  "late night", "hidden gem", "solo friendly", "good for work", "special occasion",
  "vegetarian-forward", "counter dining", "tasting menu", "walk-ins welcome",
  "rooftop", "by the water", "late kitchen", "neighbourhood icon",
];

const ALL_LISTS: ListData[] = [
  { title: "best for a long lunch",                         curator: "by P.",                        curatorInitials: "P",  count: 9,  img: "#E4E0D8" },
  { title: "worth the travel",                              curator: "by P.",                        curatorInitials: "P",  count: 7,  img: "#EAE7E2" },
  { title: "tables for two",                                curator: "by the bombay platelist team", curatorInitials: "BP", count: 12, img: "#DDD9D3" },
  { title: "the wine list matters here",                    curator: "by P.",                        curatorInitials: "P",  count: 6,  img: "#E0DDD6" },
  { title: "open late",                                     curator: "by the bombay platelist team", curatorInitials: "BP", count: 11, img: "#E4E0D8" },
  { title: "counter dining done right",                     curator: "by P.",                        curatorInitials: "P",  count: 8,  img: "#EAE7E2" },
  { title: "tasting menus worth clearing your calendar for",curator: "by the bombay platelist team", curatorInitials: "BP", count: 5,  img: "#DDD9D3" },
  { title: "neighbourhood icons",                           curator: "by P.",                        curatorInitials: "P",  count: 14, img: "#E0DDD6" },
  { title: "new mumbai",                                    curator: "by the bombay platelist team", curatorInitials: "BP", count: 6,  img: "#E4E0D8" },
  { title: "brought by a friend",                           curator: "by Tara J.",                   curatorInitials: "TJ", count: 8,  img: "#EAE7E2" },
  { title: "the classics",                                  curator: "by P.",                        curatorInitials: "P",  count: 10, img: "#DDD9D3" },
  { title: "worth clearing your sunday for",                curator: "by the bombay platelist team", curatorInitials: "BP", count: 7,  img: "#E0DDD6" },
];

const HOME_LISTS = ALL_LISTS.slice(0, 8);

const CURATORS: CuratorData[] = [
  { initials: "RM", name: "Rahul M.",  descriptor: "food writer",           thumbs: ["#E4E0D8", "#DDD9D3", "#EAE7E2"] },
  { initials: "AS", name: "Aditi S.",  descriptor: "chef, Bandra",          thumbs: ["#EAE7E2", "#E4E0D8", "#DDD9D3"] },
  { initials: "JK", name: "Jay K.",    descriptor: "been to 94 places",     thumbs: ["#DDD9D3", "#EAE7E2", "#E4E0D8"] },
  { initials: "PT", name: "Priya T.",  descriptor: "restaurant consultant", thumbs: ["#E0DDD6", "#DDD9D3", "#EAE7E2"] },
  { initials: "VN", name: "Vikram N.", descriptor: "been to 78 places",     thumbs: ["#EAE7E2", "#E0DDD6", "#DDD9D3"] },
];

const ACTIVITY: ActivityData[] = [
  { friend: F.PK, fname: "Priya",  action: "marked this a favourite", venue: "The Bombay Canteen", neighbourhood: "Lower Parel", cuisine: "Contemporary Indian", img: "#E4E0D8", approved: true  },
  { friend: F.AR, fname: "Arjun",  action: "visited",                 venue: "Bade Miya",          neighbourhood: "Colaba",      cuisine: "Street Food",         img: "#EAE7E2", approved: false },
  { friend: F.SM, fname: "Sara",   action: "added to want to go",     venue: "Mahesh Lunch Home",  neighbourhood: "Fort",        cuisine: "Seafood",             img: "#DDD9D3", approved: true  },
  { friend: F.VN, fname: "Vikram", action: "loved",                   venue: "The Table",          neighbourhood: "Colaba",      cuisine: "European",            img: "#E4E0D8", approved: true  },
  { friend: F.TJ, fname: "Tara",   action: "checked in at",           venue: "Lucky Restaurant",   neighbourhood: "Bandra",      cuisine: "Irani Café",          img: "#EAE7E2", approved: false },
  { friend: F.PK, fname: "Priya",  action: "added to want to go",     venue: "Khyber",             neighbourhood: "Fort",        cuisine: "Mughlai",             img: "#DDD9D3", approved: true  },
];

const RANKED: RankedData[] = [
  { rank: 1,  venue: "The Bombay Canteen", neighbourhood: "Lower Parel", friends: [F.PK, F.AR, F.SM], rating: "loved"   },
  { rank: 2,  venue: "Bade Miya",          neighbourhood: "Colaba",      friends: [F.VN, F.TJ, F.PA], rating: "go back" },
  { rank: 3,  venue: "The Table",          neighbourhood: "Colaba",      friends: [F.PK, F.AR],       rating: "loved"   },
  { rank: 4,  venue: "Mahesh Lunch Home",  neighbourhood: "Fort",        friends: [F.SM, F.VN, F.TJ], rating: "solid"   },
  { rank: 5,  venue: "O Pedro",            neighbourhood: "BKC",         friends: [F.PA, F.PK],       rating: "loved"   },
  { rank: 6,  venue: "Masala Library",     neighbourhood: "BKC",         friends: [F.AR, F.SM, F.VN], rating: "go back" },
  { rank: 7,  venue: "Bastian",            neighbourhood: "Bandra",      friends: [F.TJ, F.PK, F.AR], rating: "solid"   },
  { rank: 8,  venue: "Bayroute",           neighbourhood: "Juhu",        friends: [F.PA, F.VN],       rating: "loved"   },
  { rank: 9,  venue: "Khyber",             neighbourhood: "Fort",        friends: [F.SM, F.TJ],       rating: "solid"   },
  { rank: 10, venue: "Lucky Restaurant",   neighbourhood: "Bandra",      friends: [F.PK, F.AR, F.PA], rating: "go back" },
];

/* ── SHARED MICRO-COMPONENTS ─────────────────────────────────── */
function Av({ initials, size = 24 }: { initials: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "#F5F3F0", border: "1.5px solid #FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 400, color: "#8A8680",
      flexShrink: 0, userSelect: "none",
    }}>
      {initials}
    </div>
  );
}

function Diamond() {
  return (
    <span style={{
      position: "absolute", top: 8, right: 8,
      fontSize: 11, color: "#D4962A", lineHeight: 1,
    }}>◆</span>
  );
}

function Label({ text }: { text: string }) {
  return (
    <p style={{
      fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
      color: "#8A8680", fontWeight: 400, marginBottom: 24,
    }}>
      {text}
    </p>
  );
}

function VenueCard({ v, imgHeight = 200 }: { v: VenueData; imgHeight?: number }) {
  return (
    <div className="hoverable" style={{ borderRadius: 4, overflow: "hidden" }}>
      <div style={{ position: "relative", height: imgHeight, background: v.img }}>
        {v.approved && <Diamond />}
      </div>
      <div style={{ paddingTop: 12, paddingBottom: 4 }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{v.name}</p>
        <p style={{ fontSize: 12, color: "#8A8680" }}>{v.neighbourhood} · {v.cuisine}</p>
      </div>
    </div>
  );
}

function ListCard({ l, imgHeight = 150 }: { l: ListData; imgHeight?: number }) {
  return (
    <div className="hoverable">
      <div style={{ height: imgHeight, background: l.img, borderRadius: 4 }} />
      <div style={{ paddingTop: 12, paddingBottom: 4 }}>
        <p style={{ fontSize: 13, fontStyle: "italic", fontWeight: 400, color: "#111009", marginBottom: 6 }}>
          {l.title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <Av initials={l.curatorInitials} size={16} />
          <span style={{ fontSize: 11, color: "#8A8680" }}>{l.curator}</span>
        </div>
        <p style={{ fontSize: 11, color: "#8A8680" }}>{l.count} places</p>
      </div>
    </div>
  );
}

function FeaturedList() {
  return (
    <div style={{ display: "flex", minHeight: 300, borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: "55%", background: "#DDD9D3", flexShrink: 0 }} />
      <div style={{
        width: "45%", background: "#F5F3F0", padding: 48,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8680" }}>
            Editor&apos;s Pick
          </p>
          <p style={{ fontSize: 22, fontWeight: 300, fontStyle: "italic", color: "#111009", lineHeight: 1.35, marginTop: 12 }}>
            the mumbai classics you should have eaten by now
          </p>
          <p style={{ fontSize: 13, color: "#8A8680", lineHeight: 1.6, marginTop: 16, maxWidth: 340 }}>
            Places that have been here longer than you. The ones that define what eating in this city actually means.
          </p>
        </div>
        <p style={{ fontSize: 11, color: "#8A8680" }}>
          14 places · <em>by the bombay platelist team</em>
        </p>
      </div>
    </div>
  );
}

/* ── HOME TAB ────────────────────────────────────────────────── */
function HomeTab() {
  return (
    <div>

      {/* 1. Editorial statement */}
      <div style={{ padding: "100px 40px", textAlign: "center" }}>
        <p style={{
          fontSize: 20, fontWeight: 300, fontStyle: "italic",
          color: "#111009", lineHeight: 1.5,
          maxWidth: 600, margin: "0 auto",
        }}>
          &ldquo;Mumbai has always known how to eat. We just wrote it down.&rdquo;
        </p>
      </div>

      {/* 2. New Openings */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="New Openings" />
        </div>
        <div className="scroll-row" style={{ paddingLeft: 40, gap: 16 }}>
          {NEW_OPENINGS.map((v, i) => (
            <div key={i} style={{ width: 280, flexShrink: 0 }}>
              <VenueCard v={v} imgHeight={200} />
            </div>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      {/* 3. Areas */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Areas" />
        </div>
        <div className="scroll-row" style={{ paddingLeft: 40, gap: 8 }}>
          {AREAS.map((area) => (
            <button key={area} className="area-chip"
              style={{ height: 36, padding: "0 16px", fontSize: 13, fontFamily: "inherit" }}>
              {area}
            </button>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      {/* 4. Stats row */}
      <StatsCounter />

      {/* 5. Editor's Lists */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Editor's Lists" />
          <FeaturedList />
        </div>
        <div className="scroll-row" style={{ marginTop: 24, paddingLeft: 40, gap: 16 }}>
          {HOME_LISTS.map((l, i) => (
            <div key={i} style={{ width: 220, flexShrink: 0 }}>
              <ListCard l={l} imgHeight={150} />
            </div>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      {/* 6. How It Works */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #E8E4DE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="How It Works" />
          <div style={{ display: "flex", gap: 64 }}>
            {[
              {
                headline: "every place is visited",
                body: "No algorithms, no paid placement. Every venue on Bombay Platelist has been eaten at by a human being.",
              },
              {
                headline: "we edit, not aggregate",
                body: "We don't list everything. We choose. That means some very good places aren't here yet. That's the point.",
              },
              {
                headline: "the list is alive",
                body: "Places get removed. New approvals happen weekly. The list reflects Mumbai as it is right now, not two years ago.",
              },
            ].map((col) => (
              <div key={col.headline} style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111009" }}>{col.headline}</p>
                <p style={{ fontSize: 13, color: "#8A8680", marginTop: 8, lineHeight: 1.7 }}>{col.body}</p>
                <a
                  href="#"
                  style={{ fontSize: 11, color: "#8A8680", marginTop: 12, display: "inline-block", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The Same Place, Different Night */}
      <section style={{ borderTop: "1px solid #E8E4DE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 0" }}>
          <Label text="The Same Place, Different Night" />
        </div>
        <ExploreByMoment />
      </section>

      {/* 8. Recently Approved */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #E8E4DE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Recently Approved" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {RECENTLY_APPROVED.map((v, i) => (
              <VenueCard key={i} v={v} imgHeight={200} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Browse by Vibe */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #E8E4DE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Browse by Vibe" />
        </div>
        <div className="scroll-row" style={{ paddingLeft: 40, gap: 8 }}>
          {VIBES.map((v) => (
            <button key={v} className="chip" style={{ fontFamily: "inherit" }}>{v}</button>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      {/* 10. Curated by People We Trust */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #E8E4DE" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Curated by People We Trust" />
        </div>
        <div className="scroll-row" style={{ paddingLeft: 40, gap: 16 }}>
          {CURATORS.map((c, i) => (
            <div key={i} className="hoverable" style={{
              width: 180, flexShrink: 0,
              background: "#FFFFFF", borderBottom: "1px solid #E8E4DE", paddingBottom: 16,
            }}>
              <Av initials={c.initials} size={48} />
              <p style={{ fontSize: 13, fontWeight: 500, color: "#111009", marginTop: 10, marginBottom: 3 }}>{c.name}</p>
              <p style={{ fontSize: 11, color: "#8A8680", marginBottom: 12 }}>{c.descriptor}</p>
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {c.thumbs.map((t, j) => (
                  <div key={j} style={{ width: 40, height: 40, background: t, borderRadius: 2 }} />
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#8A8680" }}>see their list →</p>
            </div>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      {/* 11. As Seen In */}
      <section style={{ padding: "80px 40px", borderTop: "1px solid #E8E4DE", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 300, fontStyle: "italic", color: "#8A8680" }}>
          Condé Nast Traveller · Vogue India · Time Out Mumbai · The Hindu · Architectural Digest India · Mint Lounge
        </p>
      </section>

    </div>
  );
}

/* ── LISTS TAB ───────────────────────────────────────────────── */
function ListsTab() {
  return (
    <div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 0" }}>
        <FeaturedList />
        <div style={{ marginTop: 48, paddingBottom: 80 }}>
          <Label text="All Lists" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {ALL_LISTS.map((l, i) => (
              <ListCard key={i} l={l} imgHeight={180} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FRIENDS TAB ─────────────────────────────────────────────── */
function FriendsTab() {
  return (
    <div>

      {/* Stat line */}
      <div style={{ paddingTop: 48, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#8A8680" }}>
          5 friends on bombay platelist · 3 active this week
        </p>
      </div>

      {/* Friends' Activity */}
      <section style={{ padding: "40px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="Friends' Activity" />
        </div>
        <div className="scroll-row" style={{ paddingLeft: 40, gap: 16 }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="hoverable" style={{
              width: 260, flexShrink: 0, borderRadius: 4, overflow: "visible",
            }}>
              <div style={{ position: "relative", height: 180, background: a.img, borderRadius: 4 }}>
                {a.approved && <Diamond />}
                <div style={{
                  position: "absolute", bottom: -14, left: 12, zIndex: 2,
                  border: "2px solid #FFFFFF", borderRadius: "50%",
                }}>
                  <Av initials={a.friend.initials} size={28} />
                </div>
              </div>
              <div style={{ paddingTop: 22, paddingBottom: 4 }}>
                <p style={{ fontSize: 12, color: "#8A8680", marginBottom: 4 }}>
                  {a.fname} {a.action}
                </p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{a.venue}</p>
                <p style={{ fontSize: 12, color: "#8A8680" }}>{a.neighbourhood} · {a.cuisine}</p>
              </div>
            </div>
          ))}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </section>

      <div style={{ height: 1, background: "#E8E4DE", margin: "0 40px" }} />

      {/* Your List */}
      <YourList />

      <div style={{ height: 1, background: "#E8E4DE", margin: "0 40px" }} />

      {/* What Your Friends Rate Highest */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Label text="What Your Friends Rate Highest" />
          <div>
            {RANKED.map((r, i) => (
              <div key={i}>
                <div className="hoverable" style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 160px auto 80px",
                  alignItems: "center",
                  padding: "14px 0",
                  gap: 16,
                }}>
                  <span style={{ fontSize: 11, color: "#8A8680", fontWeight: 300 }}>{r.rank}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#111009" }}>{r.venue}</span>
                  <span style={{ fontSize: 12, color: "#8A8680" }}>{r.neighbourhood}</span>
                  <div className="avatar-stack">
                    {r.friends.slice(0, 3).map((fr, j) => (
                      <div key={j} className="av">
                        <Av initials={fr.initials} size={18} />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: "#8A8680", fontStyle: "italic", textAlign: "right" }}>
                    {r.rating}
                  </span>
                </div>
                {i < RANKED.length - 1 && (
                  <div style={{ height: 1, background: "#E8E4DE" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── PROFILE TAB ─────────────────────────────────────────────── */
function ProfileTab() {
  return (
    <div style={{ paddingTop: 120, textAlign: "center", paddingBottom: 80 }}>
      <div style={{ display: "inline-flex", justifyContent: "center" }}>
        <Av initials="P" size={64} />
      </div>
      <p style={{ fontSize: 18, fontWeight: 500, color: "#111009", marginTop: 16 }}>P.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
        {["47 been", "31 want to go", "12 favourites"].map((s) => (
          <span key={s} style={{ fontSize: 12, color: "#8A8680" }}>{s}</span>
        ))}
      </div>
      <div style={{ width: 200, height: 1, background: "#E8E4DE", margin: "32px auto" }} />
      <p style={{ fontSize: 12, fontStyle: "italic", color: "#8A8680" }}>profile coming soon</p>
    </div>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function SiteFooter() {
  return (
    <footer style={{
      borderTop: "1px solid #E8E4DE", height: 64,
      display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 40px",
    }}>
      <span style={{ fontSize: 12, color: "#8A8680" }}>bombay platelist</span>
      <span style={{ fontSize: 12, color: "#8A8680", fontStyle: "italic" }}>curating mumbai</span>
    </footer>
  );
}

/* ── TAB LAYOUT (default export) ─────────────────────────────── */
const TABS = ["home", "browse", "lists", "friends", "profile"] as const;
type Tab = (typeof TABS)[number];

export default function TabLayout() {
  const [active, setActive] = useState<Tab>("home");

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* Sticky header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        height: 52, background: "#FFFFFF",
        borderBottom: "1px solid #E8E4DE",
        display: "flex", alignItems: "center",
        padding: "0 40px", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 15, fontWeight: 400, color: "#111009", letterSpacing: "-0.01em" }}>
          bombay platelist
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="avatar-stack">
            {[F.PA, F.PK, F.AR].map((f, i) => (
              <div key={i} className="av"><Av initials={f.initials} size={24} /></div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#8A8680" }}>mumbai</span>
        </div>
      </header>

      {/* Tab bar — sticky below header */}
      <nav style={{
        position: "sticky", top: 52, zIndex: 40,
        background: "#FFFFFF", borderBottom: "1px solid #E8E4DE",
        display: "flex",
      }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "0 20px", height: 44,
              display: "inline-flex", alignItems: "center",
              fontSize: 13, fontWeight: 400, fontFamily: "inherit",
              border: "none",
              borderBottom: active === tab ? "2px solid #111009" : "2px solid transparent",
              background: "transparent",
              color: active === tab ? "#111009" : "#8A8680",
              cursor: "pointer",
              transition: "color 150ms ease",
              marginBottom: -1,
              outline: "none",
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab panels — instant show/hide, no animation */}
      <div style={{ display: active === "home"    ? "block" : "none" }}><HomeTab /></div>
      <div style={{ display: active === "browse"  ? "block" : "none" }}><BrowseTab /></div>
      <div style={{ display: active === "lists"   ? "block" : "none" }}><ListsTab /></div>
      <div style={{ display: active === "friends" ? "block" : "none" }}><FriendsTab /></div>
      <div style={{ display: active === "profile" ? "block" : "none" }}><ProfileTab /></div>

      <SiteFooter />
    </div>
  );
}
