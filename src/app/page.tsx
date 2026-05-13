import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { restaurants, curatedLists } from "@/data/restaurants";
import { MapPin, Star, ArrowRight, Bookmark, Users, Sparkles } from "lucide-react";

export default function Home() {
  const featuredRestaurants = restaurants.filter((r) => r.pahalsPick).slice(0, 6);
  const stats = {
    restaurants: restaurants.length,
    lists: curatedLists.length,
    areas: 12,
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* ── HERO ── */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 40%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto w-full">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-6">
              Mumbai&apos;s Restaurant Guide
            </p>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f0e8] leading-[1.1] max-w-4xl mb-8">
              Find where
              <br />
              <em className="text-[#c9a84c]">Mumbai</em>
              <br />
              actually eats.
            </h1>

            <p className="text-[#8a7f72] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Not algorithm-ranked. Not paid placement. Curated lists of
              Mumbai&apos;s best restaurants — by people who live here and eat
              obsessively.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/lists"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-[#0c0a08] text-sm font-semibold tracking-widest uppercase hover:bg-[#e8c97a] transition-colors"
              >
                Browse Lists
                <ArrowRight size={16} />
              </a>
              <a
                href="/map"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a2520] text-[#8a7f72] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                <MapPin size={16} />
                Near Me
              </a>
            </div>

            <div className="mt-20 flex gap-12 border-t border-[#2a2520] pt-8">
              <div>
                <p className="text-3xl font-serif text-[#f5f0e8]">{stats.restaurants}+</p>
                <p className="text-xs text-[#8a7f72] uppercase tracking-widest mt-1">Restaurants</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#f5f0e8]">{stats.lists}</p>
                <p className="text-xs text-[#8a7f72] uppercase tracking-widest mt-1">Curated Lists</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#f5f0e8]">{stats.areas}</p>
                <p className="text-xs text-[#8a7f72] uppercase tracking-widest mt-1">Areas</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CURATED LISTS ── */}
        <section className="px-6 py-20 border-t border-[#2a2520]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-3">
                  Curated Collections
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8]">
                  Lists worth reading
                </h2>
              </div>
              <a
                href="/lists"
                className="hidden md:flex items-center gap-2 text-sm text-[#8a7f72] hover:text-[#c9a84c] transition-colors"
              >
                All Lists <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {curatedLists.map((list) => (
                <a
                  key={list.id}
                  href={`/lists/${list.id}`}
                  className="group relative p-6 border border-[#2a2520] bg-[#161410] hover:border-[#c9a84c]/40 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                    style={{ background: list.color }}
                  />
                  <span
                    className="inline-block text-xs tracking-widest uppercase px-2 py-0.5 mb-4"
                    style={{
                      color: list.color,
                      border: `1px solid ${list.color}40`,
                    }}
                  >
                    {list.tag}
                  </span>
                  <h3 className="font-serif text-xl text-[#f5f0e8] mb-2 group-hover:text-[#c9a84c] transition-colors">
                    {list.title}
                  </h3>
                  <p className="text-sm text-[#8a7f72] leading-relaxed mb-6">
                    {list.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8a7f72]">{list.count} restaurants</span>
                    <ArrowRight
                      size={14}
                      className="text-[#8a7f72] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAHAL'S PICKS ── */}
        <section className="px-6 py-20 border-t border-[#2a2520]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-3">
                  Founding Curator
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8]">
                  Pahal&apos;s Picks
                </h2>
                <p className="text-[#8a7f72] mt-3 max-w-md">
                  Restaurants personally vetted and loved. The seal means something.
                </p>
              </div>
              <a
                href="/restaurants"
                className="hidden md:flex items-center gap-2 text-sm text-[#8a7f72] hover:text-[#c9a84c] transition-colors"
              >
                All Restaurants <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((r) => (
                <a
                  key={r.id}
                  href={`/restaurant/${r.id}`}
                  className="group border border-[#2a2520] bg-[#161410] hover:border-[#c9a84c]/30 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="h-44 w-full relative"
                    style={{ backgroundColor: r.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161410] to-transparent opacity-60" />
                    {r.beenThere && (
                      <div className="absolute top-3 left-3 bg-[#c9a84c] text-[#0c0a08] text-xs px-2 py-0.5 font-semibold tracking-wide">
                        Been Here
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#0c0a08]/70 px-2 py-1">
                      <Star size={11} fill="#c9a84c" stroke="none" />
                      <span className="text-[#c9a84c] text-xs font-semibold">{r.rating}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-serif text-lg text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors">
                        {r.name}
                      </h3>
                      <span className="text-[#8a7f72] text-sm ml-2 shrink-0">{r.priceRange}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <MapPin size={11} className="text-[#8a7f72]" />
                      <span className="text-xs text-[#8a7f72]">{r.area}</span>
                      <span className="text-[#2a2520] mx-1">·</span>
                      <span className="text-xs text-[#8a7f72]">{r.cuisine[0]}</span>
                    </div>

                    <p className="text-sm text-[#8a7f72] leading-relaxed line-clamp-2">
                      {r.description}
                    </p>

                    {r.mustTry.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {r.mustTry.slice(0, 2).map((dish) => (
                          <span
                            key={dish}
                            className="text-xs px-2 py-0.5 border border-[#2a2520] text-[#8a7f72]"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="px-6 py-20 border-t border-[#2a2520] bg-[#0e0c0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-3">
                The Difference
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8]">
                Not Zomato. Not Swiggy.
              </h2>
              <p className="text-[#8a7f72] mt-4 max-w-lg mx-auto">
                No paid rankings. No sponsored placements. No algorithm deciding what you should eat.
                Just real opinions from real Mumbaikars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Star size={24} className="text-[#c9a84c]" />,
                  title: "Curated, Not Ranked",
                  desc: "Every restaurant on here has been personally vetted. If it's on Bombay Platelist, it deserves to be.",
                },
                {
                  icon: <Users size={24} className="text-[#c9a84c]" />,
                  title: "Community Driven",
                  desc: "Track where you've been, build your own lists, follow friends with good taste.",
                },
                {
                  icon: <Sparkles size={24} className="text-[#c9a84c]" />,
                  title: "AI Concierge",
                  desc: 'Ask "best biryani near Bandra under ₹500" and get a real answer — not a sponsored result.',
                },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-[#2a2520] bg-[#161410]">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-serif text-xl text-[#f5f0e8] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#8a7f72] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BROWSE BY AREA ── */}
        <section className="px-6 py-20 border-t border-[#2a2520]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-3">Explore</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e8]">Browse by Area</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Bandra West", count: 38 },
                { name: "Colaba", count: 24 },
                { name: "Lower Parel", count: 31 },
                { name: "Fort", count: 18 },
                { name: "Juhu", count: 22 },
                { name: "Pali Hill", count: 14 },
                { name: "BKC", count: 19 },
                { name: "Worli", count: 16 },
              ].map((area) => (
                <a
                  key={area.name}
                  href={`/areas/${area.name.toLowerCase().replace(" ", "-")}`}
                  className="group p-5 border border-[#2a2520] bg-[#161410] hover:border-[#c9a84c]/40 transition-all"
                >
                  <p className="font-serif text-lg text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors">
                    {area.name}
                  </p>
                  <p className="text-xs text-[#8a7f72] mt-1">{area.count} restaurants</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN CTA ── */}
        <section className="px-6 py-24 border-t border-[#2a2520]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">
              Join the Community
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-[#f5f0e8] mb-6">
              Track your Mumbai
              <br />
              food journey.
            </h2>
            <p className="text-[#8a7f72] text-lg mb-10 max-w-lg mx-auto">
              Mark restaurants you&apos;ve been to, save your wishlist, build
              lists and share them with friends who trust your taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a84c] text-[#0c0a08] text-sm font-semibold tracking-widest uppercase hover:bg-[#e8c97a] transition-colors"
              >
                <Bookmark size={16} />
                Create Free Account
              </a>
              <a
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-[#2a2520] text-[#8a7f72] text-sm tracking-widest uppercase hover:border-[#c9a84c]/40 hover:text-[#f5f0e8] transition-colors"
              >
                Just Browse
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
