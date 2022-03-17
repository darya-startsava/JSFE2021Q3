import UIStorage from './storages/UI-storage';

const INDENT_LEFT_NUMBER = 70;
const INDENT_RIGHT_NUMBER = 130;
const INDENT_LEFT = `${INDENT_LEFT_NUMBER}px`;
const INDENT_RIGHT = `${INDENT_RIGHT_NUMBER}px`;
const DELAY = 40;

export default function animation(id: number, time: number): void {
    const carObjects = document.querySelectorAll<HTMLElement>('.svgObject');
    const width = document.querySelector<HTMLElement>('.car-race')?.offsetWidth;
    let path: number;
    if (width) {
        path = width - INDENT_LEFT_NUMBER - INDENT_RIGHT_NUMBER;
    }
    for (let i = 0; i < carObjects.length; i++) {
        if (Number(carObjects[i].dataset.id) === id) {
            carObjects[i].style.left = INDENT_LEFT;
            let count;
            const endTime = Date.now() + time * 1000;
            const refreshIntervalId = setInterval(() => {
                count = path * (1 - (endTime - Date.now()) / time / 1000);
                carObjects[i].style.left = ` ${INDENT_LEFT_NUMBER + count}px`;
                if (Date.now() >= endTime) {
                    carObjects[i].style.left = `calc(100% - ${INDENT_RIGHT})`;
                    clearInterval(refreshIntervalId);
                }
                if (UIStorage.falseArray.includes(id)) {
                    clearInterval(refreshIntervalId);
                }
                if (UIStorage.resetArray.includes(id)) {
                    UIStorage.resetArray.splice(UIStorage.resetArray.indexOf(id), 1);
                    carObjects[i].style.left = INDENT_LEFT;
                    clearInterval(refreshIntervalId);
                }
                if (UIStorage.stoppedArray.includes(id)) {
                    UIStorage.stoppedArray.splice(UIStorage.stoppedArray.indexOf(id), 1);
                    carObjects[i].style.left = INDENT_LEFT;
                    clearInterval(refreshIntervalId);
                }
            }, DELAY);
        }
    }
}
