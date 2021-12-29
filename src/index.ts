import './global.scss';
import { bootstrap as bootstrapStart } from './components/appStart';
import { bootstrap as bootstrapToys } from './components/appToys';
import { bootstrap as bootstrapTree } from './components/appTree';
import './self-assessment';

bootstrapStart();

const headerButtons = document.querySelectorAll('.header-button');
headerButtons.forEach((item) =>
    item.addEventListener('click', (event) => {
        headerButtons.forEach((item) => item.classList.remove('active'));
        const target = event.target as HTMLElement;
        target.classList.add('active');
        if (target.id === 'toys') {
            bootstrapToys();
        } else if (target.id === 'tree') {
            bootstrapTree();
        } else bootstrapStart();
    })
);
