const DEFAULT_VOLUME = 0.1;
const DEFAULT_TIME = 20;

class Settings {
    constructor() {
        this.isVolume = localStorage.getItem('isVolume') || 'false';
        this.volume = localStorage.getItem('volume') || DEFAULT_VOLUME;
        this.isTime = localStorage.getItem('isTime') || 'false';
        this.time = localStorage.getItem('time') || DEFAULT_TIME;
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
