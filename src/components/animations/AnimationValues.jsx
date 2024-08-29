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
  showWithoutIndex: {
    opacity: 1,
    //   y: 0,
    x: 0,
    transition: {
      duration: 1,
    },
  },

  hiddenSubtle: {
    opacity: 0,
    x: -20,
  },
};

const zIndexAnimations = {
  zIndexAnimation: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
};

function AnimationValues() {}
export default AnimationValues;
export { downToUp, leftToRight, zIndexAnimations };
