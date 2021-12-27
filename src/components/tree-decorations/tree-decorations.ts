import template from 'lodash.template';
import TreeDecorationsHTML from './tree-decorations.html';
import './tree-decorations.scss';
import Component from '../abstract-component';

export default class TreeDecorations extends Component {
    constructor() {
        super('tree-decorations');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(TreeDecorationsHTML)();
        return this.container;
    }
}
