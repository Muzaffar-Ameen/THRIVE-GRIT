// src/pages/Work/Work.jsx
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
  useScroll,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

import imgNexaScale from "../../assets/featured/nexascale.png";
import imgClaremount from "../../assets/featured/claremount.png";
import imgRankForge from "../../assets/featured/rankforge.png";


import imgVeloxStudio from "../../assets/featured/VeloxStudio.png";
import imgMeridianLabs from "../../assets/featured/MeridianLabs.png";
import imgAuraContent from "../../assets/featured/AuraContent.png";
// ── LOCAL ScrollReveal (merged here) ──────────────────────────────

const THRESHOLD = 0.15;

const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px", amount: THRESHOLD });

  const initialMap = {
    up: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    none: { opacity: 0 },
  };

  const animateMap = {
    up: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial={initialMap[direction]}
      animate={inView ? animateMap[direction] : initialMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── CONFIG (merged subset needed for Work) ────────────────────────

const PORTFOLIO_PROJECTS = [
  {
    id: "nexascale",
    name: "NexaScale",
    filterTag: "Web Development",
    categoryBadge: "Web Dev · UI/UX",
    headline: "SaaS platform built from zero to revenue in 8 weeks.",
    description:
      "Architected a scalable multi-tenant SaaS platform with real-time dashboards, onboarding flows, and a design system that converts — achieving a 99 Lighthouse score from day one.",
    result: "99 Lighthouse · +40% CVR",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    icon: "⚡",
    metrics: [
      { label: "Lighthouse Score", value: "99" },
      { label: "CVR Lift", value: "+40%" },
      { label: "Load Time", value: "<1.2s" },
      { label: "Client Retention", value: "100%" },
    ],
    tags: ["React", "Next.js", "Tailwind", "Vercel"],
    featured: true,
  },
  {
    id: "claremount",
    name: "Claremount Co.",
    filterTag: "Brand Design",
    categoryBadge: "Brand Identity",
    headline: "Luxury advisory brand system built to command rooms.",
    description:
      "Developed a complete brand identity — logo, typography system, color palette, stationery, and a digital presence that communicates premium positioning at first glance.",
    result: "Full identity system delivered",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    icon: "◆",
    metrics: [
      { label: "Brand Assets", value: "40+" },
      { label: "Turnaround", value: "3 wks" },
      { label: "Touch Points", value: "12" },
      { label: "Satisfaction", value: "100%" },
    ],
    tags: ["Figma", "Illustrator", "Brand Strategy"],
    featured: false,
  },
  {
    id: "rankforge",
    name: "RankForge",
    filterTag: "SEO",
    categoryBadge: "Website SEO",
    headline: "From page 5 obscurity to the #1 organic position.",
    description:
      "Executed a full technical SEO audit, content cluster strategy, and authority link campaign that drove RankForge from buried to dominant in a highly competitive B2B niche.",
    result: "Page 5 → #1 in 90 days",
    gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f6feb 100%)",
    icon: "📈",
    metrics: [
      { label: "Ranking", value: "#1" },
      { label: "Organic Traffic", value: "+3×" },
      { label: "Timeframe", value: "90 days" },
      { label: "Keywords", value: "200+" },
    ],
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
    featured: false,
  },
  {
    id: "velox",
    name: "Velox Studio",
    filterTag: "UI/UX",
    categoryBadge: "UI/UX Design",
    headline: "B2B dashboard redesign that cut support tickets in half.",
    description:
      "Conducted user research, mapped pain points across 15 workflows, and redesigned the core product dashboard — reducing friction so dramatically that support volume dropped 60%.",
    result: "−60% support tickets",
    gradient: "linear-gradient(135deg, #1e0533 0%, #2d1b69 50%, #11998e 100%)",
    icon: "◉",
    metrics: [
      { label: "Support Tickets", value: "−60%" },
      { label: "Onboarding Time", value: "−45%" },
      { label: "NPS Score", value: "+32pts" },
      { label: "Retention", value: "+28%" },
    ],
    tags: ["Figma", "User Research", "Prototyping", "Design System"],
    featured: false,
  },
  {
    id: "meridian",
    name: "Meridian Labs",
    filterTag: "Web Development",
    categoryBadge: "Web Dev · SEO",
    headline: "Tech startup launch that hit 10K users in 60 days.",
    description:
      "Built the full marketing site and web app foundation for Meridian Labs' launch — performance-optimised, SEO-ready from day one, and designed to scale as the user base exploded.",
    result: "10K users in 60 days",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    icon: "🚀",
    metrics: [
      { label: "Users (Day 60)", value: "10K" },
      { label: "Page Speed", value: "98/100" },
      { label: "Organic Traffic", value: "+220%" },
      { label: "Bounce Rate", value: "−38%" },
    ],
    tags: ["React", "Tailwind", "SEO", "Analytics"],
    featured: false,
  },
  {
    id: "auracontent",
    name: "AuraContent",
    filterTag: "YouTube",
    categoryBadge: "YouTube SEO",
    headline: "Zero to 25,000 subscribers in six months.",
    description:
      "Developed a YouTube growth strategy: niche positioning, keyword-led title frameworks, thumbnail A/B testing, and upload cadence that consistently surfaced videos to non-subscribers.",
    result: "0 → 25K subs in 6 mo",
    gradient: "linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #c0392b 100%)",
    icon: "▶",
    metrics: [
      { label: "Subscribers", value: "25K" },
      { label: "Avg. View Time", value: "+4.2min" },
      { label: "CTR", value: "8.7%" },
      { label: "Timeframe", value: "6 months" },
    ],
    tags: ["YouTube SEO", "Content Strategy", "Thumbnail Design"],
    featured: false,
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Web Development",
  "UI/UX",
  "Brand Design",
  "SEO",
  "YouTube",
];

// ── Image map for first 3 projects ───────────────────────────────

const IMAGE_MAP = {
  nexascale: imgNexaScale,
  claremount: imgClaremount,
  rankforge: imgRankForge,
  velox: imgVeloxStudio,
  meridian: imgMeridianLabs,
  auracontent: imgAuraContent,
};

// ── Animated Counter ─────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", prefix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, motionVal, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ── 3D Tilt Card ────────────────────────────────────────────────

function ProjectCard3D({ project }) {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const [hovered, setHovered] = useState(false);
  const imgSrc = IMAGE_MAP[project.id];

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <div style={{ perspective: "1000px" }} className="w-full">
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
      >
        {/* Gold border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          animate={
            hovered
              ? {
                  boxShadow:
                    "0 0 0 1.5px hsl(var(--gold)), 0 0 40px 4px hsl(var(--gold) / 0.25)",
                }
              : {
                  boxShadow: "0 0 0 1px hsl(var(--border))",
                }
          }
          transition={{ duration: 0.3 }}
        />

        {/* Image / Gradient */}
        <div className="relative h-56 overflow-hidden bg-black">
          {imgSrc ? (
            <motion.img
              src={imgSrc}
              alt={project.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center text-5xl text-white"
              style={{ background: project.gradient }}
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.5 }}
            >
              {project.icon}
            </motion.div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-20">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{
                borderColor: "hsl(var(--gold))",
                color: "#fff",
                backgroundColor: "#000",
              }}
            >
              {project.categoryBadge}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div
          className="relative p-5"
          style={{
            background: "#020617",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <h3
            className="text-xl font-bold mb-1 text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {project.name}
          </h3>
          <p className="text-sm mb-3 text-slate-300">{project.headline}</p>

          {/* Result pill */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: "hsl(var(--gold) / 0.12)",
              color: "hsl(var(--gold))",
              border: "1px solid hsl(var(--gold) / 0.3)",
            }}
          >
            {project.result}
          </span>

          {/* Hover overlay — description slides up over card */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5 rounded-b-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.75) 100%)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm leading-relaxed mb-3 text-white">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Hero Section ────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-[52vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 0%, hsl(var(--gold) / 0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 0%, hsl(var(--electric-blue) / 0.14) 0%, transparent 65%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-4"
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border"
          style={{
            borderColor: "hsl(var(--gold) / 0.5)",
            color: "hsl(var(--gold))",
            background: "hsl(var(--gold) / 0.08)",
          }}
        >
          Portfolio
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-5xl md:text-7xl font-black leading-tight mb-5"
        style={{ fontFamily: "Syne, sans-serif", color: "hsl(var(--foreground))" }}
      >
        Work that speaks
        <br />
        <span
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--silver)))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="font-sans"
        >
          before you do.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-lg md:text-xl max-w-xl"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Real clients. Real results. Every project ships with strategy baked in and
        outcomes built to last.
      </motion.p>
    </section>
  );
}

// ── Filter Bar ──────────────────────────────────────────────────

function FilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-6 mb-14">
      {FILTER_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="relative text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
          style={{
            color:
              active === cat
                ? "hsl(var(--background))"
                : "hsl(var(--muted-foreground))",
            zIndex: 0,
          }}
        >
          {active === cat && (
            <motion.span
              layoutId="activeFilterPill"
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--gold)), hsl(43 90% 55%))",
                zIndex: -1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          {active !== cat && (
            <span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "hsl(var(--border))" }}
            />
          )}
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Project Grid ────────────────────────────────────────────────

function ProjectGrid({ filter }) {
  const filtered =
    filter === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.filterTag === filter);

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard3D key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && (
        <p
          className="text-center py-20"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}

// ── Spotlight Case Study ────────────────────────────────────────

function SpotlightCase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const featured = PORTFOLIO_PROJECTS.find((p) => p.featured);

  if (!featured) return null;

  return (
    <section ref={ref} className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border"
              style={{
                borderColor: "hsl(var(--gold) / 0.5)",
                color: "hsl(var(--gold))",
                background: "hsl(var(--gold) / 0.08)",
              }}
            >
              Featured Case Study
            </span>
            <h2
              className="mt-5 text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {featured.name}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Parallax image */}
          <ScrollReveal direction="left">
            <div
              className="relative rounded-2xl overflow-hidden h-80 md:h-[480px] bg-black"
              style={{ border: "1px solid hsl(var(--border))" }}
            >
              <motion.img
                src={imgNexaScale}
                alt={featured.name}
                className="w-full h-[120%] object-cover absolute top-0 left-0"
                style={{ y: imgY }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                }}
              />
            </div>
          </ScrollReveal>

          {/* Metrics + tags */}
          <ScrollReveal direction="right" delay={0.1}>
            <p
              className="text-base mb-8 leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {featured.description}
            </p>

            {/* 4-stat grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {featured.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4 bg-[#020617]"
                  style={{
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <div
                    className="text-2xl font-black mb-0.5"
                    style={{
                      color: "hsl(var(--gold))",
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: "hsl(var(--muted))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--gold)), hsl(43 90% 55%))",
                color: "hsl(var(--background))",
              }}
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ── Stats Strip ─────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { prefix: "", target: 18, suffix: "+", label: "Projects Delivered" },
    { prefix: "", target: 92, suffix: "%", label: "Client Retention" },
    { prefix: "$", target: 2, suffix: "M+", label: "Revenue Generated for Clients" },
  ];

  return (
    <section className="py-6 px-6">
      <ScrollReveal>
        <div
          className="max-w-4xl mx-auto rounded-2xl px-8 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
          style={{
            background: "hsl(var(--card) / 0.6)",
            border: "1px solid hsl(var(--border))",
            backdropFilter: "blur(16px)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-6 py-6 md:py-0"
            >
              <div
                className="text-5xl font-black mb-1"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "hsl(var(--gold))",
                }}
              >
                <AnimatedCounter
                  prefix={s.prefix}
                  target={s.target}
                  suffix={s.suffix}
                />
              </div>
              <div
                className="text-sm"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

// ── Bottom CTA ─────────────────────────────────────────────────

function BottomCTA() {
  return (
    <section
      className="relative py-28 px-6 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(var(--gold) / 0.1) 0%, transparent 70%)",
      }}
    >
      {/* Beam divider top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--gold) / 0.5))",
        }}
      />

      <ScrollReveal>
        <p
          className="text-sm font-bold tracking-widest uppercase mb-5"
          style={{ color: "hsl(var(--gold))" }}
        >
          Next Steps
        </p>
        <h2
          className="text-5xl md:text-6xl font-black mb-5"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--silver)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundColor: "whiteh",
            }}
          >
            Ready to be next?
          </span>
        </h2>
        <p
          className="text-lg max-w-md mx-auto mb-10"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Your project. Our obsession. Let's build something that earns attention
          long after launch.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--gold)), hsl(43 90% 55%))",
              color: "hsl(var(--background))",
            }}
          >
            Start a Project <ArrowRight size={16} />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid hsl(var(--silver) / 0.4)",
              color: "hsl(var(--silver))",
              background: "hsl(var(--silver) / 0.05)",
            }}
          >
            View Our Services <ExternalLink size={15} />
          </Link>
        </div>
      </ScrollReveal>

      {/* Beam divider bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20"
        style={{
          background:
            "linear-gradient(to top, transparent, hsl(var(--gold) / 0.5))",
        }}
      />
    </section>
  );
}

// ── Work Page ───────────────────────────────────────────────────

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <HeroSection />

      {/* Divider */}
      <div
        className="h-px mx-auto max-w-4xl mb-10"
        style={{ background: "hsl(var(--border))" }}
      />

      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ProjectGrid filter={activeFilter} />

      {/* Divider */}
      <div
        className="h-px mx-auto max-w-4xl mt-20"
        style={{ background: "hsl(var(--border))" }}
      />

      <SpotlightCase />

      {/* Divider */}
      <div
        className="h-px mx-auto max-w-4xl"
        style={{ background: "hsl(var(--border))" }}
      />

      <StatsStrip />

      {/* Divider */}
      <div
        className="h-px mx-auto max-w-4xl mt-10"
        style={{ background: "hsl(var(--border))" }}
      />

      <BottomCTA />
    </div>
  );
}
