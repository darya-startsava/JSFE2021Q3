import template from 'lodash.template';
import SettingsHTML from './settings.html';
import './settings.scss';
import Component from '../abstract-component';
import christmasAudioSingleton from './audio';

export default class Settings extends Component {
    public isMusic: string = localStorage.getItem('StDaTa-isMusic') || 'off';
    public isSnow: string = localStorage.getItem('StDaTa-isSnow') || 'off';
    constructor() {
        super('settings-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsHTML)();
        this.addListenerVolumeButton();
        this.addListenerSnowButton();
        return this.container;
    }

    addListenerVolumeButton() {
        const volumeButton = this.container.querySelector<HTMLElement>('.volume-button');
        if (this.isMusic == 'on') {
            volumeButton.classList.add('settings-button-active');
            christmasAudioSingleton.play();
        }
        volumeButton.addEventListener('click', () => {
            volumeButton.classList.toggle('settings-button-active');
            if (volumeButton.classList.contains('settings-button-active')) {
                this.isMusic = 'on';
                christmasAudioSingleton.play();
            } else {
                this.isMusic = 'off';
                christmasAudioSingleton.pause();
            }
            localStorage.setItem('StDaTa-isMusic', this.isMusic);
        });
    }

    addListenerSnowButton() {
        const snowButton = this.container.querySelector('.snow-button');
        let refreshIntervalId: NodeJS.Timer;
        snowButton.addEventListener('click', () => {
            snowButton.classList.toggle('settings-button-active');
            const treeSection = document.querySelector('.tree-section');
            if (snowButton.classList.contains('settings-button-active')) {
                this.isSnow = 'on';
                refreshIntervalId = setInterval(createSnowFlake, 50);
            } else {
                this.isSnow = 'off';
                clearInterval(refreshIntervalId);
                const snowFlakes = document.querySelectorAll('.snowflake');
                snowFlakes.forEach((item) => item.remove());
            }
            localStorage.setItem('StDaTa-isSnow', this.isSnow);
            function createSnowFlake() {
                const treeSectionRect = treeSection.getBoundingClientRect();
                const snowFlake = document.createElement('i');
                snowFlake.classList.add('snowflake');
                snowFlake.style.left = treeSectionRect.left + Math.random() * treeSectionRect.width + 'px';
                snowFlake.style.animationDuration = Math.random() * 3 + 5 + 's'; // between 2 - 5 seconds
                snowFlake.style.opacity = Math.random().toString();
                snowFlake.style.backgroundSize = Math.random() * 10 + 10 + 'px';

                treeSection.appendChild(snowFlake);

                setTimeout(() => {
                    snowFlake.remove();
                }, 5000);
            }
        });
    }
}
