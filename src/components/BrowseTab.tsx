"use client";
import { useRef, useState } from "react";

/* ── TYPES ───────────────────────────────────────────────────── */
type FilterType = "type" | "area" | "cuisine" | "occasion" | "vibe";
type ActiveFilter = { filterType: FilterType; value: string };
type VenueResult = {
  name: string; neighbourhood: string; cuisine: string;
  venueType: string; approved: boolean; img: string;
};

/* ── PALETTE ─────────────────────────────────────────────────── */
const IMGS = ["#E4E0D8", "#EAE7E2", "#DDD9D3", "#E0DDD6"];
const img = (i: number) => IMGS[i % 4];

/* ── CATEGORY DATA ───────────────────────────────────────────── */
const PLACE_TYPES = [
  { name: "restaurant",           count: "180 places" },
  { name: "bar",                  count: "42 places"  },
  { name: "café",                 count: "38 places"  },
  { name: "bakery & patisserie",  count: "24 places"  },
  { name: "dessert bar",          count: "18 places"  },
  { name: "brewery & taproom",    count: "8 places"   },
  { name: "rooftop",              count: "14 places"  },
  { name: "members club",         count: "2 places"   },
];

const AREAS = [
  { name: "Bandra",       count: "80+ venues" },
  { name: "BKC",          count: "45+ venues" },
  { name: "Lower Parel",  count: "32+ venues" },
  { name: "Colaba",       count: "28+ venues" },
  { name: "Fort",         count: "24+ venues" },
  { name: "Worli",        count: "22+ venues" },
  { name: "Juhu",         count: "30+ venues" },
  { name: "Andheri",      count: "35+ venues" },
  { name: "Kala Ghoda",   count: "12+ venues" },
  { name: "Versova",      count: "10+ venues" },
  { name: "Mahalaxmi",    count: "8+ venues"  },
  { name: "Santacruz",    count: "15+ venues" },
  { name: "Matunga",      count: "8+ venues"  },
  { name: "Pali Hill",    count: "10+ venues" },
  { name: "Powai",        count: "12+ venues" },
  { name: "Dadar",        count: "14+ venues" },
];

const CUISINES = [
  { name: "modern indian",      count: "12 places" },
  { name: "north indian",       count: "28 places" },
  { name: "south indian",       count: "6 places"  },
  { name: "japanese",           count: "18 places" },
  { name: "chinese & dim sum",  count: "14 places" },
  { name: "pan-asian",          count: "16 places" },
  { name: "italian",            count: "32 places" },
  { name: "mediterranean",      count: "8 places"  },
  { name: "middle eastern",     count: "10 places" },
  { name: "mexican & spanish",  count: "14 places" },
  { name: "thai",               count: "8 places"  },
  { name: "korean",             count: "4 places"  },
  { name: "seafood",            count: "10 places" },
  { name: "street food",        count: "12 places" },
  { name: "all-day dining",     count: "16 places" },
  { name: "continental",        count: "10 places" },
  { name: "desserts",           count: "22 places" },
  { name: "coffee",             count: "18 places" },
];

const OCCASIONS = [
  { name: "date night",         descriptor: "intimate, worth booking ahead"       },
  { name: "sunday brunch",      descriptor: "slow mornings, big tables"           },
  { name: "long lunch",         descriptor: "the kind that becomes dinner"        },
  { name: "business lunch",     descriptor: "somewhere that means something"      },
  { name: "big group",          descriptor: "8+ people, no drama"                },
  { name: "birthday dinner",    descriptor: "make it a night"                    },
  { name: "solo",               descriptor: "no judgment, good coffee"           },
  { name: "parents in town",    descriptor: "impress without trying too hard"    },
  { name: "late night",         descriptor: "still open, still good"             },
  { name: "quick coffee",       descriptor: "in and out, no pressure"            },
  { name: "special occasion",   descriptor: "clear your calendar"                },
  { name: "work friendly",      descriptor: "wifi assumed, noise manageable"     },
];

const VIBES = [
  "worth the travel", "old bombay", "new mumbai", "see and be seen",
  "quiet enough to talk", "loud and lively", "hidden gem", "walk-ins welcome",
  "counter seats", "outdoor tables", "natural wine", "craft cocktails",
  "tasting menu", "neighbourhood regular", "bring cash", "vegetarian friendly",
  "good for the gram", "opens late", "worth the hype", "under the radar",
  "by the water", "rooftop views", "no reservations needed", "book weeks ahead",
];

/* ── RESULTS DATA ────────────────────────────────────────────── */
const RESULTS: Record<string, VenueResult[]> = {
  "date night": [
    { name: "Sixteen 33",           neighbourhood: "Bandra",      cuisine: "Contemporary",        venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Torii",                neighbourhood: "BKC",         cuisine: "Japanese",            venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Gigi",                 neighbourhood: "Bandra",      cuisine: "Italian",             venueType: "restaurant", approved: true,  img: img(2) },
    { name: "CinCin",               neighbourhood: "BKC",         cuisine: "Italian",             venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Masque",               neighbourhood: "Mahalaxmi",   cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Ekaa",                 neighbourhood: "Fort",        cuisine: "Contemporary Indian", venueType: "restaurant", approved: true,  img: img(1) },
    { name: "The Table",            neighbourhood: "Colaba",      cuisine: "Contemporary",        venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Lyla",                 neighbourhood: "BKC",         cuisine: "Spanish",             venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Nusara",               neighbourhood: "Lower Parel", cuisine: "Thai",                venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Olive Bar & Kitchen",  neighbourhood: "Bandra",      cuisine: "Mediterranean",       venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Tresind",              neighbourhood: "BKC",         cuisine: "Progressive Indian",  venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Izumi",                neighbourhood: "Bandra",      cuisine: "Japanese",            venueType: "restaurant", approved: true,  img: img(3) },
  ],
  "Bandra": [
    { name: "Hakkasan",             neighbourhood: "Bandra", cuisine: "Chinese",     venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Bastian",              neighbourhood: "Bandra", cuisine: "Seafood",     venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Gigi",                 neighbourhood: "Bandra", cuisine: "Italian",     venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Sixteen 33",           neighbourhood: "Bandra", cuisine: "Contemporary",venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Woodside Inn",         neighbourhood: "Bandra", cuisine: "Bar",         venueType: "bar",        approved: false, img: img(0) },
    { name: "Foo",                  neighbourhood: "Bandra", cuisine: "Pan-Asian",   venueType: "restaurant", approved: true,  img: img(1) },
    { name: "La Loca Maria",        neighbourhood: "Bandra", cuisine: "Mexican",     venueType: "restaurant", approved: false, img: img(2) },
    { name: "Izumi",                neighbourhood: "Bandra", cuisine: "Japanese",    venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Mizu",                 neighbourhood: "Bandra", cuisine: "Japanese",    venueType: "restaurant", approved: false, img: img(0) },
    { name: "Pomodoro",             neighbourhood: "Bandra", cuisine: "Italian",     venueType: "restaurant", approved: false, img: img(1) },
    { name: "Tokyo Matcha Bar",     neighbourhood: "Bandra", cuisine: "Café",        venueType: "café",       approved: false, img: img(2) },
    { name: "Kepchaki Momos",       neighbourhood: "Bandra", cuisine: "Tibetan",     venueType: "restaurant", approved: false, img: img(3) },
    { name: "Bustle",               neighbourhood: "Bandra", cuisine: "All-day",     venueType: "café",       approved: false, img: img(0) },
    { name: "Torii",                neighbourhood: "Bandra", cuisine: "Japanese",    venueType: "restaurant", approved: true,  img: img(1) },
  ],
  "japanese": [
    { name: "Torii",                neighbourhood: "BKC",     cuisine: "Japanese", venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Izumi",                neighbourhood: "Bandra",  cuisine: "Japanese", venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Mizu",                 neighbourhood: "Bandra",  cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(2) },
    { name: "Wasabi by Morimoto",   neighbourhood: "Colaba",  cuisine: "Japanese", venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Origami",              neighbourhood: "Multiple",cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(0) },
    { name: "Takumi",               neighbourhood: "Multiple",cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(1) },
    { name: "Kuuraku",              neighbourhood: "Bandra",  cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(2) },
    { name: "Amaru",                neighbourhood: "Bandra",  cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(3) },
    { name: "Crisol",               neighbourhood: "Juhu",    cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(0) },
    { name: "Baoji Asian Home",     neighbourhood: "Andheri", cuisine: "Japanese", venueType: "restaurant", approved: false, img: img(1) },
  ],
  "hidden gem": [
    { name: "Madeira & Mime",       neighbourhood: "Vikhroli",   cuisine: "European",            venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Across",               neighbourhood: "Kala Ghoda", cuisine: "Himalayan",           venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Toa.66",               neighbourhood: "Churchgate", cuisine: "Thai",                venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Nandan Coffee",        neighbourhood: "Fort",       cuisine: "Café",                venueType: "café",       approved: false, img: img(3) },
    { name: "Papa's",               neighbourhood: "Bandra",     cuisine: "Indian",              venueType: "restaurant", approved: false, img: img(0) },
    { name: "Do's Fast Food",       neighbourhood: "Dadar",      cuisine: "Street Food",         venueType: "restaurant", approved: false, img: img(1) },
    { name: "Shelter by Javaphile", neighbourhood: "Versova",    cuisine: "Café",                venueType: "café",       approved: false, img: img(2) },
    { name: "Breve",                neighbourhood: "Multiple",   cuisine: "Café",                venueType: "café",       approved: false, img: img(3) },
    { name: "By The Mekong",        neighbourhood: "Multiple",   cuisine: "Pan-Asian",           venueType: "restaurant", approved: false, img: img(0) },
    { name: "Ekaa",                 neighbourhood: "Fort",       cuisine: "Contemporary Indian", venueType: "restaurant", approved: true,  img: img(1) },
  ],
  "late night": [
    { name: "Trattoria",            neighbourhood: "Colaba",  cuisine: "Italian",     venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Bademiyaan",           neighbourhood: "Colaba",  cuisine: "Street Food", venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Good Flippin Burgers", neighbourhood: "Juhu",    cuisine: "Burgers",     venueType: "restaurant", approved: false, img: img(2) },
    { name: "Miya Kebabs",          neighbourhood: "Bandra",  cuisine: "Street Food", venueType: "restaurant", approved: false, img: img(3) },
    { name: "Sigdi",                neighbourhood: "Bandra",  cuisine: "Street Food", venueType: "restaurant", approved: false, img: img(0) },
    { name: "14th Street Dessert",  neighbourhood: "Fort",    cuisine: "Desserts",    venueType: "dessert bar",approved: false, img: img(1) },
    { name: "Tawaa Mystery",        neighbourhood: "Bandra",  cuisine: "Street Food", venueType: "restaurant", approved: false, img: img(2) },
    { name: "Lord of the Drinks",   neighbourhood: "Multiple",cuisine: "Bar",         venueType: "bar",        approved: false, img: img(3) },
    { name: "Woodside Inn",         neighbourhood: "Bandra",  cuisine: "Bar",         venueType: "bar",        approved: false, img: img(0) },
    { name: "Hyde",                 neighbourhood: "South Bombay", cuisine: "Bar",    venueType: "bar",        approved: false, img: img(1) },
  ],
  "old bombay": [
    { name: "Leopold",              neighbourhood: "Colaba",        cuisine: "All-day",     venueType: "restaurant", approved: false, img: img(0) },
    { name: "Prithvi Cafe",         neighbourhood: "Juhu",          cuisine: "Café",        venueType: "café",       approved: true,  img: img(1) },
    { name: "Khyber",               neighbourhood: "Fort",          cuisine: "North Indian",venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Gallops",              neighbourhood: "Fort",          cuisine: "North Indian",venueType: "restaurant", approved: false, img: img(3) },
    { name: "Candies",              neighbourhood: "Bandra",        cuisine: "Café",        venueType: "café",       approved: false, img: img(0) },
    { name: "Gaylord",              neighbourhood: "South Bombay",  cuisine: "Continental", venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Nandan Coffee",        neighbourhood: "Fort",          cuisine: "Café",        venueType: "café",       approved: false, img: img(2) },
    { name: "Karachi Sweets",       neighbourhood: "Bandra",        cuisine: "Street Food", venueType: "restaurant", approved: false, img: img(3) },
    { name: "Britannia & Co",       neighbourhood: "Ballard Estate",cuisine: "Parsi",       venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Trattoria",            neighbourhood: "Colaba",        cuisine: "Italian",     venueType: "restaurant", approved: true,  img: img(1) },
  ],
  "tasting menu": [
    { name: "Masque",               neighbourhood: "Mahalaxmi",       cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Indian Accent",        neighbourhood: "Jio World Centre",cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Toa.66",               neighbourhood: "Churchgate",      cuisine: "Thai",                venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Avartana",             neighbourhood: "ITC",             cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Ekaa",                 neighbourhood: "Fort",            cuisine: "Contemporary Indian", venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Tresind",              neighbourhood: "BKC",             cuisine: "Progressive Indian",  venueType: "restaurant", approved: true,  img: img(1) },
  ],
  "worth the travel": [
    { name: "Masque",               neighbourhood: "Mahalaxmi",       cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Ekaa",                 neighbourhood: "Fort",            cuisine: "Contemporary Indian", venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Nusara",               neighbourhood: "Lower Parel",     cuisine: "Thai",                venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Tresind",              neighbourhood: "BKC",             cuisine: "Progressive Indian",  venueType: "restaurant", approved: true,  img: img(3) },
    { name: "Across",               neighbourhood: "Kala Ghoda",      cuisine: "Himalayan",           venueType: "restaurant", approved: true,  img: img(0) },
    { name: "Burma Burma",          neighbourhood: "Fort",            cuisine: "Burmese",             venueType: "restaurant", approved: true,  img: img(1) },
    { name: "Madeira & Mime",       neighbourhood: "Vikhroli",        cuisine: "European",            venueType: "restaurant", approved: true,  img: img(2) },
    { name: "Indian Accent",        neighbourhood: "Jio World Centre",cuisine: "Modern Indian",       venueType: "restaurant", approved: true,  img: img(3) },
  ],
};

const PLACEHOLDER: VenueResult[] = [
  { name: "Venue One",   neighbourhood: "Bandra",  cuisine: "Contemporary", venueType: "restaurant", approved: true,  img: img(0) },
  { name: "Venue Two",   neighbourhood: "Colaba",  cuisine: "Italian",      venueType: "restaurant", approved: false, img: img(1) },
  { name: "Venue Three", neighbourhood: "Fort",    cuisine: "Seafood",      venueType: "restaurant", approved: true,  img: img(2) },
  { name: "Venue Four",  neighbourhood: "BKC",     cuisine: "Japanese",     venueType: "restaurant", approved: false, img: img(3) },
  { name: "Venue Five",  neighbourhood: "Juhu",    cuisine: "Mediterranean",venueType: "restaurant", approved: true,  img: img(0) },
  { name: "Venue Six",   neighbourhood: "Worli",   cuisine: "Modern Indian",venueType: "restaurant", approved: true,  img: img(1) },
];

/* ── MICRO-COMPONENTS ────────────────────────────────────────── */
function Av({ initials, size = 24 }: { initials: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "#F5F3F0", border: "1.5px solid #FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, color: "#8A8680", flexShrink: 0, userSelect: "none",
    }}>{initials}</div>
  );
}

function Diamond() {
  return <span style={{ position: "absolute", top: 8, right: 8, fontSize: 11, color: "#D4962A" }}>◆</span>;
}

/* ── BROWSE TAB ──────────────────────────────────────────────── */
export default function BrowseTab() {
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [detailKey, setDetailKey] = useState<string>("date night");
  const detailRef = useRef<HTMLDivElement>(null);

  function scrollToDetail() {
    if (!detailRef.current) return;
    const y = detailRef.current.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function isActive(filterType: FilterType, value: string) {
    return filters.some((f) => f.filterType === filterType && f.value === value);
  }

  function handleClick(filterType: FilterType, value: string) {
    const active = isActive(filterType, value);
    if (filterType === "vibe") {
      if (active) {
        setFilters((prev) => prev.filter((f) => !(f.filterType === "vibe" && f.value === value)));
      } else {
        setFilters((prev) => [...prev, { filterType, value }]);
        setDetailKey(value);
        scrollToDetail();
      }
    } else {
      if (active) {
        setFilters((prev) => prev.filter((f) => !(f.filterType === filterType && f.value === value)));
        setDetailKey("date night");
      } else {
        setFilters((prev) => [...prev.filter((f) => f.filterType !== filterType), { filterType, value }]);
        setDetailKey(value);
        scrollToDetail();
      }
    }
  }

  function clearAll() {
    setFilters([]);
    setDetailKey("date night");
  }

  const results = RESULTS[detailKey] ?? PLACEHOLDER;
  const occasionDescriptor = OCCASIONS.find((o) => o.name === detailKey)?.descriptor ?? "";

  /* ── render ── */
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>

      {/* Search bar */}
      <div style={{ marginTop: 40, marginBottom: 48 }}>
        <input
          type="text"
          placeholder="search venues, areas, cuisines..."
          style={{
            width: "100%", height: 44,
            border: "1px solid #E8E4DE", borderRadius: 2,
            background: "#FFFFFF", padding: "0 16px",
            fontSize: 13, fontWeight: 400, color: "#111009",
            fontFamily: "inherit", outline: "none",
            transition: "border-color 150ms ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#111009")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E4DE")}
        />
      </div>

      {/* ── Block 1: Place Type ── */}
      <CategoryBlock label="Place Type" description="what kind of place are you looking for">
        <div className="scroll-row" style={{ gap: 10, paddingBottom: 4 }}>
          {PLACE_TYPES.map((t) => {
            const active = isActive("type", t.name);
            return (
              <button
                key={t.name}
                onClick={() => handleClick("type", t.name)}
                className={`hoverable${active ? " browse-card-active" : ""}`}
                style={{
                  width: 160, height: 100, flexShrink: 0,
                  background: active ? "#111009" : "#F5F3F0",
                  border: `1px solid ${active ? "#111009" : "#E8E4DE"}`,
                  borderRadius: 4,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 500, color: active ? "#FFFFFF" : "#111009" }}>{t.name}</p>
                <p style={{ fontSize: 11, color: active ? "#FFFFFF" : "#8A8680", marginTop: 4 }}>{t.count}</p>
              </button>
            );
          })}
          <div style={{ width: 1, flexShrink: 0 }} />
        </div>
      </CategoryBlock>

      {/* ── Block 2: Areas ── */}
      <CategoryBlock label="Areas" description="explore mumbai one neighbourhood at a time">
        <div className="scroll-row" style={{ gap: 10, paddingBottom: 4 }}>
          {AREAS.map((a) => {
            const active = isActive("area", a.name);
            return (
              <button
                key={a.name}
                onClick={() => handleClick("area", a.name)}
                className="hoverable"
                style={{
                  width: 180, height: 80, flexShrink: 0,
                  background: active ? "#111009" : "#F5F3F0",
                  border: `1px solid ${active ? "#111009" : "#E8E4DE"}`,
                  borderRadius: 4,
                  display: "flex", flexDirection: "column",
                  alignItems: "flex-start", justifyContent: "center",
                  padding: "0 16px", cursor: "pointer", fontFamily: "inherit",
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 500, color: active ? "#FFFFFF" : "#111009" }}>{a.name}</p>
                <p style={{ fontSize: 11, color: active ? "#FFFFFF" : "#8A8680", marginTop: 4 }}>{a.count}</p>
              </button>
            );
          })}
          <div style={{ width: 1, flexShrink: 0 }} />
        </div>
      </CategoryBlock>

      {/* ── Block 3: Cuisine ── */}
      <CategoryBlock label="Cuisine" description="filter by what you actually want to eat">
        <div className="scroll-row" style={{ gap: 8, paddingBottom: 4 }}>
          {CUISINES.map((c) => {
            const active = isActive("cuisine", c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleClick("cuisine", c.name)}
                className={`cuisine-chip${active ? " c-active" : ""}`}
              >
                <span style={{ fontSize: 13, fontWeight: 400, color: active ? "#FFFFFF" : "#111009", display: "block" }}>
                  {c.name}
                </span>
                <span style={{ fontSize: 11, color: active ? "#FFFFFF" : "#8A8680", display: "block", marginTop: 3 }}>
                  {c.count}
                </span>
              </button>
            );
          })}
          <div style={{ width: 1, flexShrink: 0 }} />
        </div>
      </CategoryBlock>

      {/* ── Block 4: Occasion ── */}
      <CategoryBlock label="Occasion" description="find the right place for the moment you're planning">
        <div className="scroll-row" style={{ gap: 10, paddingBottom: 4 }}>
          {OCCASIONS.map((o) => {
            const active = isActive("occasion", o.name);
            return (
              <button
                key={o.name}
                onClick={() => handleClick("occasion", o.name)}
                className="hoverable"
                style={{
                  width: 200, height: 90, flexShrink: 0,
                  background: active ? "#111009" : "#F5F3F0",
                  border: `1px solid ${active ? "#111009" : "#E8E4DE"}`,
                  borderRadius: 4, padding: 20,
                  display: "flex", flexDirection: "column",
                  alignItems: "flex-start", justifyContent: "center",
                  cursor: "pointer", fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 500, color: active ? "#FFFFFF" : "#111009" }}>{o.name}</p>
                <p style={{ fontSize: 11, color: active ? "#FFFFFF" : "#8A8680", marginTop: 4 }}>{o.descriptor}</p>
              </button>
            );
          })}
          <div style={{ width: 1, flexShrink: 0 }} />
        </div>
      </CategoryBlock>

      {/* ── Block 5: Vibe (wrapped, no scroll) ── */}
      <CategoryBlock label="Vibe" description="not why you're going — what it actually feels like when you're there">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {VIBES.map((v) => {
            const active = isActive("vibe", v);
            return (
              <button
                key={v}
                onClick={() => handleClick("vibe", v)}
                className={`vibe-chip-btn${active ? " v-active" : ""}`}
              >
                {v}
              </button>
            );
          })}
        </div>
      </CategoryBlock>

      {/* ── Detail Panel ── */}
      <div ref={detailRef} style={{ borderTop: "1px solid #E8E4DE", paddingTop: 40, marginTop: 40 }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: "#111009" }}>{detailKey}</p>
          <p style={{ fontSize: 13, color: "#8A8680" }}>{results.length} venues</p>
        </div>
        {occasionDescriptor && (
          <p style={{ fontSize: 13, color: "#8A8680", fontStyle: "italic", marginTop: 6 }}>
            {occasionDescriptor}
          </p>
        )}

        {/* Active filter chips */}
        {filters.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 20 }}>
            {filters.map((f) => (
              <span
                key={`${f.filterType}-${f.value}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#111009", color: "#FFFFFF",
                  border: "1px solid #111009", borderRadius: 2,
                  padding: "5px 10px", fontSize: 12,
                }}
              >
                {f.value}
                <button
                  onClick={() => handleClick(f.filterType, f.value)}
                  style={{
                    background: "none", border: "none", color: "#FFFFFF",
                    cursor: "pointer", padding: 0, lineHeight: 1,
                    fontSize: 13, fontFamily: "inherit",
                  }}
                >×</button>
              </span>
            ))}
            <button
              onClick={clearAll}
              style={{
                background: "none", border: "none", fontSize: 11,
                color: "#8A8680", cursor: "pointer", fontFamily: "inherit",
                textDecoration: "none", padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              clear all
            </button>
          </div>
        )}

        {/* Results grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, marginTop: 32,
        }}>
          {results.map((v, i) => (
            <div key={i} className="hoverable" style={{ borderRadius: 4, overflow: "hidden" }}>
              <div style={{ position: "relative", height: 180, background: v.img }}>
                {v.approved && <Diamond />}
                {/* Type badge */}
                <div style={{
                  position: "absolute", bottom: 8, left: 8,
                  background: "#F5F3F0", border: "1px solid #E8E4DE",
                  borderRadius: 2, padding: "3px 8px",
                }}>
                  <span style={{ fontSize: 10, color: "#8A8680" }}>{v.venueType}</span>
                </div>
              </div>
              <div style={{ paddingTop: 12, paddingBottom: 4 }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111009", marginBottom: 3 }}>{v.name}</p>
                <p style={{ fontSize: 12, color: "#8A8680" }}>{v.neighbourhood} · {v.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ── CATEGORY BLOCK WRAPPER ──────────────────────────────────── */
function CategoryBlock({
  label, description, children,
}: {
  label: string; description: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8680", fontWeight: 400 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: "#8A8680", margin: "6px 0 20px" }}>{description}</p>
      {children}
    </div>
  );
}
