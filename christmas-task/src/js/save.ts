import { setFromLocal, dataNums, shapeNums, colorNums, sizeNums, createFilter, minCount, maxCount, minYear, maxYear, setSliderOutput, favoriteFilter} from '../index';
import { getLocalStorageGamePage, setLocalStorageGamePage } from './saveGamePage';
import { selectArr, selectCount, setFromLocalStorage } from './select';

const countSlider: HTMLDivElement = document.querySelector('.count-slider')!;
const yearSlider: HTMLDivElement = document.querySelector('.year-slider')!;
const sortSelect: HTMLSelectElement = document.querySelector('.sort-select')!;
const favoriteInput: HTMLInputElement = document.querySelector('.favorite-input')!;
const searchInput: HTMLInputElement = document.querySelector('.search')!;

function getActive(selector: string): string {
    const selectors: NodeListOf<HTMLElement> = document.querySelector(selector)!.querySelectorAll('button');
    const selectorsActive: Array<string> = [];
    selectors.forEach(e => {
        selectorsActive.push(e.className);
    })
    return selectorsActive.join(',');
}

function setActive(selector: string, nameLocalStorege: string): void {
    const selectors: NodeListOf<HTMLElement> = document.querySelector(selector)!.querySelectorAll('button');
    let selectorsActive: Array<string> = [];
    if (localStorage.getItem(nameLocalStorege)) {
        selectorsActive = localStorage.getItem(nameLocalStorege)!.split(',');
    }
    selectorsActive.map((e, ind) => {
        if (e === 'active') {
            selectors[ind].classList.add('active');
        }
    })
}

export function setLocalStorage(): void {
    localStorage.setItem('dataNums', dataNums.join(','));
    localStorage.setItem('shapeNums', shapeNums.join(','));
    localStorage.setItem('colorNums', colorNums.join(','));
    localStorage.setItem('sizeNums', sizeNums.join(','));
    localStorage.setItem('favorite', String(favoriteInput.checked));
    localStorage.setItem('selectArr', selectArr.join(','));
    localStorage.setItem('selectCount', String(selectCount));
    localStorage.setItem('minCount', String(minCount));
    localStorage.setItem('maxCount', String(maxCount));
    localStorage.setItem('minYear', String(minYear));
    localStorage.setItem('maxYear', String(maxYear));
    localStorage.setItem('sortSelect', sortSelect.value);
    localStorage.setItem('shapesActive', getActive('.shape'));
    localStorage.setItem('colorsActive', getActive('.color'));
    localStorage.setItem('sizesActive', getActive('.size'));
    localStorage.setItem('searchInput', searchInput.value);
    setLocalStorageGamePage();
}

export function getLocalStorage(): void {
    setActive('.shape', 'shapesActive');
    setActive('.color', 'colorsActive');
    setActive('.size', 'sizesActive');
    if (localStorage.getItem('searchInput')) {
        searchInput.value = localStorage.getItem('searchInput')!;
    }
    setFromLocal();
    setFromLocalStorage();

    (<any>countSlider).noUiSlider.set([minCount, maxCount]);
    (<any>yearSlider).noUiSlider.set([minYear, maxYear]);
    setSliderOutput(countSlider, minCount, maxCount);
    setSliderOutput(yearSlider, minYear, maxYear);
    favoriteFilter();
    createFilter();
    getLocalStorageGamePage();
}