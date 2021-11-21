class Question {
    constructor() {
        this.title = null;
        this.type = null;
        this.imageNum = null;
        this.options = [];
        this.author = null;
        this.name = null;
        this.year = null;
        this.status = null;
        this.loadStatus();
    }
    setStatus(status) {
        // set value to local storage
        this.status = status;
    }

    loadStatus() {
        // get value from local storage
        // this.status = value
    }
}

export default Question;
