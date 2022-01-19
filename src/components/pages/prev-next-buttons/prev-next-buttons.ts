import Component from '../../abstract-component';

export default class PrevNextButtons extends Component {
    constructor() {
        super('div', 'prev-next-buttons');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<button class="button-prev">Prev page</button>
        <button class="button-next">Next page</button>`;
        return this.container;
    }
}
