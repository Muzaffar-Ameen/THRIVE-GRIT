// src/config/site.js
// ============================================
// Thrive Grit — Centralized Site Configuration
// ============================================
import imgNexaScale from "../assets/featured/nexascale.png";
import imgClaremount from "../assets/featured/claremount.png";
import imgRankForge from "../assets/featured/rankforge.png";
export const siteConfig = {
  name: "Thrive Grit",
  tagline: "Design. Code. Rank. Repeat.",
  description:
    "We build brands that don't just look good — they perform. Strategy-first web design, development, and SEO for founders who refuse to settle.",
  url: "https://thrivegrit.com",
};

// Navigation links used in navbar & mobile drawer
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Why Thrive Grit", href: "/why" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Services data
export const servicesData = [
  {
    title: "Web Development",
    icon: "Code2",
    description:
      "Custom-built, blazing-fast websites engineered for performance, scalability, and conversion. No templates — just clean, maintainable code.",
  },
  {
    title: "Web Design & UI/UX",
    icon: "Palette",
    description:
      "Interfaces that feel intuitive and look unforgettable. We design experiences that keep users engaged and coming back.",
  },
  {
    title: "Brand & Graphic Design",
    icon: "PenTool",
    description:
      "From logos to full brand systems — we craft visual identities that tell your story and command attention.",
  },
  {
    title: "Website SEO",
    icon: "Search",
    description:
      "Technical SEO, on-page optimization, and content strategy that puts you in front of the right audience — organically.",
  },
  {
    title: "YouTube SEO & Channel Growth",
    icon: "Youtube",
    description:
      "Keyword research, metadata optimization, and growth strategy to turn your channel into a discovery engine.",
  },
  {
    title: "Ongoing Growth Support",
    icon: "TrendingUp",
    description:
      "We don't disappear after launch. Continuous optimization, analytics reviews, and strategic guidance to keep you growing.",
  },
];

// "What We Build" strip items
export const whatWeBuild = [
  { label: "Web Dev", icon: "Monitor" },
  { label: "UI/UX", icon: "Layout" },
  { label: "Branding", icon: "Sparkles" },
  { label: "Website SEO", icon: "Search" },
  { label: "YouTube SEO", icon: "Youtube" },
  { label: "Growth Support", icon: "Rocket" },
];

// Featured work (placeholder)
export const featuredWork = [
  {
    title: "NexaScale",
    category: "Web App · UI/UX · Development",
    image: imgNexaScale,
    description:
      "A full-stack SaaS platform built for speed — 99 Lighthouse score, 40% higher conversion rate post-launch.",
  },
  {
    title: "Claremount Co.",
    category: "Branding · E-commerce · SEO",
    image: imgClaremount,
    description:
      "Complete brand system for a luxury advisory firm — identity, print, and digital assets that command respect.",
  },
  {
    title: "RankForge",
    category: "Website SEO · Growth",
    image: imgRankForge,
    description:
      "Took an e-commerce brand from page 5 to position 1 in 90 days through technical SEO and content velocity.",
  },
];

// Why founders stick with us
export const whyCards = [
  {
    title: "Strategy First",
    icon: "Target",
    description:
      "Before we touch Figma or write a single line of code, we understand your market, your competitors, and exactly who you're trying to reach. Every decision flows from that clarity.",
  },
  {
    title: "Design That Earns",
    icon: "Zap",
    description:
      "Great design isn't decoration — it's persuasion. We craft visuals that build confidence, communicate value instantly, and make your brand feel like the obvious choice.",
  },
  {
    title: "Performance That Compounds",
    icon: "Gauge",
    description:
      "Traffic, rankings, conversions — we measure what matters and optimize relentlessly. Our work gets better over time, not worse. That's the compounding advantage.",
  },
];

// Budget options for contact form
export const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
];

// Project type options for contact form
export const projectTypeOptions = [
  "New Website",
  "Website Redesign",
  "Branding & Identity",
  "SEO & Growth",
  "YouTube Channel",
  "Ongoing Retainer",
  "Other",
];
