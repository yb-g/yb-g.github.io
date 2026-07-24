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

    // ---------- Magnetic hover (nav links, buttons, anchors in header) ----------
    const magneticSelector = 'header a, a[href^="#"], a[href^="mailto"], button';
    const magneticEls = Array.from(document.querySelectorAll<HTMLElement>(magneticSelector))
      .filter((el) => !el.hasAttribute("data-no-magnetic"));
    const magneticHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    magneticEls.forEach((el) => {
      el.style.transition = "transform 400ms cubic-bezier(.2,.8,.2,1)";
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        const strength = 0.25;
        el.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`;
      };
      const leave = () => {
        el.style.transform = "translate3d(0,0,0)";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magneticHandlers.push({ el, move, leave });
    });

    // ---------- Image scale reveal (magazine-style) ----------
    const imageWrappers = Array.from(document.querySelectorAll<HTMLElement>("[data-image-reveal]"));
    imageWrappers.forEach((wrap) => {
      wrap.style.overflow = "hidden";
      const img = wrap.querySelector("img");
      if (img) {
        (img as HTMLElement).style.transform = "scale(1.2)";
        (img as HTMLElement).style.transition = "transform 1400ms cubic-bezier(.2,.8,.2,1)";
      }
      wrap.style.clipPath = "inset(100% 0 0 0)";
      wrap.style.transition = "clip-path 1200ms cubic-bezier(.7,0,.2,1)";
    });
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const wrap = entry.target as HTMLElement;
          wrap.style.clipPath = "inset(0% 0 0 0)";
          const img = wrap.querySelector("img") as HTMLElement | null;
          if (img) img.style.transform = "scale(1)";
          imageObserver.unobserve(wrap);
        });
      },
      { threshold: 0.15 },
    );
    imageWrappers.forEach((el) => imageObserver.observe(el));

    // ---------- Scroll progress bar ----------
    const progressBar = document.createElement("div");
    progressBar.setAttribute("aria-hidden", "true");
    progressBar.style.cssText =
      "position:fixed;top:0;left:0;height:2px;width:100%;transform-origin:left center;transform:scaleX(0);background:hsl(var(--primary, 260 80% 60%));z-index:60;pointer-events:none;transition:transform 120ms linear;";
    // Fallback to token if the CSS var is not HSL-format
    progressBar.style.background = "var(--primary)";
    document.body.appendChild(progressBar);
    const onProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      progressBar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onProgress, { passive: true });
    onProgress();

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
