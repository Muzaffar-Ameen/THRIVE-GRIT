import { motion } from "framer-motion";

const MagneticButton = ({
  children,
  className = "",
  hoverScale = 1.05,
  glowColor, // not used yet, but kept for API compatibility
}) => {
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

export default MagneticButton;
