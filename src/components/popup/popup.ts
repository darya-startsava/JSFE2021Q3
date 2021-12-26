import template from 'lodash.template';
import PopupHTML from './popup.html';
import Component from '../abstract-component';
import './popup.scss';

export default class Popup extends Component {
    container: HTMLElement;

    constructor(public message: string) {
        
        super('popup-wrapper');
        this.message = message;
    }

    render(): HTMLElement {
        this.container.innerHTML = template(PopupHTML)({message: this.message});
        this.addListener();
        return this.container;
    }

    addListener() {
        const closeButton = this.container.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            this.container.classList.remove('popup-active');
        });
    }

    showPopup() {
        this.container.classList.add('popup-active');
    }
}
