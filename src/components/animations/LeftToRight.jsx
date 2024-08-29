import React from "react";
import { motion } from "framer-motion";
const downToUp = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  show: (index) => ({
    opacity: 1,
    y: 0,
    // x: 0,
    transition: {
      duration: 1,
      delay: 0.5 * index,
    },
  }),
};

const leftToRight = {
  hidden: {
    //   y: 100,
    opacity: 0,
    x: -100,
  },
  show: (index) => ({
    opacity: 1,
    //   y: 0,
    x: 0,
    transition: {
      duration: 1,

      delay: 0.5 * index,
    },
  }),
};
function LeftToRight() {}
export default LeftToRight;
export { downToUp, leftToRight };
