import { createFileRoute } from "@tanstack/react-router";
import { SakuraField } from "@/components/SakuraField";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteAnimations } from "@/components/SiteAnimations";
import heroPortrait from "@/assets/hero-portrait.jpg";
import tokyoNight from "@/assets/tokyo-night.jpg";
import codingHands from "@/assets/coding-hands.jpg";
import sakuraBranch from "@/assets/sakura-branch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaibhav Gannavarapu — Software Engineer & CS Student" },
      {
        name: "description",
        content:
          "Computer science student, software engineer, and open-source builder. Portfolio of projects, skills, and the road to Japan.",
      },
      { property: "og:title", content: "Vaibhav Gannavarapu — Software Engineer" },
      {
        property: "og:description",
        content: "Cinematic portfolio of a CS student and engineer aiming for an international career in Japan.",
      },
    ],
  }),
  component: Index,
});

const skillsExperienced = ["HTML", "CSS", "Python", "Git", "GitHub", "Bash"];
const skillsLearning = ["TypeScript", "Lua"];
const domains = [
  "Software Development",
  "Linux & Open Source",
  "Networking",
  "Self-hosting",
  "System Optimization",
  "Hardware",
];

const projects = [
  {
    n: "01",
    name: "Zoomageddon",
    tag: "Award-winning · Real-time",
    desc: "Award-winning collaborative web application built around real-time interaction. Multiplayer, chaotic, unexpectedly deep.",
    stack: ["Web", "Realtime", "Collab"],
    url: "https://github.com/codered-scrapyard25/zoomageddon",
    cover: tokyoNight,
  },
  {
    n: "02",
    name: "FocusFi",
    tag: "Productivity · Minimal",
    desc: "A minimalist productivity web app for organizing work and holding attention. Fewer surfaces, sharper focus.",
    stack: ["Web", "UI", "Focus"],
    url: "https://github.com/yb-g-personal/focusfi",
    cover: codingHands,
  },
  {
    n: "03",
    name: "CrowdPlay",
    tag: "Full-stack · Interactive",
    desc: "Web-based project demonstrating full-stack development and interactive UX patterns end-to-end.",
    stack: ["Full-stack", "Web"],
    url: "https://github.com/crowdplay-app",
    cover: sakuraBranch,
  },
];

const interests = [
  { k: "Music", v: "CD & FLAC ripping. Lossless only." },
  { k: "Gaming", v: "Competitive FPS, sandbox worlds." },
  { k: "Photography", v: "Frames, grain, quiet light." },
  { k: "Fitness", v: "Strength training. Consistency." },
  { k: "Cars", v: "Formula 1 · JDM." },
  { k: "Hardware", v: "Systems, tuning, self-hosting." },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <CustomCursor />
      <SiteAnimations />
      <SakuraField />


      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12">
          <a href="#top" className="font-mono text-xs tracking-[0.3em] uppercase text-white">
            VG · <span className="font-jp">岩</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {["Work", "About", "Skills", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 transition hover:text-white"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.25em] text-white md:hidden"
          >
            Contact ↗
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] w-full bg-noise">
        <div className="absolute inset-0">
          <img
            src={heroPortrait}
            alt="Vaibhav Gannavarapu"
            width={1600}
            height={1920}
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
        </div>

        {/* Decorative kanji */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/4 select-none font-jp text-[22vw] leading-none text-white/[0.04] md:right-16"
        >
          岩
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-16 pt-32 md:px-12 md:pt-40">
          <div className="reveal">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">
              <span className="h-px w-8 bg-white/40" />
              <span>Portfolio · MMXXVI</span>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: "0.15s" }}>
            <h1 className="text-hero text-white">
              Vaibhav
              <br />
              <span className="italic text-white/90">Gannavarapu</span>
              <span className="text-primary">.</span>
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-white/70">
                Computer science student. Software engineer in the making. Building
                practical things at the intersection of code, systems, and taste —
                aiming west from the terminal toward{" "}
                <span className="font-jp text-white">日本</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground transition hover:violet-glow"
                >
                  View Work
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="mailto:gnv.vaibhav@gmail.com"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white/5"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 md:block">
          Scroll ↓
        </div>
        <div className="absolute bottom-6 right-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 md:block">
          Hyderabad → Tokyo
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border/50 bg-background py-8 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 pr-16">
              {[
                "Software Development",
                "桜",
                "Open Source",
                "・",
                "Linux",
                "桜",
                "Systems",
                "・",
                "Networking",
                "桜",
                "Hardware",
                "・",
                "Building for Japan",
                "桜",
              ].map((w, j) => (
                <span
                  key={j}
                  className={
                    /[\u3040-\u30ff\u4e00-\u9fff・]/.test(w)
                      ? "font-jp text-4xl text-primary"
                      : "font-display text-4xl italic text-foreground/90"
                  }
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-4 top-10 select-none font-jp text-[16vw] leading-none text-primary/10 md:-left-8"
        >
          自
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                (01) About
              </div>
              <div className="mt-6 font-jp text-2xl text-primary">私について</div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="text-display text-foreground">
              Analytical.
              <br />
              <span className="italic text-muted-foreground">Detail-oriented.</span>
              <br />
              Always <span className="text-primary italic">building</span>.
            </p>

            <div className="mt-16 grid gap-12 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-foreground/80">
                I study computer science with a bias toward things that actually run.
                Software development, open source, self-hosted systems — I like the
                stack all the way down. Practical, efficient solutions over clever ones.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                The long arc: a role at a multinational technology company and an
                international career, most likely rooted in Japan. Until then, I ship,
                learn, and rip FLACs from CDs in the background.
              </p>
            </div>

            <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
              {[
                { k: "Based", v: "India" },
                { k: "Focus", v: "Software" },
                { k: "Target", v: "Japan 🇯🇵" },
                { k: "Status", v: "Available" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="mt-2 font-display text-2xl text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex items-end justify-between border-b border-border pb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                (02) Selected Work
              </div>
              <h2 className="mt-6 text-display text-foreground">
                Things I've <span className="italic text-primary">shipped</span>.
              </h2>
            </div>
            <div className="hidden font-jp text-sm text-muted-foreground md:block">作品</div>
          </div>

          <div className="mt-16 space-y-24">
            {projects.map((p, i) => (
              <a
                key={p.n}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`relative overflow-hidden lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-card">
                    <img
                      src={p.cover}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute left-4 top-4 font-mono text-xs uppercase tracking-[0.25em] text-white/80">
                    {p.n} / {String(projects.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    {p.tag}
                  </div>
                  <h3 className="mt-4 font-display text-6xl leading-none text-foreground md:text-7xl">
                    {p.name}
                    <span className="text-primary">.</span>
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                    <span className="transition group-hover:text-primary">View repository</span>
                    <span className="transition group-hover:translate-x-1 group-hover:text-primary">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative border-t border-border py-32 md:py-48">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-10 select-none font-jp text-[18vw] leading-none text-primary/10"
        >
          技
        </div>

        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            (03) Toolkit
          </div>
          <h2 className="mt-6 text-display text-foreground">
            Tools of the <span className="italic text-primary">trade</span>.
          </h2>

          <div className="mt-20 grid gap-12 lg:grid-cols-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Experienced
              </div>
              <ul className="mt-6 space-y-3">
                {skillsExperienced.map((s) => (
                  <li
                    key={s}
                    className="group flex items-baseline justify-between border-b border-border py-3"
                  >
                    <span className="font-display text-3xl text-foreground transition group-hover:translate-x-2 group-hover:text-primary">
                      {s}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">●●●●●</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Currently Learning
              </div>
              <ul className="mt-6 space-y-3">
                {skillsLearning.map((s) => (
                  <li
                    key={s}
                    className="group flex items-baseline justify-between border-b border-border py-3"
                  >
                    <span className="font-display text-3xl text-foreground transition group-hover:translate-x-2 group-hover:text-primary">
                      {s}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">●●●○○</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Domains
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm bg-card">
              <img
                src={codingHands}
                alt="Hands on keyboard"
                loading="lazy"
                className="h-full min-h-[400px] w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  Approach
                </div>
                <p className="mt-3 font-display text-2xl italic leading-tight text-foreground">
                  "Ship the practical thing. Then make it fast."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section className="relative border-t border-border bg-background py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                (04) Off-hours
              </div>
              <h2 className="mt-6 text-display text-foreground">
                Outside the <span className="italic text-primary">terminal</span>.
              </h2>
              <p className="mt-8 max-w-sm text-muted-foreground">
                The things that don't fit in a repo. Signals of taste, obsession, and the
                stuff that keeps the compiler warm.
              </p>
            </div>

            <div data-reveal-group className="grid gap-px bg-border lg:col-span-8 sm:grid-cols-2">
              {interests.map((it) => (
                <div
                  key={it.k}
                  className="group relative bg-background p-8 transition hover:bg-card"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    {it.k}
                  </div>
                  <div className="mt-4 font-display text-3xl text-foreground">{it.v}</div>
                  <div className="absolute right-6 top-6 font-jp text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">
                    ✧
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-border py-32 md:py-48"
      >
        <div className="absolute inset-0">
          <img
            src={sakuraBranch}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-jp text-[30vw] leading-none text-primary/5"
        >
          縁
        </div>

        <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            (05) Contact
          </div>
          <h2 className="mt-6 text-hero text-foreground">
            Let's
            <br />
            <span className="italic text-primary">connect.</span>
          </h2>

          <div className="mt-16 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
            <a
              href="mailto:gnv.vaibhav@gmail.com"
              className="group flex items-center justify-between border-b border-border py-6"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </div>
                <div className="mt-3 font-display text-3xl text-foreground transition group-hover:text-primary md:text-4xl">
                  gnv.vaibhav@gmail.com
                </div>
              </div>
              <span className="font-mono text-2xl text-muted-foreground transition group-hover:translate-x-2 group-hover:text-primary">
                ↗
              </span>
            </a>
            <a
              href="https://github.com/yb-g"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-b border-border py-6"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  GitHub
                </div>
                <div className="mt-3 font-display text-3xl text-foreground transition group-hover:text-primary md:text-4xl">
                  github.com/yb-g
                </div>
              </div>
              <span className="font-mono text-2xl text-muted-foreground transition group-hover:translate-x-2 group-hover:text-primary">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:items-center md:px-12">
          <div>© 2026 Vaibhav Gannavarapu</div>
          <div className="font-jp text-sm text-primary">また会いましょう</div>
          <div>Built in the dark · Coded for the light</div>
        </div>
      </footer>
    </div>
  );
}
