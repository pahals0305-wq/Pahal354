"use client";
import { useState } from "react";

type Tab = "been" | "want to go" | "favourites";
const TABS: Tab[] = ["been", "want to go", "favourites"];

export default function YourList() {
  const [active, setActive] = useState<Tab>("been");

  return (
    <section style={{ padding: "40px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <p className="section-label">Your List</p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: "6px 18px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 400,
                fontFamily: "inherit",
                border: "none",
                cursor: "pointer",
                transition: "background 150ms ease, color 150ms ease",
                background: active === tab ? "#111009" : "#f5f3f0",
                color: active === tab ? "#ffffff" : "#8a8680",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            color: "#8a8680",
            fontSize: 13,
            fontWeight: 400,
          }}
        >
          nothing here yet. start exploring.
        </div>
      </div>
    </section>
  );
}
