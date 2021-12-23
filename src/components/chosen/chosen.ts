export const chosenArray: string[] = JSON.parse(localStorage.getItem('StDaTa-chosenArray')) || [];
export const chosen = document.querySelector<HTMLLIElement>('.chosen');
