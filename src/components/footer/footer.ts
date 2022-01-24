import './footer.scss';
import Component from '../abstract-component';

export default class Footer extends Component {
    constructor() {
        super('footer', 'footer');
    }

    render(): HTMLElement {
        this.container.innerHTML = `<a href="https://github.com/darya-startsava" class="github-link">@darya-startsava</a>
        <time datetime="2022">2022</time>
        <a href="https://rs.school/js/" class="logo-rs-school"></a>`;
        return this.container;
    }
}
