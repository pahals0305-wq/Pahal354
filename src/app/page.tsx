import YourList from "@/components/YourList";
import ExploreByMoment from "@/components/ExploreByMoment";

/* ─── types ─────────────────────────────────────────────── */
type Friend = { initials: string; bg?: string };
type Activity = {
  friend: Friend;
  action: string;
  venue: string;
  neighbourhood: string;
  cuisine: string;
  img: string;
  approved?: boolean;
};
type Venue = {
  name: string;
  neighbourhood: string;
  cuisine: string;
  img: string;
  approved?: boolean;
  friends: Friend[];
  friendCount: number;
};
type ListCard = {
  name: string;
  img: string;
  curator: Friend;
  curatorName: string;
  count: number;
};
type Curator = {
  initials: string;
  name: string;
  descriptor: string;
  thumbs: string[];
};
type Ranked = {
  rank: number;
  venue: string;
  neighbourhood: string;
  friends: Friend[];
  rating: string;
};

/* ─── mock data ─────────────────────────────────────────── */
const FRIENDS: Record<string, Friend> = {
  PK: { initials: "PK" },
  AR: { initials: "AR" },
  SM: { initials: "SM" },
  VN: { initials: "VN" },
  TJ: { initials: "TJ" },
  PA: { initials: "PA" },
  RM: { initials: "RM" },
};

const ACTIVITY: Activity[] = [
  { friend: FRIENDS.PK, action: "marked this a favourite", venue: "The Bombay Canteen", neighbourhood: "Lower Parel", cuisine: "Contemporary Indian", img: "#e4e0d8", approved: true },
  { friend: FRIENDS.AR, action: "visited", venue: "Bade Miya", neighbourhood: "Colaba", cuisine: "Street Food", img: "#eae7e2", approved: false },
  { friend: FRIENDS.SM, action: "added to want to go", venue: "Mahesh Lunch Home", neighbourhood: "Fort", cuisine: "Seafood", img: "#ddd9d3", approved: true },
  { friend: FRIENDS.VN, action: "loved", venue: "The Table", neighbourhood: "Colaba", cuisine: "European", img: "#e4e0d8", approved: true },
  { friend: FRIENDS.TJ, action: "checked in at", venue: "Lucky Restaurant", neighbourhood: "Bandra", cuisine: "Irani Café", img: "#eae7e2", approved: false },
  { friend: FRIENDS.PK, action: "added to want to go", venue: "Khyber", neighbourhood: "Fort", cuisine: "Mughlai", img: "#ddd9d3", approved: true },
];

const NEW_OPENINGS: Venue[] = [
  { name: "Café Zoe", neighbourhood: "Mahalaxmi", cuisine: "All-day", img: "#eae7e2", approved: false, friends: [FRIENDS.PA, FRIENDS.PK, FRIENDS.AR], friendCount: 3 },
  { name: "Goa Portuguesa", neighbourhood: "Mahim", cuisine: "Goan", img: "#ddd9d3", approved: true, friends: [FRIENDS.SM, FRIENDS.VN, FRIENDS.TJ], friendCount: 5 },
  { name: "The Clearing House", neighbourhood: "Fort", cuisine: "Contemporary", img: "#e4e0d8", approved: true, friends: [FRIENDS.PK, FRIENDS.AR], friendCount: 2 },
  { name: "Aer Bar & Kitchen", neighbourhood: "Worli", cuisine: "Cocktail Bar", img: "#eae7e2", approved: false, friends: [FRIENDS.PA, FRIENDS.TJ, FRIENDS.VN], friendCount: 4 },
  { name: "Arth", neighbourhood: "Juhu", cuisine: "Modern Indian", img: "#ddd9d3", approved: true, friends: [FRIENDS.SM], friendCount: 1 },
];

const AREAS = ["Bandra", "Colaba", "Kala Ghoda", "Juhu", "Worli", "Dadar", "Andheri", "Fort", "Lower Parel", "Matunga", "Pali Hill", "Versova"];

const LISTS: ListCard[] = [
  { name: "best for a long lunch", img: "#e4e0d8", curator: FRIENDS.RM, curatorName: "Rahul M.", count: 8 },
  { name: "worth the travel", img: "#eae7e2", curator: FRIENDS.PA, curatorName: "Pahal S.", count: 6 },
  { name: "tables for two", img: "#ddd9d3", curator: FRIENDS.RM, curatorName: "Rahul M.", count: 10 },
  { name: "neighbourhood icons", img: "#e4e0d8", curator: FRIENDS.PA, curatorName: "Pahal S.", count: 12 },
  { name: "open late", img: "#eae7e2", curator: FRIENDS.SM, curatorName: "Sara M.", count: 7 },
  { name: "the wine list matters here", img: "#ddd9d3", curator: FRIENDS.RM, curatorName: "Rahul M.", count: 9 },
  { name: "counter dining done right", img: "#e4e0d8", curator: FRIENDS.AR, curatorName: "Arjun R.", count: 5 },
  { name: "brought by a friend", img: "#eae7e2", curator: FRIENDS.TJ, curatorName: "Tara J.", count: 8 },
];

const CURATORS: Curator[] = [
  { initials: "RM", name: "Rahul M.", descriptor: "food writer", thumbs: ["#e4e0d8", "#ddd9d3", "#eae7e2"] },
  { initials: "AS", name: "Aditi S.", descriptor: "chef, Bandra", thumbs: ["#eae7e2", "#e4e0d8", "#ddd9d3"] },
  { initials: "JK", name: "Jay K.", descriptor: "been to 94 places", thumbs: ["#ddd9d3", "#eae7e2", "#e4e0d8"] },
  { initials: "PT", name: "Priya T.", descriptor: "restaurant consultant", thumbs: ["#e4e0d8", "#ddd9d3", "#eae7e2"] },
  { initials: "VN", name: "Vikram N.", descriptor: "been to 78 places", thumbs: ["#eae7e2", "#e4e0d8", "#ddd9d3"] },
];

const RECENTLY_APPROVED: Venue[] = [
  { name: "Masala Library", neighbourhood: "BKC", cuisine: "Modern Indian", img: "#e4e0d8", approved: true, friends: [FRIENDS.PK, FRIENDS.AR, FRIENDS.SM], friendCount: 6 },
  { name: "Bayroute", neighbourhood: "Juhu", cuisine: "Lebanese", img: "#eae7e2", approved: true, friends: [FRIENDS.VN, FRIENDS.TJ], friendCount: 4 },
  { name: "O Pedro", neighbourhood: "BKC", cuisine: "Goan", img: "#ddd9d3", approved: true, friends: [FRIENDS.PA, FRIENDS.PK, FRIENDS.AR], friendCount: 7 },
  { name: "Bastian", neighbourhood: "Bandra", cuisine: "Seafood", img: "#e4e0d8", approved: true, friends: [FRIENDS.SM, FRIENDS.VN], friendCount: 5 },
  { name: "Sequel", neighbourhood: "Bandra", cuisine: "Health Café", img: "#eae7e2", approved: false, friends: [FRIENDS.TJ, FRIENDS.PK], friendCount: 3 },
  { name: "Pali Village Café", neighbourhood: "Pali Hill", cuisine: "All-day", img: "#ddd9d3", approved: true, friends: [FRIENDS.AR, FRIENDS.PA], friendCount: 4 },
];

const RANKED: Ranked[] = [
  { rank: 1, venue: "The Bombay Canteen", neighbourhood: "Lower Parel", friends: [FRIENDS.PK, FRIENDS.AR, FRIENDS.SM], rating: "loved" },
  { rank: 2, venue: "Bade Miya", neighbourhood: "Colaba", friends: [FRIENDS.VN, FRIENDS.TJ, FRIENDS.PA], rating: "go back" },
  { rank: 3, venue: "The Table", neighbourhood: "Colaba", friends: [FRIENDS.PK, FRIENDS.AR], rating: "loved" },
  { rank: 4, venue: "Mahesh Lunch Home", neighbourhood: "Fort", friends: [FRIENDS.SM, FRIENDS.VN, FRIENDS.TJ], rating: "solid" },
  { rank: 5, venue: "O Pedro", neighbourhood: "BKC", friends: [FRIENDS.PA, FRIENDS.PK], rating: "loved" },
  { rank: 6, venue: "Masala Library", neighbourhood: "BKC", friends: [FRIENDS.AR, FRIENDS.SM, FRIENDS.VN], rating: "go back" },
  { rank: 7, venue: "Bastian", neighbourhood: "Bandra", friends: [FRIENDS.TJ, FRIENDS.PK, FRIENDS.AR], rating: "solid" },
  { rank: 8, venue: "Bayroute", neighbourhood: "Juhu", friends: [FRIENDS.PA, FRIENDS.VN], rating: "loved" },
  { rank: 9, venue: "Khyber", neighbourhood: "Fort", friends: [FRIENDS.SM, FRIENDS.TJ], rating: "solid" },
  { rank: 10, venue: "Lucky Restaurant", neighbourhood: "Bandra", friends: [FRIENDS.PK, FRIENDS.AR, FRIENDS.PA], rating: "go back" },
];

const VIBES = ["date night", "sunday brunch", "natural wine", "big groups", "outdoor seating", "late night", "hidden gem", "solo friendly", "good for work", "special occasion", "vegetarian-forward", "counter dining"];

/* ─── small shared components ───────────────────────────── */
function Av({ initials, size = 24 }: { initials: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#f5f3f0",
        border: "1.5px solid #ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 400,
        color: "#8a8680",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}

function FriendRow({ friends, count }: { friends: Friend[]; count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
      <div className="avatar-stack">
        {friends.slice(0, 3).map((f, i) => (
          <div key={i} className="av">
            <Av initials={f.initials} size={18} />
          </div>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "#8a8680" }}>{count} friends have been</span>
    </div>
  );
}

function Diamond() {
  return (
    <span
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        fontSize: 11,
        color: "#d4962a",
        lineHeight: 1,
      }}
    >
      ◆
    </span>
  );
}

/* ─── page ──────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 52,
          background: "#ffffff",
          borderBottom: "1px solid #e8e4de",
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 400, color: "#111009", letterSpacing: "-0.01em" }}>
          bombay platelist
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Friend avatars online */}
          <div className="avatar-stack">
            {[FRIENDS.PA, FRIENDS.PK, FRIENDS.AR].map((f, i) => (
              <div key={i} className="av">
                <Av initials={f.initials} size={24} />
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#8a8680" }}>mumbai</span>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main>

        {/* ── SECTION 1: FRIENDS' ACTIVITY ── */}
        <section style={{ padding: "40px 0 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Friends&apos; Activity</p>
          </div>
          <div
            className="scroll-row"
            style={{ paddingLeft: 40, paddingRight: 40, gap: 16 }}
          >
            {ACTIVITY.map((a, i) => (
              <div
                key={i}
                className="hoverable"
                style={{ width: 260, flexShrink: 0, borderRadius: 4, overflow: "visible" }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 180, background: a.img, borderRadius: 4, overflow: "visible" }}>
                  {a.approved && <Diamond />}
                  {/* Sticker avatar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -14,
                      left: 12,
                      zIndex: 2,
                      border: "2px solid #ffffff",
                      borderRadius: "50%",
                    }}
                  >
                    <Av initials={a.friend.initials} size={28} />
                  </div>
                </div>
                {/* Text */}
                <div style={{ paddingTop: 22, paddingBottom: 4 }}>
                  <p style={{ fontSize: 12, color: "#8a8680", marginBottom: 4 }}>
                    {a.friend.initials === "PK" ? "Priya" :
                     a.friend.initials === "AR" ? "Arjun" :
                     a.friend.initials === "SM" ? "Sara" :
                     a.friend.initials === "VN" ? "Vikram" :
                     a.friend.initials === "TJ" ? "Tara" : a.friend.initials}{" "}
                    {a.action}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{a.venue}</p>
                  <p style={{ fontSize: 12, color: "#8a8680" }}>{a.neighbourhood} · {a.cuisine}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 2: NEW OPENINGS ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">New Openings</p>
          </div>
          <div className="scroll-row" style={{ paddingLeft: 40, paddingRight: 40, gap: 16 }}>
            {NEW_OPENINGS.map((v, i) => (
              <div
                key={i}
                className="hoverable"
                style={{ width: 280, flexShrink: 0, borderRadius: 4, overflow: "hidden" }}
              >
                <div style={{ position: "relative", height: 200, background: v.img }}>
                  {v.approved && <Diamond />}
                </div>
                <div style={{ paddingTop: 12, paddingBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{v.name}</p>
                  <p style={{ fontSize: 12, color: "#8a8680" }}>{v.neighbourhood} · {v.cuisine}</p>
                  <FriendRow friends={v.friends} count={v.friendCount} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 3: AREAS ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Areas</p>
          </div>
          <div className="scroll-row" style={{ paddingLeft: 40, paddingRight: 40, gap: 8 }}>
            {AREAS.map((area) => (
              <button key={area} className="area-chip">{area}</button>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 4: YOUR LIST ── */}
        <YourList />

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 5: EDITOR'S LISTS ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Editor&apos;s Lists</p>

            {/* Part A — Featured list */}
            <div
              style={{
                display: "flex",
                height: 280,
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 24,
              }}
            >
              {/* Left image */}
              <div style={{ width: "50%", background: "#e4e0d8", flexShrink: 0 }} />
              {/* Right panel */}
              <div
                style={{
                  width: "50%",
                  background: "#f5f3f0",
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#8a8680",
                      marginBottom: 12,
                    }}
                  >
                    Editor&apos;s Pick
                  </p>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#111009",
                      lineHeight: 1.35,
                      marginBottom: 16,
                    }}
                  >
                    the mumbai classics you should have eaten by now
                  </p>
                  <p style={{ fontSize: 13, color: "#8a8680", lineHeight: 1.6, maxWidth: 320 }}>
                    Places that have been here longer than you. The ones that define what eating in this city actually means.
                  </p>
                </div>
                <p style={{ fontSize: 11, color: "#8a8680" }}>
                  14 places&nbsp;&nbsp;·&nbsp;&nbsp;
                  <em>by the bombay platelist team</em>
                </p>
              </div>
            </div>

            {/* Part B — horizontal scroll */}
          </div>
          <div className="scroll-row" style={{ paddingLeft: 40, paddingRight: 40, gap: 16 }}>
            {LISTS.map((l, i) => (
              <div
                key={i}
                className="hoverable"
                style={{ width: 220, flexShrink: 0, borderRadius: 4, overflow: "hidden" }}
              >
                <div style={{ height: 150, background: l.img }} />
                <div style={{ paddingTop: 10, paddingBottom: 4 }}>
                  <p style={{ fontSize: 13, fontStyle: "italic", fontWeight: 400, color: "#111009", marginBottom: 8 }}>
                    {l.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Av initials={l.curator.initials} size={16} />
                    <span style={{ fontSize: 11, color: "#8a8680" }}>by {l.curatorName}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#8a8680" }}>{l.count} places</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 5B: CURATED BY PEOPLE WE TRUST ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Curated by People We Trust</p>
          </div>
          <div className="scroll-row" style={{ paddingLeft: 40, paddingRight: 40, gap: 16 }}>
            {CURATORS.map((c, i) => (
              <div
                key={i}
                className="hoverable"
                style={{
                  width: 180,
                  flexShrink: 0,
                  background: "#ffffff",
                  borderBottom: "1px solid #e8e4de",
                  paddingBottom: 16,
                }}
              >
                <Av initials={c.initials} size={48} />
                <p style={{ fontSize: 13, fontWeight: 500, color: "#111009", marginTop: 10, marginBottom: 3 }}>
                  {c.name}
                </p>
                <p style={{ fontSize: 11, color: "#8a8680", marginBottom: 12 }}>{c.descriptor}</p>
                {/* Thumbnails */}
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {c.thumbs.map((t, j) => (
                    <div key={j} style={{ width: 40, height: 40, background: t, borderRadius: 2 }} />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "#8a8680" }}>see their list →</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── EXPLORE BY MOMENT ── */}
        <ExploreByMoment />

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 6: BROWSE BY VIBE ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Browse by Vibe</p>
          </div>
          <div className="scroll-row" style={{ paddingLeft: 40, paddingRight: 40, gap: 8 }}>
            {VIBES.map((v) => (
              <button key={v} className="chip">{v}</button>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 7: RECENTLY APPROVED ── */}
        <section style={{ padding: "32px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">Recently Approved</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {RECENTLY_APPROVED.map((v, i) => (
                <div
                  key={i}
                  className="hoverable"
                  style={{ borderRadius: 4, overflow: "hidden" }}
                >
                  <div style={{ position: "relative", height: 200, background: v.img }}>
                    {v.approved && <Diamond />}
                  </div>
                  <div style={{ paddingTop: 12, paddingBottom: 4 }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{v.name}</p>
                    <p style={{ fontSize: 12, color: "#8a8680" }}>{v.neighbourhood} · {v.cuisine}</p>
                    <FriendRow friends={v.friends} count={v.friendCount} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: 1, background: "#e8e4de", margin: "8px 40px" }} />

        {/* ── SECTION 8: WHAT YOUR FRIENDS RATE HIGHEST ── */}
        <section style={{ padding: "32px 0 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p className="section-label">What Your Friends Rate Highest</p>
            <div>
              {RANKED.map((r, i) => (
                <div key={i}>
                  <div
                    className="hoverable"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1fr 160px auto 80px",
                      alignItems: "center",
                      padding: "14px 0",
                      gap: 16,
                    }}
                  >
                    {/* Rank */}
                    <span style={{ fontSize: 11, color: "#8a8680", fontWeight: 300 }}>{r.rank}</span>
                    {/* Venue */}
                    <span style={{ fontSize: 15, fontWeight: 500, color: "#111009" }}>{r.venue}</span>
                    {/* Neighbourhood */}
                    <span style={{ fontSize: 12, color: "#8a8680" }}>{r.neighbourhood}</span>
                    {/* Friends */}
                    <div className="avatar-stack">
                      {r.friends.slice(0, 3).map((f, j) => (
                        <div key={j} className="av">
                          <Av initials={f.initials} size={18} />
                        </div>
                      ))}
                    </div>
                    {/* Rating */}
                    <span style={{ fontSize: 11, color: "#8a8680", fontStyle: "italic", textAlign: "right" }}>
                      {r.rating}
                    </span>
                  </div>
                  {i < RANKED.length - 1 && (
                    <div style={{ height: 1, background: "#e8e4de" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid #e8e4de",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        <span style={{ fontSize: 12, color: "#8a8680" }}>bombay platelist</span>
        <span style={{ fontSize: 12, color: "#8a8680", fontStyle: "italic" }}>curating mumbai</span>
      </footer>

    </div>
  );
}
