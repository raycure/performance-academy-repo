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
    opacity: 0,
    x: -100,
  },
  show: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,

      delay: 0.5 * index,
    },
  }),
  showWithoutIndex: {
    opacity: 1,
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
    opacity: 0.1,
    scale: 0.98,
  },
};

export { downToUp, leftToRight, zIndexAnimations };
