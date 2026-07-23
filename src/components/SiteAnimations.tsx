import { useEffect } from "react";
import { animate, stagger } from "animejs";

/**
 * Wires site-wide anime.js behavior:
 *  - smooth-scroll for in-page anchor links (nav + buttons)
 *  - scroll-triggered reveals for elements marked with [data-reveal]
 *  - stagger reveals for containers marked with [data-reveal-group]
 *  - hero intro animation
 *  - subtle parallax for elements marked with [data-parallax]
 */
export function SiteAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ---------- Smooth scroll for in-page anchors ----------
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 20;
      // anime.js smooth scroll
      const startY = window.scrollY;
      animate(
        { y: startY },
        {
          y,
          duration: 900,
          ease: "inOutQuart",
          onUpdate: (a: any) => {
            const v = a.targets[0].y;
            window.scrollTo(0, v);
          },
        } as any,
      );
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    // ---------- Hero intro ----------
    const heroEls = document.querySelectorAll<HTMLElement>("[data-hero-in]");
    if (heroEls.length) {
      heroEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
      });
      animate(heroEls, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1100,
        delay: stagger(120, { start: 200 }),
        ease: "outExpo",
      });
    }

    // ---------- Scroll reveals ----------
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.willChange = "transform, opacity";
    });

    const revealOne = (el: HTMLElement, delay = 0) => {
      if (el.dataset.revealed === "1") return;
      el.dataset.revealed = "1";
      animate(el, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 900,
        delay,
        ease: "outExpo",
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealOne(entry.target as HTMLElement);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // ---------- Grouped stagger reveals ----------
    const groupEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-group]"));
    const groupChildren: HTMLElement[] = [];
    groupEls.forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[];
      children.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(30px)";
        c.style.willChange = "transform, opacity";
        groupChildren.push(c);
      });
    });
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const group = entry.target as HTMLElement;
          const children = Array.from(group.children) as HTMLElement[];
          animate(children, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: stagger(80),
            ease: "outExpo",
          });
          groupObserver.unobserve(group);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    groupEls.forEach((el) => groupObserver.observe(el));

    // ---------- Failsafe: reveal anything still hidden after 3s ----------
    const failsafe = window.setTimeout(() => {
      [...revealEls, ...groupChildren].forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          el.style.transition = "opacity 500ms ease, transform 500ms ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    }, 3000);

    // ---------- Parallax ----------
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      groupObserver.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
