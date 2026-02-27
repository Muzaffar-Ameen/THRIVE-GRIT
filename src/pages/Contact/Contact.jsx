// src/pages/Contact/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Calendar, Clock, Send, CheckCircle2 } from "lucide-react";

// import { createClient } from "@supabase/supabase-js";

/* ───────────────── Config pieces used on Contact ───────────────── */

const BRAND = {
  name: "THRIVE GRIT",
  tagline: "Design. Code. Rank. Repeat.",
  fullName: "Thrive Grit Business Solution",
  email: "hello@thrivegrit.com",
  phone: "+1 (555) 000-0000",
  address: "Remote-first · Worldwide",
};

const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Let's discuss",
];

const PROJECT_TYPES = [
  "New Website",
  "Redesign / Refresh",
  "Brand Identity",
  "SEO Campaign",
  "YouTube Growth",
  "Ongoing Retainer",
  "Not sure yet",
];

/* ───────────────── Supabase client ───────────────── */

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_PUBLISHABLE_KEY =
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
//   auth: {
//     storage: window.localStorage,
//     persistSession: true,
//     autoRefreshToken: true,
//   },
// });

/* ───────────────── Toast helper (minimal) ───────────────── */

const toast = ({ title, description }) => {
  console.error(title, description);
  alert(`${title}\n${description}`);
};

/* ───────────────── usePageContent (merged) ───────────────── */

const usePageContent = (page) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchSections = async () => {
    //   try {
    //     const { data } = await supabase
    //       .from("page_content")
    //       .select("*")
    //       .eq("page", page);
    //     if (data) setSections(data);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchSections();
  }, [page]);

  const getSection = (sectionName) => {
    const s = sections.find((s) => s.section === sectionName);
    return s ? s.content : null;
  };

  const getText = (sectionName, key, fallback) => {
    const s = getSection(sectionName);
    return s?.[key] ?? fallback;
  };

  const getArray = (sectionName, key, fallback) => {
    const s = getSection(sectionName);
    return s?.[key] ?? fallback;
  };

  return { sections, loading, getSection, getText, getArray };
};

/* ───────────────── ScrollReveal (merged) ───────────────── */

const REVEAL_THRESHOLD = 0.15;

const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
    amount: REVEAL_THRESHOLD,
  });

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
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ───────────────── Contact page ───────────────── */

const Contact = () => {
  const { getText } = usePageContent("contact");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    projectType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // try {
    //   const response = await supabase.functions.invoke("notify-contact", {
    //     body: {
    //       name: form.name.trim(),
    //       email: form.email.trim(),
    //       company: form.company.trim(),
    //       budget: form.budget,
    //       project_type: form.projectType,
    //       message: form.message.trim(),
    //     },
    //   });
    //   if (response.error) throw response.error;
    //   setSubmitted(true);
    // } catch (err) {
    //   console.error(err);
    //   toast({
    //     title: "Something went wrong",
    //     description: "Please try again or email us directly.",
    //   });
    // }
    setSubmitting(false);
  };
  // put this INSIDE Contact component, above the JSX sections:
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const inputBase =
    "w-full bg-slate-900/70 border border-slate-800/80 rounded-xl px-4 py-3.5 text-foreground text-sm placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/60 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl font-sans";
  const labelBase =
    "block text-xs font-display font-600 text-secondary tracking-widest uppercase mb-2 text-white-200";

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(220 90% 60% / 0.14), transparent 65%)",
          }}
        />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
          >
            {/* LEFT: Get in touch */}
            <div className="text-center md:text-left">
              <span className="section-label mb-6 inline-flex rounded-full border border-yellow-400 text-yellow-400 bg-transparent px-4 py-1.5">
                {getText("hero", "badge", "Get In Touch")}
              </span>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-800 mt-6 mb-6 leading-tight">
                {getText("hero", "headline_1", "Let's build")}
                <br />
                <motion.span
                  className="text-yellow-400"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  {getText("hero", "headline_highlight", "something real.")}
                </motion.span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto md:mx-0 text-slate-400/90">
                {getText(
                  "hero",
                  "description",
                  "Tell us about your project. We respond to every inquiry within 24 hours — usually faster.",
                )}
              </p>
            </div>

            {/* RIGHT: Book a call */}
            <div className="mt-10 md:mt-0">
              <div className="glass-card rounded-2xl p-6 md:p-8 bg-slate-900/70 border border-slate-900/90 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <p className="text-xs font-display font-600 text-secondary tracking-widest uppercase mb-3 text-yellow-400">
                  Book a Call
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-800 text-slate-100 mb-3">
                  Prefer to talk it through?
                </h2>
                <p className="text-slate-400/90 text-sm md:text-base mb-6">
                  Skip the back-and-forth and jump on a quick strategy call.
                  We’ll unpack your goals, timelines, and what working together
                  could look like.
                </p>

                <div className="space-y-4">
                  <a
                    href="#book-a-call"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-display font-bold bg-yellow-400 text-black border border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:shadow-[0_0_30px_rgba(250,204,21,0.9)] transition-shadow duration-200"
                  >
                    Book a Strategy Call
                  </a>

                  <div className="flex flex-col items-center md:items-start gap-1 text-xs text-slate-400/90">
                    <span>Or call us directly:</span>
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="text-yellow-400 hover:text-yellow-300 font-medium"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="beam-divider mt-16" />
      </section>

      {/* ── FORM + BOOK CALL SECTION ── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch ">

            {/* LEFT: CONTACT EMAIL FORM */}
            <div className="h-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className=" glass-card rounded-2xl p-12 text-center bg-slate-900/70 border border-slate-400/50 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: "hsl(43 90% 55% / 0.12)",
                      border: "1px solid hsl(43 90% 55% / 0.3)",
                    }}
                  >
                    <CheckCircle2 size={36} className="text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-800 text-foreground mb-4">
                    {getText("success", "heading", "Message received.")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
                    {getText(
                      "success",
                      "description",
                      "Thanks for reaching out. A member of our team will be in touch within 24 hours to learn more about your project.",
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-silver px-6 py-2.5 rounded-pill border text-sm font-display"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <ScrollReveal>
                  <div className="glass-card h-[694px] rounded-2xl p-8 md:p-10 bg-slate-900/70 border border-slate-400/50 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6 ">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelBase}>
                            Your Name *
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="Alex Johnson"
                            value={form.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            className={inputBase}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelBase}>
                            Email Address *
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={form.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className={inputBase}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className={labelBase}>
                          Company / Brand
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Your company name"
                          value={form.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          className={inputBase}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="budget" className={labelBase}>
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            value={form.budget}
                            onChange={(e) =>
                              handleChange("budget", e.target.value)
                            }
                            className={`${inputBase} appearance-none cursor-pointer`}
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                              backgroundPosition: "right 12px center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="" disabled>
                              Select range
                            </option>
                            {BUDGET_RANGES.map((r) => (
                              <option
                                key={r}
                                value={r}
                                style={{ background: "hsl(222 55% 8%)" }}
                              >
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="projectType" className={labelBase}>
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            value={form.projectType}
                            onChange={(e) =>
                              handleChange("projectType", e.target.value)
                            }
                            className={`${inputBase} appearance-none cursor-pointer`}
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                              backgroundPosition: "right 12px center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="" disabled>
                              Select type
                            </option>
                            {PROJECT_TYPES.map((t) => (
                              <option
                                key={t}
                                value={t}
                                style={{ background: "hsl(222 55% 8%)" }}
                              >
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelBase}>
                          Tell Us About Your Project *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="What are you building? What's the goal? What's the timeline?"
                          value={form.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          className={`${inputBase} resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full flex items-center justify-center gap-3 py-4 rounded-full font-display font-bold text-base disabled:opacity-60 text-black border border-yellow-400"
                        style={{
                          background:
                            "linear-gradient(90deg, hsl(43 96% 55%), hsl(43 90% 50%))",
                        }}
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 0 30px rgba(250,204,21,0.9)",
                        }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin bg-yellow-400" />
                        ) : (
                          <>
                            <Send size={16} /> Send My Project Brief
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-muted-foreground text-xs">
                        Or email us directly at{" "}
                        <a
                          href={`mailto:${BRAND.email}`}
                          className="text-primary hover:underline text-yellow-400 "
                        >
                          {BRAND.email}
                        </a>
                      </p>
                    </form>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* RIGHT: BOOK A CALL FORM */}
            <div id="book-a-call">
              <ScrollReveal>
                <div className="glass-card rounded-2xl p-8 md:p-10 bg-slate-900/70 border border-slate-400/50 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-800 text-foreground mb-3">
                      Or request a call time
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Fill out the form and we'll get back to you within 24
                      hours.
                    </p>
                  </div>
                  <div id="book-a-call">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelBase}>Your Name *</label>
                          <input
                            required
                            placeholder="Alex Johnson"
                            value={form.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            className={inputBase}
                          />
                        </div>
                        <div>
                          <label className={labelBase}>Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={form.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className={inputBase}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelBase}>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          className={inputBase}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelBase}>Preferred Date *</label>
                          <input
                            type="date"
                            required
                            min={minDate}
                            value={form.preferred_date}
                            onChange={(e) =>
                              handleChange("preferred_date", e.target.value)
                            }
                            className={inputBase}
                          />
                        </div>
                        <div>
                          <label className={labelBase}>Preferred Time *</label>
                          <select
                            required
                            value={form.preferred_time}
                            onChange={(e) =>
                              handleChange("preferred_time", e.target.value)
                            }
                            className={`${inputBase} appearance-none cursor-pointer`}
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                              backgroundPosition: "right 12px center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="" disabled>
                              Select time
                            </option>
                            {[
                              "09:00 AM",
                              "09:30 AM",
                              "10:00 AM",
                              "10:30 AM",
                              "11:00 AM",
                              "11:30 AM",
                              "12:00 PM",
                              "12:30 PM",
                              "01:00 PM",
                              "01:30 PM",
                              "02:00 PM",
                              "02:30 PM",
                              "03:00 PM",
                              "03:30 PM",
                              "04:00 PM",
                              "04:30 PM",
                              "05:00 PM",
                            ].map((t) => (
                              <option
                                key={t}
                                value={t}
                                style={{ background: "hsl(222 55% 8%)" }}
                              >
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelBase}>
                          What would you like to discuss?
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us briefly about your project or goals..."
                          value={form.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          className={`${inputBase} resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full flex items-center justify-center gap-3 py-4 rounded-full font-display font-bold text-base disabled:opacity-60 text-black border border-yellow-400"
                        style={{
                          background:
                            "linear-gradient(90deg, hsl(43 96% 55%), hsl(43 90% 50%))",
                        }}
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 0 30px rgba(250,204,21,0.9)",
                        }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin bg-yellow-400" />
                        ) : (
                          <>
                            <Send size={16} /> Book My Call
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO STRIPS: CONTACT (LEFT) + BOOK CALL (RIGHT) ── */}
<section className="py-16 px-4">
  <div className="beam-divider mb-12" />
  <div className="container mx-auto max-w-6xl">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
      {/* LEFT: CONTACT EMAIL INFO STRIP */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              label: getText("info_strip", "item_1_label", "Response Time"),
              value: getText("info_strip", "item_1_value", "< 24 Hours"),
            },
            {
              label: getText(
                "info_strip",
                "item_2_label",
                "Free Consultation",
              ),
              value: getText(
                "info_strip",
                "item_2_value",
                "No Commitment",
              ),
            },
            {
              label: getText("info_strip", "item_3_label", "Available"),
              value: getText("info_strip", "item_3_value", "Worldwide"),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card rounded-xl p-6 bg-slate-900/70 border border-slate-900/90 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] hover:-translate-y-1 hover:scale-[1.02]"
            >
              <p
                className="font-display text-2xl font-800 mb-2"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(43 96% 55%), hsl(43 90% 50%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.value}
              </p>

              <p className="text-muted-foreground text-sm text-slate-200">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: BOOK A CALL INFO STRIP */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: Clock,
              label: "Duration",
              value: "30 Minutes",
            },
            {
              icon: Calendar,
              label: "Availability",
              value: "Mon – Fri",
            },
            {
              icon: Phone,
              label: "Format",
              value: "Video or Phone",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card rounded-xl p-6 bg-slate-900/70 border border-slate-900/90 shadow-[0_0_0_1px_rgba(15,23,42,0.55),0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center mb-3">
                <item.icon className="text-yellow-400" size={22} />
              </div>

              <p
                className="font-display text-2xl font-800 mb-2"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(43 96% 55%), hsl(43 90% 50%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.value}
              </p>

              <p className="text-muted-foreground text-sm text-slate-200">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Contact;
