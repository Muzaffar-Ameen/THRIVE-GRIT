// src/pages/Blog.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
// import * as THREE from "three";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";

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

/* ───────────────── FloatingShapes (merged) ───────────────── */

function GoldSphere({ position, scale = 1 }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#E8A820"
          emissive="#E8A820"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.9}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function BlueTorus({ position, scale = 1 }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshWobbleMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.12}
          roughness={0.4}
          metalness={0.8}
          factor={0.15}
          speed={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function SilverOctahedron({ position, scale = 1 }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#94A3B8"
          emissive="#94A3B8"
          emissiveIntensity={0.08}
          roughness={0.25}
          metalness={0.95}
          transparent
          opacity={0.45}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function GoldRing({ position, scale = 1 }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x =
      Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#E8A820"
          emissive="#E8A820"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.95}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 60 }) {
  const points = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E8A820"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

const FloatingShapes = ({ variant = "section", className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#E8A820"
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.3}
          color="#3B82F6"
        />

        {variant === "hero" && (
          <>
            <GoldSphere position={[-4, 2, -2]} scale={0.7} />
            <BlueTorus position={[4, -1.5, -3]} scale={0.6} />
            <SilverOctahedron position={[-3, -2.5, -1]} scale={0.5} />
            <GoldRing position={[3.5, 2.5, -2]} scale={0.5} />
            <GoldSphere position={[5, 0.5, -4]} scale={0.4} />
            <SilverOctahedron position={[-5, 1, -3]} scale={0.35} />
            <Particles count={80} />
          </>
        )}

        {variant === "section" && (
          <>
            <GoldSphere position={[-5, 1.5, -3]} scale={0.5} />
            <BlueTorus position={[5, -1, -2]} scale={0.45} />
            <SilverOctahedron position={[4, 2, -3]} scale={0.4} />
            <GoldRing position={[-4, -2, -2]} scale={0.35} />
            <Particles count={40} />
          </>
        )}

        {variant === "minimal" && (
          <>
            <GoldSphere position={[-4, 1, -3]} scale={0.35} />
            <SilverOctahedron position={[4, -1, -2]} scale={0.3} />
            <Particles count={25} />
          </>
        )}
      </Canvas>
    </div>
  );
};

/* ───────────────── Config (BLOG_* only) ───────────────── */

const BLOG_CATEGORIES = [
  "All",
  "Web Dev",
  "SEO",
  "UI/UX",
  "Brand",
  "YouTube",
  "Growth",
];

const BLOG_POSTS = [
  {
    id: "lighthouse-100",
    category: "Web Dev",
    tag: "Performance",
    title: "How We Hit a 100 Lighthouse Score on Every Client Site",
    excerpt:
      "A perfect Lighthouse score isn't luck — it's a system. Here's our exact checklist: image optimisation, font loading strategy, critical CSS inlining, and the three Vercel config flags that make all the difference.",
    readTime: 6,
    date: "Feb 12, 2026",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    icon: "⚡",
    featured: true,
  },
  {
    id: "seo-cluster-strategy",
    category: "SEO",
    tag: "Strategy",
    title:
      "The Content Cluster Strategy That Tripled Our Client's Organic Traffic",
    excerpt:
      "Forget one-off blog posts. A pillar-and-cluster content model creates topic authority that compounds month over month. We break down the exact structure we used to take RankForge from page 5 to position 1.",
    readTime: 8,
    date: "Feb 5, 2026",
    gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f6feb 100%)",
    icon: "📈",
    featured: false,
  },
  {
    id: "design-systems-founders",
    category: "UI/UX",
    tag: "Design Systems",
    title: "Why Founders Should Demand a Design System, Not Just a Website",
    excerpt:
      "A website without a design system is technical debt from day one. We explain what a design system actually is, what it includes, and why it saves you money every single sprint after you have it.",
    readTime: 5,
    date: "Jan 28, 2026",
    gradient: "linear-gradient(135deg, #1e0533 0%, #2d1b69 50%, #11998e 100%)",
    icon: "◉",
    featured: false,
  },
  {
    id: "brand-identity-mistakes",
    category: "Brand",
    tag: "Branding",
    title: "5 Brand Identity Mistakes That Cost Startups Their Credibility",
    excerpt:
      "Inconsistent fonts, stock-photo headshots, and a logo that doesn't scale — these signals tell potential clients you're not ready. Here's what premium positioning actually looks like at every touchpoint.",
    readTime: 7,
    date: "Jan 20, 2026",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    icon: "◆",
    featured: false,
  },
  {
    id: "youtube-algorithm-2026",
    category: "YouTube",
    tag: "Channel Growth",
    title: "The YouTube Algorithm in 2026: What Actually Moves the Needle",
    excerpt:
      "Click-through rate is still king, but watch time, re-watches, and audience satisfaction score are where the algorithm separates channels that plateau from channels that compound. Here's how to optimise all three.",
    readTime: 9,
    date: "Jan 14, 2026",
    gradient: "linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #c0392b 100%)",
    icon: "▶",
    featured: false,
  },
  {
    id: "core-web-vitals-guide",
    category: "Web Dev",
    tag: "Core Web Vitals",
    title: "Core Web Vitals: The No-Nonsense Guide for Non-Technical Founders",
    excerpt:
      "INP replaced FID, LCP still matters, and CLS can quietly tank your rankings. We decode what each metric means for your business — and the quick wins that move the needle fastest without a full rebuild.",
    readTime: 6,
    date: "Jan 7, 2026",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    icon: "🚀",
    featured: false,
  },
  {
    id: "conversion-copywriting",
    category: "Growth",
    tag: "Copywriting",
    title:
      "Above-the-Fold Copy That Converts: A Framework for Service Businesses",
    excerpt:
      "Most hero sections answer the wrong question. Visitors don't want to know what you do — they want to know what changes for them. We share the 3-part headline formula we use across every client site.",
    readTime: 5,
    date: "Dec 30, 2025",
    gradient: "linear-gradient(135deg, #0a2e1a 0%, #0d4a29 50%, #1a7a40 100%)",
    icon: "✍",
    featured: false,
  },
  {
    id: "retainer-vs-project",
    category: "Growth",
    tag: "Business Strategy",
    title:
      "Retainer vs. Project: Which Engagement Model Grows Your Business Faster?",
    excerpt:
      "Project-based work gives you cash flow. Retainers give you compounding outcomes. We unpack the real difference, when each model makes sense, and what questions to ask before you sign anything.",
    readTime: 6,
    date: "Dec 22, 2025",
    gradient: "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #8a5a00 100%)",
    icon: "📊",
    featured: false,
  },
];

/* ───────────────── Supabase client (merged) ───────────────── */

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

/* ───────────────── Types ───────────────── */

const toDateISOString = (dateString) => new Date(dateString).toISOString();

const makeStaticBlogPosts = () =>
  BLOG_POSTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.id,
    excerpt: p.excerpt,
    category: p.category,
    tag: p.tag,
    icon: p.icon,
    gradient: p.gradient,
    read_time: p.readTime,
    featured: p.featured,
    created_at: toDateISOString(p.date),
  }));

/* ───────────────── UI pieces from original Blog ───────────────── */

const FilterBar = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-6 mb-14">
      {BLOG_CATEGORIES.map((cat) => (
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
              layoutId="blogActiveFilterPill"
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
};

const FeaturedCard = ({ post }) => {
  return (
    <ScrollReveal>
      <Link
        to={`/blog/${post.slug || post.id}`}
        className="group relative block rounded-2xl overflow-hidden mb-8 transition-transform duration-300 hover:scale-[1.01]"
        style={{
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--card))",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          initial={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          whileHover={{
            boxShadow:
              "0 0 0 1.5px hsl(var(--gold)), 0 0 40px 4px hsl(var(--gold) / 0.18)",
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="grid md:grid-cols-2">
          <div
            className="relative h-56 md:h-72 flex items-center justify-center text-7xl"
            style={{ background: post.gradient }}
          >
            {post.icon}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, hsl(var(--card)) 100%)",
              }}
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: "hsl(var(--gold) / 0.1)",
                  color: "hsl(var(--gold))",
                  border: "1px solid hsl(var(--gold) / 0.35)",
                }}
              >
                Featured
              </span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {post.tag}
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-black leading-tight mb-3"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "hsl(var(--foreground))",
              }}
            >
              {post.title}
            </h2>
            <p
              className="text-sm leading-relaxed mb-6 line-clamp-3"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.read_time} min read
                </span>
                <span>·</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span
                className="flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5"
                style={{ color: "hsl(var(--gold))" }}
              >
                Read article <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
};

const ArticleCard = ({ post, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.94 }}
      transition={{
        duration: 0.38,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link
        to={`/blog/${post.slug || post.id}`}
        className="group flex flex-col h-full rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="relative h-44 flex items-center justify-center text-5xl overflow-hidden"
          style={{ background: post.gradient }}
        >
          <motion.span
            className="text-5xl"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            {post.icon}
          </motion.span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--gold) / 0.08) 0%, transparent 60%)",
            }}
          />
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: "hsl(var(--background) / 0.75)",
                color: "hsl(var(--gold))",
                border: "1px solid hsl(var(--gold) / 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div
            className="flex items-center justify-between mb-3 text-xs"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <span
              className="px-2.5 py-0.5 rounded-full"
              style={{
                background: "hsl(var(--muted))",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {post.tag}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.read_time} min read
            </span>
          </div>
          <h3
            className="text-lg font-bold leading-snug mb-2 group-hover:text-[hsl(var(--gold))] transition-colors duration-200"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "hsl(var(--foreground))",
            }}
          >
            {post.title}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1 mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {post.excerpt}
          </p>
          <div
            className="flex items-center justify-between pt-3 text-xs"
            style={{
              borderTop: "1px solid hsl(var(--border))",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <span>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className="flex items-center gap-1 font-semibold transition-all duration-200 group-hover:gap-2"
              style={{ color: "hsl(var(--gold))" }}
            >
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const NewsletterStrip = () => {
  return (
    <ScrollReveal>
      <div
        className="max-w-3xl mx-auto rounded-2xl px-8 py-10 text-center"
        style={{
          background: "hsl(var(--card) / 0.6)",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(16px)",
        }}
      >
        <BookOpen
          className="mx-auto mb-4"
          size={28}
          style={{ color: "hsl(var(--gold))" }}
        />
        <h3
          className="text-2xl font-black mb-2"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "hsl(var(--foreground))",
          }}
        >
          Get the sharpest insights, monthly.
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          No fluff. No noise. Just actionable strategy for founders who want to
          grow faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 transition-all"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          />
          <button
            className="font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--gold)), hsl(43 90% 55%))",
              color: "hsl(var(--background))",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

/* ───────────────── Blog page ───────────────── */

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dbPosts] = useState([]);
  const [loadingDb] = useState(false);

  useEffect(() => {
    // const fetchPosts = async () => {
    //   try {
    //     const { data } = await supabase
    //       .from("blog_posts")
    //       .select(
    //         "id, title, slug, excerpt, category, tag, icon, gradient, read_time, featured, created_at"
    //       )
    //       .eq("published", true)
    //       .order("created_at", { ascending: false });
    //     if (data) setDbPosts(data);
    //   } catch (e) {
    //     console.error("Error loading Supabase blog posts", e);
    //   } finally {
    //     setLoadingDb(false);
    //   }
    // };
    // fetchPosts();
  }, []);

  const staticPosts = makeStaticBlogPosts();
  const allPosts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const featured = allPosts.find((p) => p.featured) ?? allPosts[0];
  const rest = allPosts.filter((p) => p.id !== featured?.id);
  const filteredRest =
    activeFilter === "All"
      ? rest
      : rest.filter((p) => p.category === activeFilter);
  const showFeatured = activeFilter === "All" && featured;

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--gold) / 0.11) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 0%, hsl(var(--electric-blue) / 0.13) 0%, transparent 65%)",
        }}
      >
        <FloatingShapes variant="minimal" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 relative z-10"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border"
            style={{
              borderColor: "hsl(var(--gold) / 0.5)",
              color: "hsl(var(--gold))",
              background: "hsl(var(--gold) / 0.08)",
            }}
          >
            Insights & Strategy
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-4 relative z-10"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "hsl(var(--foreground))",
          }}
        >
          Ideas that{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--silver)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            compound.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl max-w-lg relative z-10"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Strategy, design, and growth thinking from the team behind Thrive Grit
          — written for founders, not marketers.
        </motion.p>
      </section>

      {/* Divider + Filters */}
      <div
        className="h-px mx-auto max-w-4xl mb-10"
        style={{ background: "hsl(var(--border))" }}
      />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <AnimatePresence>
          {showFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedCard post={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRest.map((post, i) => (
              <ArticleCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRest.length === 0 && !showFeatured && !loadingDb && (
          <p
            className="text-center py-20 text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            No articles in this category yet — check back soon.
          </p>
        )}

        <div
          className="h-px my-20"
          style={{ background: "hsl(var(--border))" }}
        />
        <NewsletterStrip />
      </div>
    </div>
  );
};

export default Blog;
