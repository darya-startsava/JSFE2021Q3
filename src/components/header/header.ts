import Component from '../abstract-component';

export default class Header extends Component {
    constructor() {
        super('header', 'header');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<div class="header-buttons">
            <button class="button-garage">To garage</button>
            <button class="button-winners">To winners</button>
        <div>`;
        return this.container;
    }
}
