const shakeEffect = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5, // Adjust to taste
      ease: "easeInOut", // Easing for smoother movement
    },
  },
  still: { x: 0 },
};

export default shakeEffect;
