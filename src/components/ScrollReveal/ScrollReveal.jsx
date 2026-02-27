import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directionVariants = {
  up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const dir = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial={{
        ...dir.hidden,
        ...(scale ? { scale: 0.92 } : {}),
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? {
              ...dir.visible,
              ...(scale ? { scale: 1 } : {}),
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
