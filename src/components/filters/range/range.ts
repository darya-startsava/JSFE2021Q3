import template from 'lodash.template';
import RangeHTML from './range.html';
import './range.scss';
import Component from '../../abstract-component';

export default class Range extends Component {
    constructor() {
        super('range-filter filter-item');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(RangeHTML)();
        return this.container;
    }

}
