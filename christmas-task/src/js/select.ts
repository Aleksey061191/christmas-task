export var selectArr: Array<string> = [];

const maxSelectNum: number = 20;
export let selectCount: number = 0;

export function selectCard(event: Event): void {
    const selectLabel: HTMLSpanElement = document.querySelector('.select span')!;
    if ((<HTMLDivElement>event.target!).closest('.card')) {
        if (!(<HTMLDivElement>event.target!).classList.contains('active') && selectCount < maxSelectNum) {
            (<HTMLDivElement>event.target!).classList.add('active'),
            selectArr.push((<Element>event.target!).id),
            selectCount++;
        }   
        else {
            if (!(<Element>event.target!).classList.contains('active') && selectCount == maxSelectNum) {
                selectLabel!.textContent = '20';
                active();
                setTimeout(inactive, 1300);
                // alert('Выбранно максимальное количество шаров!');
                return;
            } else {
                (<Element>event.target!).classList.remove('active');
                const remuveElement = selectArr.indexOf((<Element>event.target!).id);
                selectArr.splice(remuveElement, 1),
                selectCount--;
            }
        }
        selectLabel!.textContent = String(selectCount);
    }
}

export function resetCount():void {
    selectCount = 0;
}

const selectLabel: HTMLSpanElement = document.querySelector('.select span')!;

export function setFromLocalStorage(): void {
    if (localStorage.getItem('selectArr')) {
        selectArr = localStorage.getItem('selectArr')!.split(',').slice();
    }
    if (localStorage.getItem('selectCount')) {
        selectCount = +localStorage.getItem('selectCount')!;
        selectLabel.textContent = String(selectCount);
    }
    
}

const modal: HTMLElement = document.querySelector('.max-select')!;

const active = () => {
    modal.classList.remove('max-select-close');
    modal.classList.add('max-select-open');
}
const inactive = () => {
    modal.classList.remove('max-select-open');
    modal.classList.add('max-select-close');
}
