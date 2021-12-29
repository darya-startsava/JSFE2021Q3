import './garland.scss';
import Component from '../abstract-component';

export default class Garland extends Component {
    constructor() {
        super('garland-light-wrapper');
    }

    render(): HTMLElement {
        let l = 0;
        let m = 0;
        for (let k = 1; k <= 8; k++) {
            const ul = document.createElement('ul');
            ul.classList.add('garland-line');
            ul.style.width = `${20 + m}%`;
            this.container.append(ul);
            let j = 0;
            for (let i = 1; i <= 6 + k * 2; i++) {
                const li = document.createElement('li');
                li.classList.add('garland-bulb');
                ul.append(li);
                li.style.transform = `rotate(${65 + j}deg) translate(${50 + l}px)`;
                j += 10 - k * 0.8;
            }
            l += 60;
            m += 7;
        }
        return this.container;
    }
}
