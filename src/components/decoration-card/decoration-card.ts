import './decoration-card.scss';
import Component from '../abstract-component';

export default class DecorationCard extends Component {
    constructor(public num: string, public count: string, public id: string) {
        super('decoration');
    }

    render(): HTMLElement {
        const p = document.createElement('p');
        p.innerHTML = this.count;
        p.classList.add('decoration-count');
        this.container.append(p);
        for (let i = 1; i <= parseInt(this.count); i++) {
            const image = new Image();
            image.src = `./assets/toys/${this.num}.png`;
            image.classList.add('decoration-image');
            image.setAttribute('id', `${this.id}-${i}`);
            image.draggable = true;
            this.container.append(image);
        }
        return this.container;
    }
}
