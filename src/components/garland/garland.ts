import './garland.scss';
import Component from '../abstract-component';

const NUMBER_GARLAND_ROWS = 8;

export default class Garland extends Component {
    constructor() {
        super('garland-light-wrapper');
    }

    render(): HTMLElement {
        let DISTANCE = 50;
        let ROW_WIDTH = 20;
        for (let k = 1; k <= NUMBER_GARLAND_ROWS; k++) {
            const ul = document.createElement('ul');
            ul.classList.add('garland-line');
            ul.style.width = `${ROW_WIDTH}%`;
            this.container.append(ul);
            let ANGLE = 65;
            const NUMBER_BULB_IN_ROW = 6 + k * 2;
            for (let i = 1; i <= NUMBER_BULB_IN_ROW; i++) {
                const li = document.createElement('li');
                li.classList.add('garland-bulb');
                li.classList.add('default');
                ul.append(li);
                li.style.transform = `rotate(${ANGLE}deg) translate(${DISTANCE}px)`;
                ANGLE += 10 - k * 0.8;
            }
            DISTANCE += 60;
            ROW_WIDTH += 7;
        }
        return this.container;
    }
}
