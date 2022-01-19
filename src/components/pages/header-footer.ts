import Header from './header/header';
import Footer from './footer/footer';

export default function renderHeaderFooter(): void {
    const header = new Header();
    const footer = new Footer();
    const body = document.querySelector('body');
    if (body) {
        body.prepend(header.render());
        body.append(document.createElement('main'));
        body.insertAdjacentElement('beforeend', footer.render());
    }
}
