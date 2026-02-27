// src/components/TypingHeading/TypingHeading.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./TypingHeading.css";

const segments = [
  { text: "Design. Code.", className: "" },
  { text: "\n", newLine: true }, // real newline
  { text: "Rank.", className: "text-gradient-gold" },
  { text: " " },
  { text: "Repeat.", className: "text-gradient-blue" },
];

const TypingHeading = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const fullText = segments
    .map((s) => (s.newLine ? "\n" : s.text))
    .join("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [fullText]);

  const renderSegments = () => {
    let charIndex = 0;
    return segments.map((seg, si) => {
      if (seg.newLine) {
        if (charIndex < displayed.length) {
          charIndex++;
          return <br key={si} />;
        }
        return null;
      }
      const segText = seg.text;
      const start = charIndex;
      const end = Math.min(start + segText.length, displayed.length);
      charIndex += segText.length;
      if (start >= displayed.length) return null;
      const visibleText = segText.slice(0, end - start);
      return (
        <span key={si} className={seg.className}>
          {visibleText}
        </span>
      );
    });
  };

  return (
    <motion.h1
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      className="mysegments text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-100 mx-auto"
    >
      {renderSegments()}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-accent"
        >
          |
        </motion.span>
      )}
    </motion.h1>
  );
};

export default TypingHeading;
