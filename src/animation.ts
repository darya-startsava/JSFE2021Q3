import store from './store';

export default function animation(id: number, time: number): void {
    const carObjects = document.querySelectorAll<HTMLElement>('.svgObject');
    const width = document.querySelector<HTMLElement>('.car-race')?.offsetWidth;
    let path: number;
    if (width) {
        path = width - 70 - 130;
    }
    for (let i = 0; i < carObjects.length; i++) {
        if (Number(carObjects[i].dataset.id) === id) {
            carObjects[i].style.left = '70px';
            let count;
            const endTime = Date.now() + time * 1000;
            const refreshIntervalId = setInterval(() => {
                count = path * (1 - (endTime - Date.now()) / time / 1000);
                carObjects[i].style.left = ` ${70 + count}px`;
                if (Date.now() >= endTime) {
                    carObjects[i].style.left = 'calc(100% - 130px)';
                    clearInterval(refreshIntervalId);
                }
                if (store.falseArray.includes(id)) {
                    clearInterval(refreshIntervalId);
                }
                if (store.resetArray.includes(id)) {
                    store.resetArray.splice(store.resetArray.indexOf(id), 1);
                    carObjects[i].style.left = '70px';
                    clearInterval(refreshIntervalId);
                }
            }, 50);
        }
    }
}
