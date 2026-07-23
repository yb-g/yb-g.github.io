import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.classList.add("cursor-none-global");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    let raf = 0;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOverInteractive = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        animate(ring, { scale: 1.8, opacity: 0.9, duration: 300, ease: "outExpo" });
        animate(dot, { scale: 0.4, duration: 300, ease: "outExpo" });
      } else {
        animate(ring, { scale: 1, opacity: 0.6, duration: 300, ease: "outExpo" });
        animate(dot, { scale: 1, duration: 300, ease: "outExpo" });
      }
    };

    const onDown = () => animate(ring, { scale: 0.7, duration: 200, ease: "outExpo" });
    const onUp = () => animate(ring, { scale: 1, duration: 300, ease: "outExpo" });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOverInteractive);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOverInteractive);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-none-global");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-primary/80 mix-blend-difference"
        style={{ opacity: 0.6 }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary mix-blend-difference"
      />
    </>
  );
}
