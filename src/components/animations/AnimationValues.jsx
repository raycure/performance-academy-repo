import { color } from 'framer-motion';

const downToUp = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	show: (index) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: 0.5 * index,
		},
	}),
};

const appearSlower = {
	hidden: {
		opacity: 0,
	},
	show: (index) => ({
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0.3 * index,
			// delay: 0.2,
		},
	}),
};
const descending = {
	hidden: {
		opacity: 0,
		y: -20,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const appear = {
	hidden: {
		opacity: 0,
	},
	show: (index) => ({
		opacity: 1,
		transition: {
			duration: 1,
		},
	}),
};

const accordion = {
	initial: {
		height: 0,
		opacity: 0,
	},
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			duration: 0.7,
		},
	},
};

const leftToRight = {
	hidden: {
		opacity: 0,
		x: -70,
	},
	show: (index) => {
		//console.log(`Animating element ${index}`);
		return {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.7,
				delay: index * 0.2,
			},
		};
	},
};

const leftToRightForClasses = {
	hidden: {
		opacity: 0,
		x: -70,
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			delayChildren: 0.5,
		},
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

const button = {
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

const socialSlide = {
	initial: {
		opacity: 1,
	},
	animate: {
		x: '2.5rem',
		transition: {
			duration: 0.2,
		},
	},
};
const backgroundFill = {
	initial: {
		width: 0,
		height: 0,
		top: '50%',
		left: '50%',
	},
	animate: {
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		transition: {
			duration: 0.2,
		},
	},
};

const rightToLeft = {
	initial: (windowWidth) => {
		return {
			opacity: 1,
			x: windowWidth <= 570 ? '100%' : windowWidth * 0.7,
		};
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
		},
	},
};
const upwardFill = {
	initial: { opacity: 1 },
	animate: {
		height: '100%',
		transition: {
			duration: 0.5,
		},
	},
};

export {
	downToUp,
	leftToRight,
	ScalingAnimations,
	appear,
	accordion,
	appearSlower,
	button,
	leftToRightForClasses,
	socialSlide,
	backgroundFill,
	descending,
	rightToLeft,
	upwardFill,
};
