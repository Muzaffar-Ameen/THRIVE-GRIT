import { motion } from "framer-motion";
import TiltCard from "../../components/TiltCard/TiltCard";
import MagneticButton from "../../components/MagneticButton/MagneticButton";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import "./Services.css";
import {
  Code2,
  Palette,
  PenTool,
  Search,
  Youtube,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// import MagneticButton from "../../components/MagneticButton";

const servicesData = [
  {
    title: "Web Development",
    description:
      "Custom-built, blazing-fast websites engineered for performance, scalability, and conversion. No templates — just clean, maintainable code.",
    icon: "Code2",
  },
  {
    title: "Web Design & UI/UX",
    description:
      "Interfaces that feel intuitive and look unforgettable. We design experiences that keep users engaged and coming back.",
    icon: "Palette",
  },
  {
    title: "Brand & Graphic Design",
    description:
      "From logos to full brand systems — we craft visual identities that tell your story and command attention.",
    icon: "PenTool",
  },
  {
    title: "Website SEO",
    description:
      "Technical SEO, on-page optimization, and content strategy that puts you in front of the right audience — organically.",
    icon: "Search",
  },
  {
    title: "YouTube SEO & Channel Growth",
    description:
      "Keyword research, metadata optimization, and growth strategy to turn your channel into a discovery engine.",
    icon: "Youtube",
  },
  {
    title: "Ongoing Growth Support",
    description:
      "We don't disappear after launch. Continuous optimization, analytics reviews, and strategic guidance to keep you growing.",
    icon: "TrendingUp",
  },
];

const iconMap = {
  Code2,
  Palette,
  PenTool,
  Search,
  Youtube,
  TrendingUp,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const ServicesPage = () => {
  return (
    <>
      {/* Hero */}
      <section className=" pt-36 pb-24 relative overflow-hidden mesh-gradient">
        <div className="orb w-80 h-80 bg-primary/15 top-20 -right-40" />
        <div
          className=" orb w-64 h-6 bg-accent/10 -bottom-32 left-10"
          style={{ animationDelay: "3s" }}
        />

        <div className="container mx-auto px-6 text-center relative z-10 -mt-[350px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-medium text-foreground/80 mb-8 border-2 border-yellow-400/80"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Our Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
          >
            What We <span className="text-gradient-gold">Build</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Every service is outcome-focused. We don't sell hours — we deliver
            growth.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-28 relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={service.title} variants={fadeUp}>
                  <TiltCard intensity={8}>
                    <div className="glass-card glass-card-hover rounded-2xl p-10 h-full group cursor-default border-2 border-white/20 hover:border-yellow-400/80 hover:text-yellow-400 transition-all duration-500">
                      {Icon && (
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-yellow-400/20 transition-all duration-500 group-hover:glow-blue">
                          <Icon className="w-8 h-8 text-white/80 group-hover:text-yellow-400 transition-colors duration-500" />
                        </div>
                      )}
                      <h3 className="text-xl font-display font-semibold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 mesh-gradient relative overflow-hidden">
        <div className="orb w-72 h-72 bg-accent/10 top-0 left-1/3" />
        <div className="container mx-auto px-6 text-center relative z-10 -mt-[400px]">
          <ScrollReveal scale>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Let's find the right fit for{" "}
              <span className="text-gradient-gold">your brand</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Every project starts with a conversation. Tell us where you're at,
              and we'll map out how to get you where you want to be.
            </p>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-full bg-yellow-400 text-black btn-premium glow-gold"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
