import TreePage from './tree-page/tree-page';
import Settings from './settings/settings';
import SettingsTree from './settings-tree/settings-tree';
import SettingsBackground from './settings-background/settings-background';
import SettingsGarland from './settings-garland/settings-garland';
import TreeDecorations from './tree-decorations/tree-decorations';

export function bootstrap() {
    const treePage = new TreePage();
    const settings = new Settings();
    const settingsTree = new SettingsTree();
    const settingsBackground = new SettingsBackground();
    const settingsGarland = new SettingsGarland();
    const treeDecorations = new TreeDecorations();

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

    function renderChosenToysSection() {
        const chosenToysSection = document.querySelector('.chosen-toys-section');
        chosenToysSection.append(treeDecorations.render());
    }

    renderMain();
    renderSettingsSection();
    renderChosenToysSection();
}
