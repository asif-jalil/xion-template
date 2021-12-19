/*-----------------------------------------------
|   Hamburger
-----------------------------------------------*/

const hamburgerInit = () => {
	const Selector = {
		HAMBURGER: '.hamburger',
		NAVBAR_COLLAPSE: '#primaryNavbarCollapse'
	};

	const hamburger = document.querySelector(Selector.HAMBURGER);
	const navbarCollapse = document.querySelector(Selector.NAVBAR_COLLAPSE);

	navbarCollapse.addEventListener('show.bs.collapse', () => {
		hamburger.classList.add('is-active');
	});

	navbarCollapse.addEventListener('hide.bs.collapse', () => {
		hamburger.classList.remove('is-active');
	});
};

export default hamburgerInit;
