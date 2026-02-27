// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import { navLinks } from "../../config/site";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import "./Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/30 overflow-hidden bg-[#020617] dark:bg-[#020617] ">
      {/* Background gradient orbs */}
      <div
        className="orb w-64 h-64 bg-primary/20 -bottom-32 -left-32"
        style={{ animation: "orb-float 15s ease-in-out infinite" }}
      />
      <div
        className="orb w-48 h-48 bg-accent/10 -bottom-24 right-10"
        style={{ animation: "orb-float 12s ease-in-out infinite reverse" }}
      />

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10 footerpd">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-display font-bold text-gradient-silver mb-4 tracking-[0.2em]">
                THRIVE GRIT
              </h3>
              <p className="text-slate-400 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Strategy-first web design, development, and SEO for founders who refuse to settle.
                We build brands that don&apos;t just look good — they perform.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold hover:gap-3 transition-all duration-300"
              >
                Start a project <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 dark:text-slate-200 mb-5 uppercase tracking-[0.2em]">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 dark:text-slate-200 mb-5 uppercase tracking-[0.2em]">
                Connect
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href="mailto:hello@thrivegrit.com"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    hello@thrivegrit.com
                  </a>
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-300">
                  Twitter / X
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-300">
                  LinkedIn
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-300">
                  Dribbble
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} Thrive Grit. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Designed &amp; built with grit. ✦
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
