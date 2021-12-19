import utils from './utils';

function inertiaInit() {
	const Selector = {
		DATA_INERTIA: '[data-inertia]'
	};
	const DATA_KEY = {
		INERTIA: 'inertia'
	};
	const Events = {
		SCROLL: 'scroll',
		RESIZE: 'resize'
	};

	const inertiaEls = document.querySelectorAll(Selector.DATA_INERTIA);

	inertiaEls.forEach(el => {
		const options = utils.getData(el, DATA_KEY.INERTIA);
		const offsetTop = el.getBoundingClientRect().top;
		const winHeight = window.innerHeight;
		let currentPosition = window.pageYOffset;
		let y = 0;
		let previousPosition = 0;

		const controller = {
			weight: 2,
			duration: 0.7,
			ease: 'Power3.easeOut'
		};

		Object.assign(controller, options);
		// eslint-disable-next-line no-param-reassign
		el.style.transform = `translateY(${((el.getBoundingClientRect().top - window.pageYOffset) * 100) / winHeight}px);`;

		const inertiaEffect = () => {
			currentPosition = window.pageYOffset;
			y = (controller.weight * (offsetTop - currentPosition) * 100) / winHeight;

			currentPosition === previousPosition || window.gsap.to(el, { duration: controller.duration, y, ease: controller.ease });

			previousPosition = currentPosition;
		};

		window.addEventListener(Events.SCROLL, inertiaEffect);
		window.addEventListener(Events.RESIZE, inertiaEffect);
	});
}

export default inertiaInit;
