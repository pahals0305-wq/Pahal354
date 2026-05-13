export default function Footer() {
  return (
    <footer className="border-t border-[#2a2520] mt-24 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <p className="text-[#c9a84c] font-serif text-lg mb-3">Bombay Platelist</p>
          <p className="text-[#8a7f72] text-sm leading-relaxed">
            Mumbai&apos;s most trusted restaurant guide. Curated by people who
            actually eat here — not by algorithms or paid placements.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-[#f5f0e8] text-xs uppercase tracking-widest mb-4">Discover</p>
            <ul className="flex flex-col gap-2">
              {["Lists", "Areas", "Map", "New Openings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#8a7f72] hover:text-[#f5f0e8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#f5f0e8] text-xs uppercase tracking-widest mb-4">Community</p>
            <ul className="flex flex-col gap-2">
              {["Join", "Profile", "Your Lists", "About"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#8a7f72] hover:text-[#f5f0e8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#2a2520] flex justify-between items-center">
        <p className="text-xs text-[#8a7f72]">
          © 2025 Bombay Platelist. Made with obsession in Mumbai.
        </p>
        <p className="text-xs text-[#8a7f72]">Not sponsored. Never will be.</p>
      </div>
    </footer>
  );
}
