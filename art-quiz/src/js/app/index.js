import Settings from "./settings.js";


class App {
    constructor() {
        this.settings = Settings;
        this.categories = [];
    }
    buildState() { }
}

export default new App();