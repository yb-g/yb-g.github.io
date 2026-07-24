import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

/**
 * Full-screen intro loader.
 * - Solid violet curtain with centered kanji mark + counter 000 → 100
 * - On finish, curtain slides up and unmounts
 * - Fires window event "vgnv:loaded" so SiteAnimations can kick off hero reveals
 */
export function PageLoader() {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock scroll while loading
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mark: fade + rise in
    if (markRef.current) {
      animate(markRef.current, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        ease: "outExpo",
      });
    }
    if (labelRef.current) {
      animate(labelRef.current, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 700,
        delay: 150,
        ease: "outExpo",
      });
    }

    // Counter 000 → 100
    const counterObj = { v: 0 };
    animate(counterObj, {
      v: 100,
      duration: 1900,
      ease: "inOutQuad",
      onUpdate: () => {
        if (counterRef.current) {
          const n = Math.floor(counterObj.v);
          counterRef.current.textContent = String(n).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${counterObj.v / 100})`;
        }
      },
      onComplete: () => {
        // Small hold, then curtain up
        window.setTimeout(() => {
          if (!rootRef.current) return;
          animate(rootRef.current, {
            translateY: ["0%", "-100%"],
            duration: 1100,
            ease: "inOutQuart",
            onComplete: () => {
              document.body.style.overflow = prevOverflow;
              setMounted(false);
              window.dispatchEvent(new CustomEvent("vgnv:loaded"));
            },
          });
        }, 250);
      },
    });

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary text-primary-foreground"
      style={{ willChange: "transform" }}
    >
      {/* Top-left meta */}
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 md:left-12 md:top-8">
        V.GNV · Vol. MMXXVI
      </div>
      {/* Top-right meta */}
      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 md:right-12 md:top-8">
        Loading portfolio
      </div>

      {/* Centered kanji mark */}
      <div
        ref={markRef}
        className="flex flex-col items-center gap-6 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="font-jp text-[22vw] leading-none text-primary-foreground md:text-[14vw]">
          岩
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary-foreground/70">
          Vaibhav Gannavarapu
        </div>
      </div>

      {/* Bottom counter + progress */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute bottom-6 left-1/2 flex w-[min(560px,calc(100%-3rem))] -translate-x-1/2 flex-col items-center gap-3 opacity-0 md:bottom-10"
      >
        <div className="flex w-full items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.4em] text-primary-foreground/80">
          <span>Load · Portfolio</span>
          <span>
            <span ref={counterRef}>000</span>
            <span className="text-primary-foreground/50"> / 100</span>
          </span>
        </div>
        <div className="h-px w-full bg-primary-foreground/20">
          <span
            ref={barRef}
            className="block h-full origin-left bg-primary-foreground"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
