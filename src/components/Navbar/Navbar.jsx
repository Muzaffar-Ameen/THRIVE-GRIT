// src/components/Navbar/Navbar.jsx
import { useState, useEffect, forwardRef } from "react";
import "./Navbar.css";

import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// Tailwind class merge helper (cn)
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Central nav links used by navbar & mobile drawer
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Why Thrive Grit", href: "/why" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Theme toggle (dark / light)
// const ThemeToggle = () => {
//   const [dark, setDark] = useState(true);

//   useEffect(() => {
//     const stored = localStorage.getItem("theme");
//     if (stored === "light") {
//       setDark(false);
//       document.documentElement.classList.remove("dark");
//       document.documentElement.classList.add("light");
//     } else {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//     }
//   }, []);

//   const toggle = () => {
//     const next = !dark;
//     setDark(next);

//     if (next) {
//       // DARK MODE ON
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//       localStorage.setItem("theme", "dark");
//     } else {
//       // LIGHT MODE ON
//       document.documentElement.classList.remove("dark");
//       document.documentElement.classList.add("light");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   return (
//     <motion.button
//       onClick={toggle}
//       className="p-2 rounded-full glass transition-all duration-300 hover:scale-110"
//       aria-label="Toggle theme"
//       whileTap={{ scale: 0.9 }}
//     >
//       {dark ? (
//         <Sun className="w-4 h-4 text-accent" />
//       ) : (
//         <Moon className="w-4 h-4 text-primary" />
//       )}
//     </motion.button>
//   );
// };

// NavLink compat wrapper (JS)
const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            className,
            isActive && activeClassName,
            isPending && pendingClassName,
          )
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

// ==========
// Navbar
// ==========

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`
    fixed top-4 left-4 right-4 z-50
    transition-all duration-700 rounded-full light-beam
    ${
      scrolled
        ? "glass-strong shadow-2xl bg-[#020617]/80"
        : "glass bg-transparent"
    }
  `}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-3 narbaritems">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none">
            <span className="text-xl font-bold font-display tracking-[0.2em] text-gradient-silver TGmain">
              THRIVE GRIT
            </span>
            <span className="text-[0.55rem] font-semibold tracking-[0.35em] text-gradient-gold uppercase mt-0.5 TGBS">
              Business Solution
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group"
              >
                <span
                  className={`relative z-10 ${
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-foreground/60 group-hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Link
              to="/contact"
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-accent text-accent-foreground btn-premium glow-gold brandText"
            >
              Let's Build Your Brand
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 text-sm font-semibold rounded-full border border-silver/30 text-silver hover:border-silver/60 hover:text-foreground transition-all duration-300"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md lg:hidden "
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 glass-strong flex flex-col items-start justify-center px-10 gap-2 lg:hidden hamburger"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`text-2xl font-display font-semibold transition-colors block py-2 ${
                      location.pathname === link.href
                        ? "text-accent"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-4 "
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 text-base font-semibold rounded-full bg-accent text-accent-foreground inline-block glow-gold hamburger brandText"
                >
                  Let's Build Your Brand
                </Link>
                {/* <ThemeToggle /> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
