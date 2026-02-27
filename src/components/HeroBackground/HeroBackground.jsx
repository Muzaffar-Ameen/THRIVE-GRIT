// src/components/HeroBackground/HeroBackground.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Code lines that get "typed" in the background */
const codeLines = [
  { text: 'const brand = new ThrivGrit();', color: "text-blue-400" },
  { text: 'brand.setStrategy("growth");', color: "text-cyan-300" },
  { text: 'brand.design({ ui: "premium" });', color: "text-purple-400" },
  { text: 'brand.develop({ stack: "React" });', color: "text-green-400" },
  { text: "brand.optimizeSEO({ rank: 1 });", color: "text-yellow-300" },
  { text: "const result = await brand.launch();", color: "text-pink-400" },
  { text: "", color: "" },
  { text: "// Running build pipeline...", color: "text-muted-foreground" },
  { text: "> Compiling assets ✓", color: "text-green-400" },
  { text: "> Optimizing performance ✓", color: "text-green-400" },
  { text: "> Deploying to production ✓", color: "text-green-400" },
  { text: "", color: "" },
  { text: "console.log(result.output);", color: "text-cyan-300" },
];

const outputText = "Grow Fast";

/* Typing a single line character-by-character */
const TypingLine = ({ line, onDone, speed = 35 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!line.text) {
      const t = setTimeout(onDone, 200);
      return () => clearTimeout(t);
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(timer);
        setTimeout(onDone, 80);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [line.text, onDone, speed]);

  if (!line.text) return <div className="h-5" />;

  return (
    <div className={`font-mono text-xs sm:text-sm ${line.color} whitespace-pre`}>
      {displayed}
      {displayed.length < line.text.length && (
        <span className="animate-pulse text-accent">▌</span>
      )}
    </div>
  );
};

/* The shining "Grow Fast" output */
const GrowFastOutput = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    className="mt-4 flex flex-col items-start"
  >
    <div className="text-xs text-muted-foreground font-mono mb-2 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      Output:
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      {/* Silver shining layer */}
      <span className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-silver opacity-60 blur-[2px] select-none pointer-events-none">
        {outputText}
      </span>
      {/* Gold shining layer */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.5 }}
        className="relative text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-gold"
        style={{
          filter:
            "drop-shadow(0 0 20px hsla(43, 96%, 56%, 0.5)) drop-shadow(0 0 40px hsla(43, 96%, 56%, 0.3))",
        }}
      >
        {outputText}
      </motion.span>
    </motion.div>
    {/* Radial glow underneath */}
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ delay: 0.8, duration: 1.5 }}
      className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-60 h-20 rounded-full bg-accent/20 blur-3xl pointer-events-none"
    />
  </motion.div>
);

/* Main HeroBackground */
const HeroBackground = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef(null);

  const handleLineDone = useCallback(() => {
    if (currentLine < codeLines.length - 1) {
      setCompletedLines((prev) => [...prev, codeLines[currentLine]]);
      setCurrentLine((prev) => prev + 1);
    } else {
      setCompletedLines((prev) => [...prev, codeLines[currentLine]]);
      setShowOutput(true);
      // Restart cycle after a pause
      setTimeout(() => {
        setCurrentLine(0);
        setCompletedLines([]);
        setShowOutput(false);
        setCycle((c) => c + 1);
      }, 6000);
    }
  }, [currentLine]);

  // Auto-scroll the code container
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [completedLines, currentLine]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      {/* Floating decorative orbs (you need .orb class in CSS) */}
      <div className="orb w-96 h-96 bg-primary/10 top-10 -left-48" />
      <div
        className="orb w-72 h-72 bg-accent/8 bottom-20 -right-36"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="orb w-64 h-64 bg-primary/5 top-1/2 left-1/3"
        style={{ animationDelay: "7s" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsla(217,91%,60%,0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsla(217,91%,60%,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Code Terminal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[90%] max-w-2xl mx-auto">
          {/* Terminal window chrome */}
          <div className="rounded-2xl overflow-hidden glass-card border border-border/30 shadow-2xl opacity-30 hover:opacity-50 transition-opacity duration-1000">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-secondary/30">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">
                thrivegrit — build.ts
              </span>
            </div>

            {/* Code area */}
            <div
              ref={scrollRef}
              className="p-5 sm:p-6 min-h-[280px] max-h-[360px] overflow-y-auto space-y-1 relative"
              key={cycle}
            >
              {/* Line numbers + completed lines */}
              {completedLines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-xs font-mono text-muted-foreground/30 select-none w-5 text-right shrink-0">
                    {i + 1}
                  </span>
                  {line.text ? (
                    <span
                      className={`font-mono text-xs sm:text-sm ${line.color} whitespace-pre`}
                    >
                      {line.text}
                    </span>
                  ) : (
                    <div className="h-5" />
                  )}
                </div>
              ))}

              {/* Currently typing line */}
              {!showOutput && currentLine < codeLines.length && (
                <div className="flex gap-4">
                  <span className="text-xs font-mono text-muted-foreground/30 select-none w-5 text-right shrink-0">
                    {completedLines.length + 1}
                  </span>
                  <TypingLine line={codeLines[currentLine]} onDone={handleLineDone} />
                </div>
              )}

              {/* "Grow Fast" output */}
              <AnimatePresence>
                {showOutput && <GrowFastOutput />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top / bottom gradient fades */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
