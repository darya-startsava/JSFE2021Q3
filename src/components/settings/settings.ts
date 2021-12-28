import template from 'lodash.template';
import SettingsHTML from './settings.html';
import './settings.scss';
import Component from '../abstract-component';

export default class Settings extends Component {
    constructor() {
        super('settings-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsHTML)();
        this.addListener();
        return this.container;
    }

    addListener() {
        const snowButton = this.container.querySelector('.snow-button');
        let refreshIntervalId: NodeJS.Timer;
        snowButton.addEventListener('click', () => {
            snowButton.classList.toggle('settings-button-active');
            const treeSection = document.querySelector('.tree-section');
            if (snowButton.classList.contains('settings-button-active')) {
                refreshIntervalId = setInterval(createSnowFlake, 50);
            } else {
                clearInterval(refreshIntervalId);
                const snowFlakes = document.querySelectorAll('.snowflake');
                snowFlakes.forEach((item) => item.remove());
            }
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
