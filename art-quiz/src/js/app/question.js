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
        // this.loadStatus();
    }
    setStatus(status) {
        // set value to local storage
        let statusArr;
        if (!localStorage.getItem('statusArr')) {
            statusArr = ['no answers'];
            localStorage.setItem('statusArr', JSON.stringify(statusArr));
        }
        this.status = status;
        statusArr = JSON.parse(localStorage.getItem('statusArr'));
        statusArr[this.imageNum] = this.status;
        localStorage.setItem('statusArr', JSON.stringify(statusArr));
    }

    loadStatus() {
        let statusArr;
        if (!localStorage.getItem('statusArr')) {
            statusArr = [];
            localStorage.setItem('statusArr', JSON.stringify(statusArr));
        }
        this.status = JSON.parse(localStorage.getItem('statusArr'))[this.imageNum];
    }
}

export default Question;
