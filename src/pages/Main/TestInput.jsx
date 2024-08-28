import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 2,
    },
  },
};
function TestInput() {
  const emoji = "🎉";
  return (
    <motion.div
      className="cardddd-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="cardddd" variants={cardVariants}>
        {emoji}
      </motion.div>
    </motion.div>
  );
}

export default TestInput;
