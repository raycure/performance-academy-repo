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

const upToDown = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.1 * index,
    },
  }),
};

const leftToRight = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,

      delay: 0.35 * index,
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

const ScalingAnimations = {
  getBigger: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
};

export { downToUp, leftToRight, ScalingAnimations, upToDown };
