import { data } from '../data/data';
import { selectArr } from './select';
import { Data } from './createCard';

const selectedToysContainer: HTMLDivElement = document.querySelector('.selected-toys-container')!;
const map: HTMLElement = document.querySelector('.map')!;

export class CreateSelectCard {
    createSelectCard(element: Data):void {
        const card: HTMLDivElement = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');
        const span: HTMLSpanElement = document.createElement('span');
        card.classList.add('selected-card');
        img.classList.add('selected-card-img');
        img.src = `./assets/toys/${element.num}.png`;
        img.draggable = true;
        img.id = `drag-${element.num}`;
        span.classList.add('selected-count');
        span.textContent = element.count;
        card.id = `card-${element.num}`
        card.append(img, span);
        selectedToysContainer.append(card);
    }

    createSelectCardFromArr(): void {
        let newData: Array<Data>;
        selectArr.length > 0 ? newData = data.filter(e => selectArr.includes(e.num)) : newData = data.filter((e,index)=> index < 20);
        selectedToysContainer.innerHTML = '';
        newData.forEach( e => this.createSelectCard(e));
    }

    resetMainTree(): void {
        const toys: NodeListOf<HTMLElement> = map.querySelectorAll('img');
        if (toys.length > 0) {
            toys.forEach(e => e.remove());
        }
    }

    img(card: ParentNode, id: string): void {
        const img: HTMLImageElement = document.createElement('img');
        img.classList.add('selected-card-img');
        img.src = `./assets/toys/${id}.png`;
        img.draggable = true;
        img.id = `drag-${id}`;
        card.append(img);
    }
}

export const selectedCard = new CreateSelectCard;