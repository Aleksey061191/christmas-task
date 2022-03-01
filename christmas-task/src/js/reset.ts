import { TargetElement, resetNums, selectSize, selectShape, selectColor, setSliderOutput, createFilter} from '../index';
import {selectArr, selectCount, resetCount} from './select';
import { resetSearch } from './search';

const search: HTMLInputElement = document.querySelector('.search')!;
const favoriteInput: HTMLInputElement = document.querySelector('.favorite-input')!;
const countSlider: HTMLDivElement = document.querySelector('.count-slider')!;
const yearSlider: HTMLDivElement = document.querySelector('.year-slider')!;

function resetArray(arr: Array<string>) {
    while (arr.length > 0){
        arr.pop();
    }
}

export function resetFilters() {
    const filters = document.querySelectorAll('.active');
    filters.forEach(e => e.classList.remove('active'));
    resetNums();
    resetSearch();
    resetArray(selectSize);
    resetArray(selectShape);
    resetArray(selectColor);
    search.value = '';
    favoriteInput.checked = false;
    setSliderOutput(countSlider, 1, 12);
    setSliderOutput(yearSlider, 1940, 2020);
    (<TargetElement>countSlider).noUiSlider!.reset();
    (<TargetElement>yearSlider).noUiSlider!.reset();
    createFilter();
}

export function resetSettings() {
    const selectLabel = document.querySelector('.select span');
    localStorage.removeItem('dataNums');
    localStorage.removeItem('shapeNums');
    localStorage.removeItem('colorNums');
    localStorage.removeItem('sizeNums');
    localStorage.removeItem('favorite');
    localStorage.removeItem('selectArr');
    localStorage.removeItem('selectCount');
    localStorage.removeItem('minCount');
    localStorage.removeItem('maxCount');
    localStorage.removeItem('minYear');
    localStorage.removeItem('maxYear');
    localStorage.removeItem('sortSelect');
    localStorage.removeItem('shapesActive');
    localStorage.removeItem('colorsActive');
    localStorage.removeItem('sizesActive');
    localStorage.removeItem('searchInput');
    resetArray(selectArr);
    resetCount();
    selectLabel!.textContent = String(selectCount);
    createFilter();
}
