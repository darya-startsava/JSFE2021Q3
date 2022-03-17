import './global.scss';
import './buttons.scss';
import renderGaragePage from './pages/garage';
import renderPageSection from './pages/utils';
import { locationHashChanged } from './router';

renderPageSection();
renderGaragePage();

window.onhashchange = locationHashChanged;
window.onload = locationHashChanged;
