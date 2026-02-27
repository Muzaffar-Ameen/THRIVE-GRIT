import { motion } from "framer-motion";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import TiltCard from "../../components/TiltCard/TiltCard";
import { Lightbulb, Shield, FlaskConical, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Clarity",
    description:
      "We cut through noise. Every decision is grounded in purpose and communicated transparently.",
    color: "bg-yellow-500/15",
  },
  {
    icon: Shield,
    title: "Ownership",
    description:
      "Your project is our project. We take full responsibility for the quality and outcome of every deliverable.",
    color: "bg-blue-400/15",
  },
  {
    icon: FlaskConical,
    title: "Experimentation",
    description:
      "We test, iterate, and optimize. The best solutions come from curiosity, not assumptions.",
    color: "bg-purple-500/15",
  },
  {
    icon: TrendingUp,
    title: "Long-term Growth",
    description:
      "Quick wins are nice, but sustainable growth is the goal. We build for the long game.",
    color: "bg-green-500/15",
  },
];

const howWeWork = [
  {
    step: "01",
    title: "Listen",
    description:
      "We start by understanding your business, your users, and your ambitions.",
  },
  {
    step: "02",
    title: "Strategize",
    description:
      "We map out the roadmap: goals, milestones, deliverables, timeline.",
  },
  {
    step: "03",
    title: "Execute",
    description:
      "Design, develop, test, and refine — fast, focused, and transparent.",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "Launch is just the beginning. We analyze, iterate, and scale.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const AboutPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden mesh-gradient ">
        <div className="orb w-80 h-8 bg-primary/15 top-10 -right-40 " />
      

        <div className="container mx-auto px-6 relative z-10 -mt-15">
          <motion.dive
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-medium text-white border-2 border-white/20 bg-blue-400/10 mb-8 mx-auto block w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            About Us
          </motion.dive>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center leading-tight"
          >
            Built on <span className="text-gradient-gold">grit</span>,
            <br />
            driven by craft
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="text-white/80 glass-card rounded-2xl p-10 space-y-5 text-foreground/80 leading-relaxed border-2 border-white/20 bg-white/5">
              <p>
                Thrive Grit started with a simple frustration: too many agencies
                deliver flashy mockups that fall apart in production. We wanted
                to build something different — a studio where strategy, design,
                and engineering work as one.
              </p>
              <p>
                Today, we partner with founders and growing businesses who need
                more than a pretty website. They need a digital presence that
                drives revenue, builds trust, and scales with them.
              </p>
              <p>
                We're a small team by design. Every client gets senior-level
                attention. No junior handoffs, no cookie-cutter templates, no
                disappearing after launch.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              What drives us
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-20">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
          </ScrollReveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp}>
                <TiltCard intensity={8}>
                  <div className="glass-card glass-card-hover rounded-2xl p-8 text-center h-full group cursor-default border-2 border-white/20 hover:border-yellow-400/80 hover:text-yellow-400 transition-all duration-500">
                    <div
                      className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-400/20 transition-all duration-500`}
                    >
                      <v.icon className="w-7 h-7 text-yellow-400 group-hover:text-yellow-400 transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-28 mesh-gradient relative overflow-hidden">
        <div className="orb w-72 h-2 bg-accent/8 bottom-10 right-10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 -mt-20">
              Our Process
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-20">
              How We <span className="text-gradient-gold">Work</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeWork.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1} scale>
                <div className="text-center group">
                  <motion.span
                    className="text-6xl font-display font-bold text-gradient-gold inline-block"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.step}
                  </motion.span>
                  <h3 className="text-xl font-display font-semibold mt-4 mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
