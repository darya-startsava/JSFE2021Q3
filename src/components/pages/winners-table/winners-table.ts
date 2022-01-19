import Component from '../../abstract-component';
import './winners-table.scss';

export default class Winners extends Component {
    constructor() {
        super('table', 'winners-table');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th>Wins</th>
        <th>Best time (seconds)</th>
    </tr>
    <tr>
        <td class="column-number">1</td>
        <td class="column-car"></td>
        <td class="column-name">Tesla</td>
        <td class="column-wins">3</td>
        <td class="column-best-time">10.25</td>
    </tr>
    <tr>`;
        return this.container;
    }
}
