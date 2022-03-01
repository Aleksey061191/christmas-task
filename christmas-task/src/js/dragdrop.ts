import { selectedCard } from "./createSelecteCard";

let isDrag: boolean = false;
const map: HTMLElement = document.querySelector('.map')!;
const mainTreeContainer: HTMLElement = document.querySelector('.main-tree-container')!;

export function handleDragStart(e: Event): void {
    (<HTMLElement>e.target).classList.add('drag');
}

export function handleDragEnterLeave(e: Event): void {
    const activeElement: HTMLElement = document.querySelector(`.drag`)!;
    const id: string = activeElement.id.split('-')[1];
    const card: ParentNode = document.getElementById(`card-${id}`)!;
    const span: HTMLSpanElement = card.querySelector('.selected-count')!;
    let count: number = +span.textContent!;
    let shiftX: number = (<MouseEvent>e).clientX - map.getBoundingClientRect().left;
    let shiftY: number = (<MouseEvent>e).clientY - map.getBoundingClientRect().top;
    if ((<HTMLElement>e.target).parentNode == map) {
        activeElement!.style.width = '50px';
    }
    if (isDrag) {
        activeElement!.style.top = shiftY - activeElement.getBoundingClientRect().height / 2 + 'px';
        activeElement!.style.left = shiftX - activeElement.getBoundingClientRect().width / 2 + 'px';
        if ((<HTMLElement>e.target).parentNode == card) {
            activeElement.classList.add('dragdrop');
            map.append(activeElement);
            count--;
            if (count > 0) {
                selectedCard.img(card, id);
            }
            span.textContent = String(count);
        }
    } else {
        if ((<HTMLElement>e.target).parentNode == map) {
            activeElement.remove();
            count++;
            if (count > 0) {
                selectedCard.img(card, id);
            }
            span.textContent = String(count);
        }
    }
    (<HTMLElement>e.target).classList.remove('drag');
    removeCardToy(card, count);
}

export function handleOverDrop(e: Event): void {
    e.preventDefault();
    const activeElement: HTMLElement = document.querySelector('.drag')!;
    const currentElement = e.target as HTMLElement;
    const main: HTMLElement = mainTreeContainer.querySelector('.drag')!;
    if (main !== null) {
        activeElement!.style.width = '0';
    }
    if (currentElement.parentNode !== map) {
        isDrag = false;
        activeElement.style.cursor = 'not-drop';
    } else {
        isDrag = true;
        activeElement.style.cursor = 'auto';
    }
}

function removeCardToy(card: ParentNode, count: number): void {
    const img: HTMLImageElement = card.querySelector('img')!;
    if (count == 0 && img !== null) {
        img.remove();
    }
}
