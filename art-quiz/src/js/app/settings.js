class Settings {
    constructor() {
        this.isVolume = localStorage.getItem('isVolume') || 'false';
        this.volume = localStorage.getItem('volume') || 0.1;
        this.isTime = localStorage.getItem('isTime') || 'false';
        this.time = localStorage.getItem('time') || 20;
    }
    setIsVolume() {
        localStorage.setItem('isVolume', this.isVolume);
    }
    setVolume() {
        localStorage.setItem('volume', this.volume);
    }
    setIsTime() {
        localStorage.setItem('isTime', this.isTime);
    }
    setTime() {
        localStorage.setItem('time', this.time);
    }
}

export default new Settings();
