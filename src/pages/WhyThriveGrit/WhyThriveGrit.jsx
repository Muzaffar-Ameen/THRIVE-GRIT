// src/pages/WhyThriveGrit/WhyThriveGrit.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import "./WhyThriveGrit.css";
// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Discover",
    description:
      "We dig deep into your business, audience, and competition to uncover what actually matters.",
    color: "bg-blue-500/50",
  },
  {
    num: "02",
    title: "Design",
    description:
      "Every pixel is intentional. We create interfaces that convert visitors into loyal users.",
    color: "bg-yellow-500/50",
  },
  {
    num: "03",
    title: "Build",
    description:
      "Clean, fast, maintainable code. We engineer experiences that scale with your ambitions.",
    color: "bg-purple-500/20",
  },
  {
    num: "04",
    title: "Grow",
    description:
      "SEO, analytics, and continuous optimization to keep your growth compounding.",
    color: "bg-green-500/20",
  },
];

const differentiators = [
  "Most agencies hand you a website and walk away. We stay obsessed with what happens after launch: traffic, conversions, and compounding growth. Your results are the only metric that matters to us.",
  "Every member of the Thrive Grit team has worked with real businesses — startups, e-commerce brands, service providers. We understand unit economics, CAC, and lifetime value. We design accordingly.",
  "No outsourcing, no handoffs to junior teams after the sale. The people you meet are the people who build. That means faster decisions, better quality, and zero loss in translation.",
  "If your idea needs refining, we'll tell you. If your brand strategy has a gap, we'll name it. We'd rather have an uncomfortable honest conversation than a comfortable one that leads to mediocre work.",
];

// ─────────────────────────────────────────────
// Inline helpers: ScrollReveal, TiltCard, MagneticButton
// ─────────────────────────────────────────────

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  scale = false,
  direction,
}) => {
  const dirOffset = direction === "left" ? -24 : direction === "right" ? 24 : 0;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 24,
        x: dirOffset,
        scale: scale ? 0.98 : 1,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, intensity = 8 }) => {
  // Simple hover scale to mimic tilt
  return (
    <motion.div
      whileHover={{ scale: 1 + intensity / 200 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className = "", hoverScale = 1.05 }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

const WhyThriveGrit = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden mesh-gradient">
        <div className="orb w-96 h-96 bg-accent/10 -top-20 -right-48" />
        <div
          className="orb w-72 h-72 bg-primary/15 bottom-0 -left-36"
          style={{ animationDelay: "4s" }}
        />

        <div className="container mx-auto px-6 text-center relative z-10 herotag">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(251, 191, 36, 0.4)",
              y: -2,
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-semibold border-2 border-yellow-400/80 mb-8 group"
          >
            <span className="w-3 h-3 rounded-full bg-yellow-400 group-hover:scale-125 transition-transform" />
            Why Choose Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
          >
            Grit in the details.
            <br />
            <span className="text-gradient-gold">Growth in the results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We don&apos;t believe in shortcuts. Every project gets the same
            obsessive attention to strategy, craft, and measurable outcomes.
          </motion.p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-28 relative Timelinetag">
        <div className="container mx-auto px-6 Processtag">
          <ScrollReveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-20">
              Our <span className="text-gradient-gold">Process</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.12} scale>
                <TiltCard intensity={8}>
                  <div className="glass-card glass-card-hover rounded-2xl p-8 h-full group cursor-default relative overflow-hidden border border-slate-700/60 bg-slate-900/70 hover:border-yellow-400 transition-colors duration-300">
                    {/* Background number, behind card content */}
                    <span className="pointer-events-none absolute -top-4 -right-2 text-8xl font-display font-bold text-slate-500/5 select-none -z-10">
                      {step.num}
                    </span>

                    {/* Colored pill with golden number */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                        step.num === "01"
                          ? "bg-blue-500/20"
                          : step.num === "02"
                            ? "bg-yellow-400/20"
                            : step.num === "03"
                              ? "bg-purple-500/20"
                              : "bg-green-400/20"
                      }`}
                    >
                      <span className="text-yellow-400 text-sm font-mono font-bold">
                        {step.num}
                      </span>
                    </div>

                    {/* Title: gold on hover */}
                    <h3 className="text-2xl font-display font-semibold mb-3 text-slate-100 group-hover:text-yellow-400 transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description: dark white */}
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Connecting arrows between steps - desktop */}
          <div className="hidden lg:flex items-center justify-center gap-4 mt-12">
            {["Discover", "→", "Design", "→", "Build", "→", "Grow"].map(
              (item, i) => (
                <span
                  key={i}
                  className={`text-sm font-display ${
                    item === "→"
                      ? "text-accent/50"
                      : "text-foreground/40 font-semibold"
                  }`}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-28 mesh-gradient relative overflow-hidden ">
        <div className="orb w-64 h-64 bg-primary/10 top-20 left-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center Difflinetag">
            <ScrollReveal direction="left">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4  ">
                The Difference
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                We&apos;re not an agency.
                <br />
                We&apos;re your{" "}
                <span className="text-gradient-gold">growth partner</span>.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Most agencies disappear after launch. We stick around —
                optimizing, iterating, and pushing your brand forward.
                That&apos;s the grit difference.
              </p>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full bg-amber-400 text-black/95 btn-premium glow-gold shadow-lg hover:shadow-xl transition-all"
                >
                  Work With Us <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="glass-card rounded-2xl p-8 space-y-5">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 text-yellow-400" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyThriveGrit;
