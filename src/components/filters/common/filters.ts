import template from 'lodash.template';
import FiltersHTML from './filters.html';
import './filters.scss';
import Component from '../../abstract-component';

export default class Filters extends Component {
    constructor() {
        super('filter-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(FiltersHTML)();
        return this.container;
    }

}
