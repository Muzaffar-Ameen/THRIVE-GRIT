// src/components/TestimonialsSection/TestimonialsSection.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import "./TestimonialsSection.css";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    company: "NovaPay",
    quote:
      "Thrive Grit transformed our entire digital presence. Our conversion rate tripled within 3 months of launch. They don't just build websites — they build growth engines.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Wright",
    role: "Co-Founder",
    company: "Verdant Botanics",
    quote:
      "From branding to Shopify build to SEO — they handled everything with precision. Our organic traffic grew 280% in the first quarter. Absolute game changers.",
    rating: 5,
    avatar: "MW",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Marketing",
    company: "Atlas Freight",
    quote:
      "The team understood our complex logistics needs and delivered an elegant solution. The platform reduced our onboarding time by 60%. Couldn't recommend them more.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "James Okafor",
    role: "Founder",
    company: "Pulse Fitness",
    quote:
      "Working with Thrive Grit was a turning point. Their strategy-first approach meant every design decision had purpose. Our member signups increased 4x.",
    rating: 5,
    avatar: "JO",
  },
  {
    name: "Ava Lindström",
    role: "Creative Director",
    company: "Nordic Studio",
    quote:
      "They brought a level of craft I've rarely seen. The attention to detail in both design and code was exceptional. Our clients constantly compliment the new site.",
    rating: 5,
    avatar: "AL",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="orb w-80 h-20 bg-accent/8 -top-20 -left-20"
        style={{ animationDelay: "2s" }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-16 text-white">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto relative">
          {/* Quote icon */}
          <Quote className="absolute -top-4 -left-2 w-16 h-16 text-yellow-500/20 rotate-180" />

          {/* Carousel */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="w-full"
              >
                {/* ACTIVE CARD HIGHLIGHT */}
                <div className="testimonial-card glass-card glass-card-hover rounded-2xl p-8 sm:p-10 text-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-yellow-400 flex items-center justify-center mx-auto mb-6">
                    <span className="text-lg font-display font-bold text-yellow-400">
                      {t.avatar}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-5">
                    <StarRating rating={t.rating} />
                  </div>

                  {/* Quote */}
                  <p className="text-white text-base sm:text-lg leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-display font-semibold text-yellow-400">
                      {t.name}
                    </p>
                    <p className="text-sm text-white">
                      {t.role} · <span className="text-yellow-400">{t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-yellow-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`testimonial-dot w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-yellow-400 w-6"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-yellow-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
