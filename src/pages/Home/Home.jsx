// src/pages/Home/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import TiltCard from "../../components/TiltCard/TiltCard";
import MagneticButton from "../../components/MagneticButton/MagneticButton";
// import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import { whatWeBuild, whyCards, featuredWork } from "../../config/site";
import "./Home.css";

import {
  Monitor,
  Layout,
  Sparkles,
  Search,
  Youtube,
  Rocket,
  Target,
  Zap,
  Gauge,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Monitor,
  Layout,
  Sparkles,
  Search,
  Youtube,
  Rocket,
  Target,
  Zap,
  Gauge,
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const Home = () => {
  return (
    <>
      {/* ── What We Build Strip ── */}
      {/* CONTROL: vertical padding for this section = py-12 */}
      <section className="py-5 relative mesh-gradient">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            {/* CONTROL: space under label = mb-6 */}
            {/* <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100 mb-10 hWhyus">
              What we build
            </p> */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-slate-900 dark:text-slate-100 hWhyus">
              What we <span className="text-gradient-gold">build</span>
            </h2>
          </ScrollReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {whatWeBuild.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div key={item.label} variants={fadeUp}>
                  {/* CONTROL: inner card padding = p-4 */}
                  <div className="what-we-build-card flex flex-col items-center gap-3 p-4 glass-card glass-card-hover rounded-2xl text-center cursor-default group">
                    {Icon && (
                      <Icon className="what-we-build-icon w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-slate-200 dark:text-slate-100 transition-colors">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Why Founders Stick With Us ── */}
      {/* CONTROL: vertical padding for this section = py-12 */}
      <section className="py-5 relative WhyFounders">
        <div className="orb w-80 h-20 bg-primary/10 top-10 right-0 WhyFounder" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            {/* CONTROL: space under label = mb-2 */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-slate-900 dark:text-slate-100 hWhyus">
              Why <span className="text-gradient-gold">Us</span>
            </h2>
            {/* CONTROL: space under heading = mb-12 */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
              The advantage is in{" "}
              <span className="text-gradient-gold">thedetails.</span>
            </h2>
          </ScrollReveal>

          {/* CONTROL: gap between cards = gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <ScrollReveal key={card.title} delay={i * 0.12} scale>
                  <TiltCard>
                    {/* add class why-card */}
                    <div className="why-card glass-card glass-card-hover rounded-2xl p-5 h-full group cursor-default">
                      {Icon && (
                        <div className="why-card-icon-wrap w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-500">
                          {/* add class why-card-icon */}
                          <Icon className="why-card-icon w-7 h-7" />
                        </div>
                      )}
                      <h3 className="text-xl font-display font-semibold mb-3 text-slate-900 dark:text-slate-100">
                        {card.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      {/* CONTROL: vertical padding for this section = py-12 */}
      <section className="py-12 mesh-gradient relative">
        <div className="container mx-auto px-6 relative z-10 ">
          <ScrollReveal>
            {/* <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100 mb-10 hWhyus">
              Portfolio
            </p> */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-slate-900 dark:text-slate-100 hWhyus">
              Featured <span className="text-gradient-gold">Work</span>
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-slate-900 dark:text-slate-100 ">
              Results that{" "}
              <span className="text-gradient-gold ">speak first.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {featuredWork.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.12} scale>
                <TiltCard intensity={10}>
                  {/* add cardFeatured class */}
                  <div className="cardFeatured glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer">
                    <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    {/* Inner content */}
                    <div className="p-4 sm:p-5">
                      {/* category in yellow */}
                      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-yellow-400">
                        {project.category}
                      </p>

                      {/* title in white */}
                      <h3 className="text-base sm:text-lg font-display font-semibold mb-1 text-slate-900 dark:text-slate-100 group-hover:text-yellow-300 transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* description: hidden until hover */}
                      <p className="cardFeatured-desc text-sm text-slate-100 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex justify-center pt-8">
            <MagneticButton hoverScale={1.03}>
              <a href="/contact" className="contact-btn">
                Start Your Project ↗
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {/* CONTROL: padding is inside TestimonialsSection if you want to tighten it */}
      {/* <TestimonialsSection /> */}

      {/* ── Stats Strip ── */}
      {/* CONTROL: vertical padding for this strip = py-10 */}
      <section className="py-10 border-y border-border/20 Statsstrip">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { num: "50+", label: "Projects Delivered" },
              { num: "98%", label: "Client Retention" },
              { num: "3x", label: "Avg. Growth Rate" },
              { num: "24h", label: "Response Time" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="space-y-1"
              >
                <span className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
                  {stat.num}
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      {/* CONTROL: vertical padding for CTA = py-16 */}
      <section className="py-10 relative overflow-hidden">
        <div className="orb w-96 h-10 bg-accent/10 top-0 left-1/4" />
        <div
          className="orb w-64 h-20 bg-primary/15 bottom-0 right-1/4"
          style={{ animationDelay: "3s" }}
        />
        <div className="container mx-auto px-6 text-center relative z-10 text-slate-900 dark:text-slate-100">
          <ScrollReveal scale>
            {/* CONTROL: space under heading = mb-6 */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-slate-900 dark:text-slate-100">
              Your next chapter starts
              <br />
              <span className="text-gradient-gold">with a conversation.</span>
            </h2>
            {/* CONTROL: space under paragraph = mb-8 */}
            <p className="max-w-xl mx-auto mb-8 text-lg text-slate-900 dark:text-slate-100">
              No sales pitch. No pressure. Just a focused conversation about
              what you want to build and how we can make it happen.
            </p>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-12 py-5 text-lg font-semibold rounded-full bg-accent text-accent-foreground btn-premium glow-gold btnletsTalk"
              >
                Let&apos;s Talk <ArrowRight className="w-5 h-5 btnletsTalk" />
              </Link>
              <Link
                to="/why"
                className="contact-btn ml-4"
              >
                Why Thrive Grit? 
              </Link>
            </MagneticButton>
            
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Home;
