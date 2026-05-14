"use client";
import { useState } from "react";

type Moment = "lunch" | "dinner" | "late night" | "sunday morning";

const MOMENTS: Moment[] = ["lunch", "dinner", "late night", "sunday morning"];

const CONTENT: Record<
  Moment,
  { mood: string; tags: string[]; filter: string }
> = {
  lunch: {
    mood: "The natural light hits the terrace just right. Order the small plates.",
    tags: ["outdoor seating", "solo friendly", "natural light"],
    filter: "brightness(1.05) saturate(0.95)",
  },
  dinner: {
    mood: "Low light, full tables, the kind of noise that means everyone's having a good time.",
    tags: ["date night", "full bar", "book ahead"],
    filter: "brightness(0.82) saturate(1.1) sepia(0.08)",
  },
  "late night": {
    mood: "Most places have called it. This one's just getting started.",
    tags: ["walk-ins welcome", "counter seating", "late kitchen"],
    filter: "brightness(0.6) saturate(0.8) sepia(0.15)",
  },
  "sunday morning": {
    mood: "Slow service is part of the deal. Nobody here is in a rush.",
    tags: ["brunch", "no reservations", "good coffee"],
    filter: "brightness(1.08) saturate(0.85) hue-rotate(5deg)",
  },
};

export default function ExploreByMoment() {
  const [active, setActive] = useState<Moment>("dinner");
  const [visible, setVisible] = useState(true);

  function handleSwitch(m: Moment) {
    if (m === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(m);
      setVisible(true);
    }, 180);
  }

  const c = CONTENT[active];

  return (
    <section style={{ padding: "40px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            display: "flex",
            borderRadius: 4,
            overflow: "hidden",
            minHeight: 520,
          }}
        >
          {/* Left — image stage (60%) */}
          <div style={{ width: "60%", position: "relative", flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#e4e0d8",
                transition: "filter 400ms ease",
                filter: c.filter,
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Right — context panel (40%) */}
          <div
            style={{
              width: "40%",
              background: "#ffffff",
              padding: 48,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Label */}
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8a8680",
                marginBottom: 16,
              }}
            >
              Explore by Moment
            </p>

            {/* 2×2 toggle grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {MOMENTS.map((m) => (
                <button
                  key={m}
                  onClick={() => handleSwitch(m)}
                  style={{
                    padding: "10px 0",
                    fontSize: 12,
                    fontFamily: "inherit",
                    fontWeight: 400,
                    textAlign: "center",
                    borderRadius: 2,
                    border: active === m ? "none" : "1px solid #e8e4de",
                    background: active === m ? "#111009" : "#f5f3f0",
                    color: active === m ? "#ffffff" : "#8a8680",
                    cursor: "pointer",
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Reactive content */}
            <div
              style={{
                marginTop: 48,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                opacity: visible ? 1 : 0,
                transition: "opacity 250ms ease",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#111009",
                  marginBottom: 6,
                }}
              >
                The Bombay Canteen
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#8a8680",
                  marginBottom: 20,
                }}
              >
                Lower Parel · Contemporary Indian
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#111009",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {c.mood}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: "1px solid #e8e4de",
                      borderRadius: 2,
                      padding: "5px 10px",
                      fontSize: 11,
                      color: "#8a8680",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom — approved badge */}
            <p
              style={{
                fontSize: 11,
                color: "#d4962a",
                fontWeight: 400,
                marginTop: 24,
              }}
            >
              ◆ platelist approved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
