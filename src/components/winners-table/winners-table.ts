import WinnersTableHTML from './winners-table.html';
import Component from '../abstract-component';
import './winners-table.scss';

export default class Winners extends Component {
    constructor() {
        super('table', 'winners-table');
    }
    render(): HTMLElement {
        this.container.innerHTML = WinnersTableHTML;
        return this.container;
    }
}
