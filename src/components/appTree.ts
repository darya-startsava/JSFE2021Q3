import TreePage from './tree-page/tree-page';
import Settings from './settings/settings';
import SettingsTree from './settings-tree/settings-tree';
import SettingsBackground from './settings-background/settings-background';
import SettingsGarland from './settings-garland/settings-garland';
import TreeDecorations from './tree-decorations/tree-decorations';
import readData from './service';
import DecorationCard from './decoration-card/decoration-card';
import dragNDrop from './drag-n-drop/drag-n-drop';

export function bootstrap() {

    const decorationImages = document?.querySelectorAll<HTMLElement>('.decoration-image');
    if (decorationImages) {
        decorationImages.forEach((item) => {
            if (item.dataset.onTree === 'true') {
                item.style.opacity = '1';
            }
        });
    }

    const treePage = new TreePage();
    const settings = new Settings();
    const settingsTree = new SettingsTree();
    const settingsBackground = new SettingsBackground();
    const settingsGarland = new SettingsGarland();

    function renderMain() {
        treePage.render();
    }

    function renderSettingsSection() {
        const settingSection = document.querySelector('.settings-section');
        settingSection.append(settings.render());
        settingSection.append(settingsTree.render());
        settingSection.append(settingsBackground.render());
        settingSection.append(settingsGarland.render());
    }

    async function renderChosenToysSection() {
        const chosenToysSection = document.querySelector('.chosen-toys-section');
        const treeDecorations = new TreeDecorations();
        chosenToysSection.append(treeDecorations.render());
        const decorationsWrapper = document.querySelector('.decorations-wrapper');
        const data = await readData();
        const toysNum = JSON.parse(localStorage.getItem('StDaTa-chosenArray'));
        if (toysNum && toysNum.length !== 0) {
            for (let j = 0; j < toysNum.length; j++) {
                const decorationCard = new DecorationCard(
                    data[toysNum[j] - 1].num,
                    data[toysNum[j] - 1].count,
                    (j + 1).toString()
                );
                decorationsWrapper.append(decorationCard.render());
            }
        } else {
            for (let j = 0; j < 20; j++) {
                const decorationCard = new DecorationCard(data[j].num, data[j].count, (j + 1).toString());
                decorationsWrapper.append(decorationCard.render());
            }
        }
        dragNDrop();
    }

    renderMain();
    renderSettingsSection();
    renderChosenToysSection();
}
