export default function dragNDrop() {
    const decorationItems = document.querySelectorAll<HTMLElement>('.decoration-image');
    decorationItems.forEach((decorationItem) => {
        decorationItem.ondragstart = function () {
            return false;
        };
        decorationItem.onmousedown = function (event: MouseEvent) {
            decorationItem.style.position = 'absolute';
            decorationItem.style.zIndex = '1000';

            document.body.append(decorationItem);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX: number, pageY: number) {
                decorationItem.style.left = pageX - decorationItem.offsetWidth / 2 + 'px';
                decorationItem.style.top = pageY - decorationItem.offsetHeight / 2 + 'px';
            }

            function onMouseMove(event: MouseEvent) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            decorationItem.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                decorationItem.onmouseup = null;
            };
        };
    });
}
