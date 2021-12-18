/*-----------------------------------------------
|   Hamburger
-----------------------------------------------*/

const hamburgerInit = () => {
	const Selector = {
		HAMBURGER: '.hamburger'
	};

	const hamburgers = Array.from(document.querySelectorAll(Selector.HAMBURGER));

	if (hamburgers.length) {
		hamburgers.forEach(burger => {
			document.addEventListener('click', () => {
				burger.classList.toggle('is-active');
			});
		});
	}
};

export default hamburgerInit;
