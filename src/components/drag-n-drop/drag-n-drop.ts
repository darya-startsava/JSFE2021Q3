export default function dragNDrop() {
    const decorationItems = document.querySelectorAll<HTMLElement>('.decoration-image');
    const decorations = document.querySelectorAll<HTMLElement>('.decoration');
    const decorationsCount = document.querySelectorAll<HTMLElement>('.decoration-count');
    decorationItems.forEach((decorationItem) => {
        decorationItem.ondragstart = function () {
            return false;
        };
        decorationItem.onmousedown = function (event: MouseEvent) {
            let elemBelow: Element | null;

            decorationItem.style.position = 'absolute';
            decorationItem.style.zIndex = '1000';

            document.body.append(decorationItem);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX: number, pageY: number) {
                decorationItem.style.left = pageX - decorationItem.offsetWidth / 2 + 'px';
                decorationItem.style.top = pageY - decorationItem.offsetHeight / 2 + 'px';
            }

            function back() {
                decorationItem.style.zIndex = '1';
                decorations.forEach((decoration) => {
                    if (decoration.dataset.id === decorationItem.dataset.id) {
                        decoration.append(decorationItem);
                        decorationItem.style.left = 'unset';
                        decorationItem.style.top = 'unset';
                    }
                });
            }

            function onMouseMove(event: MouseEvent) {
                moveAt(event.pageX, event.pageY);
                decorationItem.style.display = 'none';
                elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                decorationItem.style.display = 'block';
            }

            document.addEventListener('mousemove', onMouseMove);

            decorationItem.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                decorationItem.onmouseup = null;
                if (elemBelow?.classList.contains('droppable')) {
                    decorationsCount.forEach((decorationCount) => {
                        if (
                            decorationCount.dataset.id === decorationItem.dataset.id &&
                            decorationItem.dataset.onTree === 'false'
                        ) {
                            decorationCount.innerHTML = `${parseInt(decorationCount.innerHTML) - 1}`;
                        }
                    });
                    decorationItem.dataset.onTree = 'true';
                } else {
                    back();
                    decorationsCount.forEach((decorationCount) => {
                        if (
                            decorationCount.dataset.id === decorationItem.dataset.id &&
                            decorationItem.dataset.onTree === 'true'
                        ) {
                            decorationCount.innerHTML = `${parseInt(decorationCount.innerHTML) + 1}`;
                        }
                    });
                    decorationItem.dataset.onTree = 'false';
                }
            };
        };
    });
}
