// src/components/Header/Header.jsx
import { motion } from "framer-motion";
import HeroBackground from "../HeroBackground/HeroBackground";
import TypingHeading from "../TypingHeading/TypingHeading";
import "./Header.css";

// Simple JS MagneticButton
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

const Header = () => {
  return (
    <header className="relative overflow-hidden pt-40 pb-24 sm:pt-44 sm:pb-28 hero-offset">
      {/* Animated code + orbs background */}
     {/* Test with border */}
  <div className="absolute inset-0 border-none border-red-500 z-0 mt-800">
    {/* Your HeroBackground here */}
    <HeroBackground />
  </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-container">
        <div className="max-w-5xl mx-auto hero-inner">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-slate-300"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Strategy-first web design, dev &amp; SEO</span>
          </motion.div>

          {/* Typing heading */}
          <TypingHeading />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="hero-subtitle"
          >
            We build brands that don&apos;t just look good — they perform.
            Strategy-first web design, development, and SEO for founders who refuse to settle.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="hero-cta-row"
          >
            <MagneticButton hoverScale={1.06}>
              <a
                href="/contact"
                className="hero-btn-primary btn-premium glow-gold"
              >
                Start a Project
                <span className="text-lg">↗</span>
              </a>
            </MagneticButton>

            <MagneticButton hoverScale={1.03}>
              <a
                href="/work"
                className="hero-btn-secondary"
              >
                View Our Work
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
