import './decoration-card.scss';
import Component from '../abstract-component';

export default class DecorationCard extends Component {
    constructor(public num: string, public count: string) {
        super('decoration');
    }

    render(): HTMLElement {
        const image = new Image();
        image.src = `./assets/toys/${this.num}.png`;
        image.classList.add('decoration-image');
        const p = document.createElement('p');
        p.innerHTML = this.count;
        p.classList.add('decoration-count');
        this.container.append(p);
        this.container.append(image);
        return this.container;
    }
}
