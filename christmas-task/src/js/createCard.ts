import {selectArr} from './select';

const cardContainer = document.querySelector('.card-container');

export interface Data{
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean,
}

export class CreateCard {

    createElement(text: string, element: string):HTMLParagraphElement {
        const p: HTMLParagraphElement = document.createElement('p');
        const span: HTMLSpanElement = document.createElement('span');
        p.textContent = text;
        span.textContent = element;
        p.append(span);
        return p;
    }

    createCard(element: Data): void {
        const card: HTMLDivElement = document.createElement('div');
        const title: HTMLHeadingElement = document.createElement('h2');
        const img: HTMLImageElement = document.createElement('img');
        const description: HTMLDivElement = document.createElement('div');
        description.classList.add('card-description');
        description.append(this.createElement('Количество:', element.count), this.createElement('Год покупки:', element.year), this.createElement('Форма игрушки:', element.shape), this.createElement('Цвет игрушки:', element.color), this.createElement('Размер игрушки:', element.size), this.createElement('Любимая:', element.favorite? 'Да' : 'Нет'));
        card.classList.add('card');
        if (selectArr.includes(element.num)) {
            card.classList.add('active');
        }
        title.classList.add('card-title');
        title.textContent = element.name;
        img.classList.add('card-img');
        img.src = `./assets/toys/${element.num}.png`;
        card.id = element.num;
        card.append(title, img, description);
        cardContainer!.append(card);
    }

    createError(): void {
        const card: HTMLDivElement = document.createElement('div');
        const title: HTMLHeadingElement = document.createElement('h2');
        card.classList.add('card-error');
        title.classList.add('card-title');
        title.textContent = 'Ничего не найдено';
        card.append(title);
        cardContainer!.append(card);
    }

    createCardFromArr(arr: Array<Data>): void {
        cardContainer!.innerHTML = '';
        if (arr.length === 0) {
            this.createError();
        }
        arr.forEach( e => this.createCard(e));
    }
}