import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function renderPageSections(): void {
    const header = new Header();
    const footer = new Footer();
    const body = document.querySelector('body');
    if (body) {
        body.append(header.render());
        body.append(document.createElement('main'));
        body.append(footer.render());
    }
}
