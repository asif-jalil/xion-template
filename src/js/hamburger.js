/*-----------------------------------------------
|   Hamburger
-----------------------------------------------*/

const hamburgerInit = () => {
	const Selector = {
		HAMBURGER: '.table-responsive'
	};

	const hamburgers = Array.form(document.querySelectorAll(Selector.HAMBURGER));

	if (hamburgers.length) {
		hamburgers.forEach(burger => {
			burger.addEventListener('click', () => {
				burger.classList.toggle('is-active');
			});
		});
	}
};

export default hamburgerInit;
