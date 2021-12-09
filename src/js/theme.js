import { docReady } from './utils';
import detectorInit from './detector';
import tooltipInit from './tooltip';
import popoverInit from './popover';
import toastInit from './toast';
import progressAnimationToggle from './progress';
import glightboxInit from './glightbox';
import plyrInit from './plyr';
import initMap from './googleMap';
import countupInit from './countup';
import copyLink from './copy-link';
import typedTextInit from './typed';
import navbarDarkenOnScroll from './navbar-darken-on-scroll';
import scrollToTop from './scroll-to-top';
import swiperInit from './swiper';
import cookieNoticeInit from './cookie-notice';
import dropdownOnHover from './dropdown-on-hover';
import scrollbarInit from './scrollbar';
import dropdownMenuInit from './dropdown-menu';

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(detectorInit);

docReady(tooltipInit);
docReady(popoverInit);
docReady(toastInit);
docReady(progressAnimationToggle);
docReady(glightboxInit);
docReady(plyrInit);
docReady(initMap);

docReady(countupInit);
docReady(copyLink);
docReady(navbarDarkenOnScroll);
docReady(typedTextInit);
docReady(scrollToTop);

docReady(swiperInit);

docReady(cookieNoticeInit);
docReady(dropdownOnHover);

docReady(scrollbarInit);

docReady(dropdownMenuInit);
