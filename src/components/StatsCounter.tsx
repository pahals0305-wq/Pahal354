"use client";
import { useEffect, useRef, useState } from "react";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCount(
  target: number,
  duration: number,
  onUpdate: (n: number) => void,
  onDone: () => void
) {
  const start = performance.now();
  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(Math.round(easeOut(progress) * target));
    if (progress < 1) requestAnimationFrame(tick);
    else onDone();
  }
  requestAnimationFrame(tick);
}

const STATS = [
  { target: 200, suffix: "+", label: "APPROVED VENUES" },
  { target: 14, suffix: "", label: "AREAS COVERED" },
  { target: 38, suffix: "", label: "CURATED LISTS" },
];

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [done, setDone] = useState([false, false, false]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          STATS.forEach(({ target }, i) => {
            animateCount(
              target,
              1200,
              (n) => setCounts((prev) => { const next = [...prev]; next[i] = n; return next; }),
              () => setDone((prev) => { const next = [...prev]; next[i] = true; return next; })
            );
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid #E8E4DE",
        borderBottom: "1px solid #E8E4DE",
        padding: "48px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: i < STATS.length - 1 ? "1px solid #E8E4DE" : "none",
            }}
          >
            <p style={{ fontSize: 32, fontWeight: 500, color: "#111009" }}>
              {counts[i]}{done[i] ? s.suffix : ""}
            </p>
            <p
              style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8A8680",
                marginTop: 6,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
