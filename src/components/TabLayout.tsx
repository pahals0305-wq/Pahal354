"use client";
import { useState } from "react";
import { Home, Search, BookOpen, Users, User } from "lucide-react";
import YourList from "./YourList";
import BrowseTab from "./BrowseTab";
import { restaurants } from "@/data/restaurants";

/* ── TYPES ───────────────────────────────────────────────────── */
type Friend = { initials: string };
type ActivityData = {
  friend: Friend; fname: string; action: string;
  venue: string; neighbourhood: string; cuisine: string;
  img: string; approved: boolean;
};
type ListData = {
  title: string; curator: string; curatorInitials: string;
  count: number; img: string;
};
type RankedData = {
  rank: number; venue: string; neighbourhood: string;
  friends: Friend[]; rating: string;
};

/* ── SOCIAL / UI DATA ────────────────────────────────────────── */
const F: Record<string, Friend> = {
  PA: { initials: "PA" }, PK: { initials: "PK" }, AR: { initials: "AR" },
  SM: { initials: "SM" }, VN: { initials: "VN" }, TJ: { initials: "TJ" },
};

const ALL_LISTS: ListData[] = [
  { title: "best for a long lunch",                          curator: "by P.",                        curatorInitials: "P",  count: 9,  img: "#E4E0D8" },
  { title: "worth the travel",                               curator: "by P.",                        curatorInitials: "P",  count: 7,  img: "#EAE7E2" },
  { title: "tables for two",                                 curator: "by the bombay platelist team", curatorInitials: "BP", count: 12, img: "#DDD9D3" },
  { title: "the wine list matters here",                     curator: "by P.",                        curatorInitials: "P",  count: 6,  img: "#E0DDD6" },
  { title: "open late",                                      curator: "by the bombay platelist team", curatorInitials: "BP", count: 11, img: "#E4E0D8" },
  { title: "counter dining done right",                      curator: "by P.",                        curatorInitials: "P",  count: 8,  img: "#EAE7E2" },
  { title: "tasting menus worth clearing your calendar for", curator: "by the bombay platelist team", curatorInitials: "BP", count: 5,  img: "#DDD9D3" },
  { title: "neighbourhood icons",                            curator: "by P.",                        curatorInitials: "P",  count: 14, img: "#E0DDD6" },
  { title: "new mumbai",                                     curator: "by the bombay platelist team", curatorInitials: "BP", count: 6,  img: "#E4E0D8" },
  { title: "brought by a friend",                            curator: "by Tara J.",                   curatorInitials: "TJ", count: 8,  img: "#EAE7E2" },
  { title: "the classics",                                   curator: "by P.",                        curatorInitials: "P",  count: 10, img: "#DDD9D3" },
  { title: "worth clearing your sunday for",                 curator: "by the bombay platelist team", curatorInitials: "BP", count: 7,  img: "#E0DDD6" },
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

/* ── HERO STRIP — pure mood images, no venue names ──────────── */
const heroImg = (id: string, tags: string) => ({
  img: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=75`,
  tags,
});
const HERO_IMAGES = [
  heroImg("1555396273-b63c3e1e7d41", "Contemporary Indian · Date Night · Lower Parel"),
  heroImg("1414235077428-338989a2e8c0", "Tasting Menu · Modern Indian · Special Occasion"),
  heroImg("1579871494447-9811cf80d66c", "Japanese · Omakase · BKC"),
  heroImg("1504674900247-0877df9cc836", "Fine Dining · Seasonal Menu · Mahalaxmi"),
  heroImg("1499028344343-cd173f05b3a7", "Modern Indian · Worth the Travel · Fort"),
  heroImg("1565299624946-b28f40a0ae38", "Italian · Date Night · Candlelit"),
  heroImg("1540189549336-e6e99c3679fe", "Lebanese · Mezze Spread · Juhu"),
  heroImg("1543007631-283050bb3e8c", "Cocktail Bar · After Midnight · South Bombay"),
  heroImg("1495474472287-4d71bcdd2085", "Sunday Brunch · Slow Eggs · Bandra"),
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
    }}>{initials}</div>
  );
}

function Diamond() {
  return <span style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#D4962A" }}>◆</span>;
}

/* ── ONEZONE-STYLE VENUE CARD ────────────────────────────────── */
function OZCard({
  name, area, img, tags, imgHeight = 240,
}: {
  name?: string; area?: string; img: string; tags: string; imgHeight?: number;
}) {
  return (
    <div className="hoverable" style={{ width: 220, flexShrink: 0 }}>
      {name && (
        <>
          <p style={{
            fontSize: 13, fontWeight: 500, color: "#111009",
            textTransform: "uppercase", letterSpacing: "0.03em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{name}</p>
          <p style={{ fontSize: 12, color: "#8A8680", marginTop: 2, marginBottom: 10 }}>{area}</p>
        </>
      )}
      <div style={{ height: imgHeight, borderRadius: 4, overflow: "hidden", background: "#E8E4DE" }}>
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <p style={{ fontSize: 11, color: "#8A8680", marginTop: 8, lineHeight: 1.6 }}>{tags}</p>
    </div>
  );
}

/* ── SECTION HEADER ──────────────────────────────────────────── */
function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <p style={{ fontSize: 15, fontWeight: 500, color: "#111009" }}>{title}</p>
        {subtitle && (
          <p style={{ fontSize: 12, color: "#8A8680", fontStyle: "italic", marginTop: 4 }}>{subtitle}</p>
        )}
      </div>
      <a
        href="#"
        style={{ fontSize: 13, color: "#8A8680", textDecoration: "none", flexShrink: 0, marginLeft: 16, paddingTop: subtitle ? 2 : 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        Show all
      </a>
    </div>
  );
}

/* ── HOME TAB ────────────────────────────────────────────────── */
function HomeTab() {
  const newInMumbai   = restaurants.filter(r => r.tags.includes("New in Mumbai")).slice(0, 8);
  const editorsPicks  = restaurants.filter(r => r.tags.includes("Editor's Pick")).slice(0, 8);
  const girlsNight    = restaurants.filter(r => r.tags.includes("Girls' Night Out")).slice(0, 8);
  const dateNight     = restaurants.filter(r => r.tags.includes("Date Night Done Right")).slice(0, 8);
  const afterMidnight = restaurants.filter(r => r.tags.includes("After Midnight")).slice(0, 8);
  const oldBombay     = restaurants.filter(r => r.tags.includes("Old Bombay")).slice(0, 8);
  const sundayMorning = restaurants.filter(r => r.tags.includes("Sunday Morning")).slice(0, 8);
  const hiddenMumbai  = restaurants.filter(r => r.tags.includes("Hidden Mumbai")).slice(0, 8);
  const worthTravel   = restaurants.filter(r => r.tags.includes("Worth the Travel")).slice(0, 8);
  const pahalsPicks   = restaurants.filter(r => r.pahalsPick).slice(0, 8);

  const Divider = () => <div style={{ height: 1, background: "#E8E4DE", margin: "40px 0 0" }} />;

  function Section({
    title, subtitle, data,
  }: {
    title: string; subtitle?: string;
    data: typeof restaurants;
  }) {
    return (
      <>
        <Divider />
        <section style={{ padding: "40px 0 0" }}>
          <div style={{ padding: "0 24px" }}>
            <SectionHead title={title} subtitle={subtitle} />
          </div>
          <div className="scroll-row" style={{ paddingLeft: 24, gap: 16 }}>
            {data.map((r) => (
              <OZCard
                key={r.id}
                name={r.name}
                area={r.area}
                img={r.image}
                tags={r.cuisine.join(" · ")}
              />
            ))}
            <div style={{ width: 24, flexShrink: 0 }} />
          </div>
        </section>
      </>
    );
  }

  return (
    <div style={{ paddingBottom: 80 }}>

      {/* Hero image strip — mood only, no names */}
      <div className="scroll-row" style={{ padding: "32px 0 32px 24px", gap: 12 }}>
        {HERO_IMAGES.map((v, i) => (
          <OZCard key={i} img={v.img} tags={v.tags} imgHeight={280} />
        ))}
        <div style={{ width: 24, flexShrink: 0 }} />
      </div>

      <Section title="New in Mumbai"          subtitle="what just opened"                                              data={newInMumbai}   />
      <Section title="Editor's Picks"         subtitle="the list we'd actually use"                                   data={editorsPicks}  />
      <Section title="Girls' Night Out"       subtitle="cocktail bars, see-and-be-seen spots, Bandra to Juhu"         data={girlsNight}    />
      <Section title="Date Night Done Right"  subtitle="dim rooms, bookable tables, places that mean something"       data={dateNight}     />
      <Section title="After Midnight"         subtitle="still open, still worth it, no judgment"                     data={afterMidnight} />
      <Section title="Old Bombay"             subtitle="restaurants that have outlasted everything the city threw at them" data={oldBombay} />
      <Section title="Sunday Morning"         subtitle="slow eggs, strong coffee, nowhere to be"                     data={sundayMorning} />
      <Section title="Hidden Mumbai"          subtitle="no gram presence. locals only. you're welcome"               data={hiddenMumbai}  />
      <Section title="Worth the Travel"       subtitle="the spots people actually fly in for"                        data={worthTravel}   />
      <Section title="Pahal's Picks"          subtitle="personally vetted. been there. would go back."              data={pahalsPicks}   />
    </div>
  );
}

/* ── LISTS TAB ───────────────────────────────────────────────── */
function ListsTab() {
  return (
    <div>
      {/* Featured card */}
      <div style={{ padding: "40px 24px 0" }}>
        <div style={{ display: "flex", minHeight: 280, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: "55%", background: "#DDD9D3", flexShrink: 0 }} />
          <div style={{
            width: "45%", background: "#F5F3F0", padding: 40,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8680" }}>
                Editor&apos;s Pick
              </p>
              <p style={{ fontSize: 22, fontWeight: 300, fontStyle: "italic", color: "#111009", lineHeight: 1.35, marginTop: 12 }}>
                the mumbai classics you should have eaten by now
              </p>
              <p style={{ fontSize: 13, color: "#8A8680", lineHeight: 1.6, marginTop: 14, maxWidth: 320 }}>
                Places that have been here longer than you. The ones that define what eating in this city actually means.
              </p>
            </div>
            <p style={{ fontSize: 11, color: "#8A8680" }}>14 places · <em>by the bombay platelist team</em></p>
          </div>
        </div>
      </div>

      {/* All lists grid */}
      <div style={{ padding: "40px 24px 80px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8680", marginBottom: 24 }}>
          All Lists
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {ALL_LISTS.map((l, i) => (
            <div key={i} className="hoverable">
              <div style={{ height: 180, background: l.img, borderRadius: 4 }} />
              <div style={{ paddingTop: 12 }}>
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
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FRIENDS TAB ─────────────────────────────────────────────── */
function FriendsTab() {
  return (
    <div>
      <div style={{ paddingTop: 40, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#8A8680" }}>
          5 friends on bombay platelist · 3 active this week
        </p>
      </div>

      {/* Friends' Activity */}
      <section style={{ padding: "32px 0 32px" }}>
        <div style={{ padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8680", marginBottom: 20 }}>
            Friends&apos; Activity
          </p>
        </div>
        <div className="scroll-row" style={{ paddingLeft: 24, gap: 16 }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="hoverable" style={{ width: 260, flexShrink: 0, overflow: "visible" }}>
              <div style={{ position: "relative", height: 180, background: a.img, borderRadius: 4 }}>
                {a.approved && <Diamond />}
                <div style={{ position: "absolute", bottom: -14, left: 12, zIndex: 2, border: "2px solid #FFFFFF", borderRadius: "50%" }}>
                  <Av initials={a.friend.initials} size={28} />
                </div>
              </div>
              <div style={{ paddingTop: 22, paddingBottom: 4 }}>
                <p style={{ fontSize: 12, color: "#8A8680", marginBottom: 4 }}>{a.fname} {a.action}</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{a.venue}</p>
                <p style={{ fontSize: 12, color: "#8A8680" }}>{a.neighbourhood} · {a.cuisine}</p>
              </div>
            </div>
          ))}
          <div style={{ width: 24, flexShrink: 0 }} />
        </div>
      </section>

      <div style={{ height: 1, background: "#E8E4DE", margin: "0 24px" }} />
      <YourList />
      <div style={{ height: 1, background: "#E8E4DE", margin: "0 24px" }} />

      {/* Ranked */}
      <section style={{ padding: "32px 24px 80px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8680", marginBottom: 20 }}>
          What Your Friends Rate Highest
        </p>
        {RANKED.map((r, i) => (
          <div key={i}>
            <div className="hoverable" style={{
              display: "grid", gridTemplateColumns: "32px 1fr 160px auto 80px",
              alignItems: "center", padding: "14px 0", gap: 16,
            }}>
              <span style={{ fontSize: 11, color: "#8A8680", fontWeight: 300 }}>{r.rank}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: "#111009" }}>{r.venue}</span>
              <span style={{ fontSize: 12, color: "#8A8680" }}>{r.neighbourhood}</span>
              <div className="avatar-stack">
                {r.friends.slice(0, 3).map((fr, j) => (
                  <div key={j} className="av"><Av initials={fr.initials} size={18} /></div>
                ))}
              </div>
              <span style={{ fontSize: 11, color: "#8A8680", fontStyle: "italic", textAlign: "right" }}>{r.rating}</span>
            </div>
            {i < RANKED.length - 1 && <div style={{ height: 1, background: "#E8E4DE" }} />}
          </div>
        ))}
      </section>
    </div>
  );
}

/* ── PROFILE TAB ─────────────────────────────────────────────── */
function ProfileTab() {
  return (
    <div style={{ paddingTop: 120, textAlign: "center", paddingBottom: 80 }}>
      <div style={{ display: "inline-flex" }}>
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
      justifyContent: "space-between", padding: "0 24px",
    }}>
      <span style={{ fontSize: 12, color: "#8A8680" }}>bombay platelist</span>
      <span style={{ fontSize: 12, color: "#8A8680", fontStyle: "italic" }}>curating mumbai</span>
    </footer>
  );
}

/* ── SIDEBAR NAV ─────────────────────────────────────────────── */
type Tab = "home" | "browse" | "lists" | "friends" | "profile";
const NAV = [
  { tab: "home"    as Tab, label: "Home",     icon: Home     },
  { tab: "browse"  as Tab, label: "Explore",  icon: Search   },
  { tab: "lists"   as Tab, label: "Lists",    icon: BookOpen },
  { tab: "friends" as Tab, label: "Activity", icon: Users    },
  { tab: "profile" as Tab, label: "Profile",  icon: User     },
];

function NavItem({
  item, active, onClick,
}: {
  item: typeof NAV[0]; active: boolean; onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%", padding: "12px 24px",
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "inherit",
        color: active ? "#111009" : "#8A8680",
        transition: "color 150ms ease",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#111009"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#8A8680"; }}
    >
      <Icon size={18} strokeWidth={active ? 2 : 1.5} />
      <span style={{ fontSize: 14, fontWeight: active ? 500 : 400 }}>{item.label}</span>
    </button>
  );
}

/* ── TAB LAYOUT ──────────────────────────────────────────────── */
export default function TabLayout() {
  const [active, setActive] = useState<Tab>("home");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>

      {/* Fixed left sidebar */}
      <aside style={{
        position: "fixed", left: 0, top: 0, bottom: 0,
        width: 200, background: "#FFFFFF",
        borderRight: "1px solid #E8E4DE",
        display: "flex", flexDirection: "column",
        zIndex: 50,
      }}>
        <div style={{ padding: "28px 24px 0" }}>
          <p style={{ fontSize: 10, color: "#8A8680", letterSpacing: "0.12em", textTransform: "uppercase" }}>Mumbai</p>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#111009", marginTop: 4, lineHeight: 1.2 }}>
            bombay platelist
          </p>
        </div>

        <nav style={{ flex: 1, marginTop: 32 }}>
          {NAV.map((item) => (
            <NavItem key={item.tab} item={item} active={active === item.tab} onClick={() => setActive(item.tab)} />
          ))}
        </nav>

        <div style={{ padding: "0 24px 28px" }}>
          <p style={{ fontSize: 10, color: "#8A8680" }}>Current City</p>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#111009", marginTop: 2 }}>Mumbai</p>
          <p style={{ fontSize: 10, color: "#8A8680", fontStyle: "italic", marginTop: 3 }}>Curating Mumbai</p>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 200, flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: active === "home"    ? "block" : "none" }}><HomeTab /></div>
          <div style={{ display: active === "browse"  ? "block" : "none" }}><BrowseTab /></div>
          <div style={{ display: active === "lists"   ? "block" : "none" }}><ListsTab /></div>
          <div style={{ display: active === "friends" ? "block" : "none" }}><FriendsTab /></div>
          <div style={{ display: active === "profile" ? "block" : "none" }}><ProfileTab /></div>
        </div>
        <SiteFooter />
      </main>

    </div>
  );
}
