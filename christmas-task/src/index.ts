import { data } from './data/data';
import noUiSlider, {API} from 'nouislider';
import './styles/style.scss';
import { search } from './js/search';
import { selectCard } from './js/select';
import { getLocalStorage, setLocalStorage} from './js/save';
import { resetFilters, resetSettings } from './js/reset';
import {CreateCard} from './js/createCard';
import { Data } from './js/createCard';
import { selectedCard } from './js/createSelecteCard';
import { getBg, getTree, playAudio } from './js/gameMenu';
import { createSnow } from './js/snow';
import { handleDragEnterLeave, handleDragStart, handleOverDrop } from './js/dragdrop';
import { resetGamePage } from './js/saveGamePage';
import { clearLights, colorLights, createLights } from './js/lights';

export let dataNums: Array<string> = data.map( e => e.num);
export let shapeNums: Array<string> = data.map( e => e.num);
export let colorNums: Array<string> = data.map( e => e.num);
export let sizeNums: Array<string> = data.map( e => e.num);
export let favoriteNums: Array<string> = data.map( e => e.num);
export let minCount: number = 1;
export let maxCount: number = 12;
export let minYear: number = 1940;
export let maxYear: number = 2020;


// Save
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const controls: HTMLElement = document.querySelector('.controls')!;
const header: HTMLElement = document.querySelector('.header')!;
const cardContainer: HTMLElement = document.querySelector('.card-container')!;

let position: number = header.offsetTop;

function fixHeader(): void {
    if (window.pageYOffset > position) {
        header.classList.add('fix');
        controls.classList.add('fix-controls');
        cardContainer.classList.add('fix-controls');
    } else {
        header.classList.remove('fix');
        controls.classList.remove('fix-controls');
        cardContainer.classList.remove('fix-controls');
    }
}

const homePage: HTMLElement = document.querySelector('.strart-page')!;
const settingsPage: HTMLElement = document.querySelector('.settings')!;
const gamePage: HTMLElement = document.querySelector('.game')!;
const headerTree: HTMLElement = document.querySelector('.header-tree')!;
const btnStartPage: HTMLElement = document.querySelector('.home-page__item')!;
const btnSettingPage: HTMLElement = document.querySelector('.btn-settings-page')!;
const btnGamePage: HTMLElement = document.querySelector('.btn-game-page')!;

// Search
const searchInput: HTMLInputElement = document.querySelector('.search')!;

searchInput.addEventListener('input', createFilter);

function goToHomePage(): void {
    homePage.classList.remove('hide');
    settingsPage.classList.add('hide');
    gamePage.classList.add('hide');
    btnSettingPage.classList.remove('active-link');
    btnGamePage.classList.remove('active-link');
    window.removeEventListener('scroll', fixHeader);
}

function goToSettingsPage(): void {
    settingsPage.classList.remove('hide');
    homePage.classList.add('hide');
    gamePage.classList.add('hide');
    btnSettingPage.classList.add('active-link');
    btnGamePage.classList.remove('active-link');
    window.addEventListener('scroll', fixHeader);
    searchInput.focus();
}

function goToGamePage(): void {
    gamePage.classList.remove('hide');
    homePage.classList.add('hide');
    settingsPage.classList.add('hide');
    btnSettingPage.classList.remove('active-link');
    btnGamePage.classList.add('active-link');
    window.removeEventListener('scroll', fixHeader);
}

headerTree.addEventListener('click', goToHomePage);
btnStartPage.addEventListener('click', goToSettingsPage);
btnSettingPage.addEventListener('click', goToSettingsPage);
btnGamePage.addEventListener('click', goToGamePage);
btnGamePage.addEventListener('click', () => selectedCard.createSelectCardFromArr());
btnGamePage.addEventListener('click', () => selectedCard.resetMainTree());

// Create Card
export const card = new CreateCard;
card.createCardFromArr(data);

// Sort by name, sort by count
const sortSelect: HTMLSelectElement = document.querySelector('.sort-select')!;

function sortYear(): Array<Data> {
    const newData: Array<Data> = data.filter(e => dataNums.includes(e.num));
    const sort: Array<Data> = newData.sort((a, b) => +a.year - +b.year);
    return sort;
}

function sortName(): Array<Data> {
    const newData: Array<Data> = data.filter(e => dataNums.includes(e.num));
    const sort: Array<Data> = newData.sort((a, b) => a.name.localeCompare(b.name));
    return sort;
}

function sortNo(): Array<Data> {
    const newData: Array<Data> = data.filter(e => dataNums.includes(e.num));
    return newData;
}
export function sortCase(): void {
    const value: string = sortSelect.value;
    if (value === 'sort-name-max')
        return card.createCardFromArr(sortName());
    else {
        if (value === 'sort-name-min')
            return card.createCardFromArr(sortName().reverse());
        else {
            if (value === 'sort-count-max')
                return card.createCardFromArr(sortYear());
            else {
                if (value === 'sort-count-min')
                    return card.createCardFromArr(sortYear().reverse());
                else {
                    if (value === 'sort')
                    return card.createCardFromArr(sortNo());
                }
            }
        }
    }
}

sortSelect.addEventListener('change', sortCase);

export function createFilter(): void {
    const newData: Array<Data> = data.filter(e => favoriteNums.includes(e.num) && sizeNums.includes(e.num) && colorNums.includes(e.num) && shapeNums.includes(e.num) && (+e.count >= +minCount && +e.count <= +maxCount) && (+e.year >= +minYear && +e.year <= +maxYear) && search().includes(e.num));
    dataNums = newData.map(e => e.num);
    card.createCardFromArr(newData);
    sortCase();
}

// Rage controls
const countSlider: HTMLDivElement = document.querySelector('.count-slider')!;
const yearSlider: HTMLDivElement = document.querySelector('.year-slider')!;

export function setSliderOutput(element: HTMLDivElement, minValue: number, maxValue: number): void {
    (<HTMLInputElement>element.previousElementSibling!).value = String(minValue);
    (<HTMLInputElement>element.nextElementSibling!).value = String(maxValue);
}

noUiSlider.create(countSlider, {
    start: [1, 12],
    connect: true,
    step: 1,
    range: {
        'min': 1,
        'max': 12
    }
});

export interface TargetElement extends HTMLElement {
    noUiSlider?: API;
}

(<TargetElement>countSlider).noUiSlider!.on('update', function () {
    const count = (<TargetElement>countSlider).noUiSlider!.get() as Array<string>;
    minCount = parseInt(String(count[0]));
    maxCount = parseInt(String(count[1]));
    setSliderOutput(countSlider, minCount, maxCount);
    createFilter();
});

noUiSlider.create(yearSlider, {
    start: [1940, 2020],
    connect: true,
    step: 10,
    range: {
        'min': 1940,
        'max': 2020
    }
});

(<TargetElement>yearSlider).noUiSlider!.on('update', function () {
    const year = (<TargetElement>yearSlider).noUiSlider!.get() as Array<string>;
    minYear = parseInt(year[0]);
    maxYear = parseInt(year[1]);
    setSliderOutput(yearSlider, minYear, maxYear);
    createFilter();
});




// Sort by shape
const shape: HTMLElement = document.querySelector('.shape')!;
export const selectShape: Array<string> = [];

function shapeFilter(event: Event): void {
    if ((<HTMLElement>event.target!).closest('button')) {
        if (!(<HTMLElement>event.target!).classList.contains('active')) {
            (<HTMLElement>event.target!).classList.add('active');
            selectShape.push((<HTMLElement>event.target!).dataset.filter!);
        } else {
            (<HTMLElement>event.target!).classList.remove('active');
            const remuveShape = selectShape.indexOf((<HTMLElement>event.target!).dataset.filter!);
            selectShape.splice(remuveShape, 1);
        }
        if (selectShape.length) {
            const newData: Array<Data> = data.filter(e => selectShape.includes(e.shape));
            shapeNums = newData.map(e => e.num);
        } else {
            shapeNums = data.map(e => e.num);
        }
    }
    createFilter();
}
shape.addEventListener('click', (event) => shapeFilter(event));

// Sort by color
const color: HTMLElement = document.querySelector('.color')!;
export const selectColor: Array<string> = [];

function colorFilter(event: Event) {
    if ((<HTMLElement>event.target!).closest('button')) {
        if (!(<HTMLElement>event.target!).classList.contains('active')) {
            (<HTMLElement>event.target!).classList.add('active');
            selectColor.push((<HTMLElement>event.target!).dataset.filter!);
        } else {
            (<HTMLElement>event.target!).classList.remove('active');
            const remuveColor = selectColor.indexOf((<HTMLElement>event.target!).dataset.filter!);
            selectColor.splice(remuveColor, 1);
        }
        if (selectColor.length) {
            const newData: Array<Data> = data.filter(e => selectColor.includes(e.color));
            colorNums = newData.map(e => e.num);
        } else {
            colorNums = data.map(e => e.num);
        }
    }
    createFilter();
}

color.addEventListener('click', (event)=>colorFilter(event));

// Sort by size
const size: HTMLElement = document.querySelector('.size')!;
export const selectSize: Array<string> = [];

function sizeFilter(event: Event) {
    if ((<HTMLElement>event.target!).dataset.filter) {
        if (!(<HTMLElement>event.target!).classList.contains('active')){
            (<HTMLElement>event.target!).classList.add('active');
            selectSize.push((<HTMLElement>event.target!).dataset.filter!);
        } else {
            (<HTMLElement>event.target!).classList.remove('active');
            const remuveSize = selectSize.indexOf((<HTMLElement>event.target!).dataset.filter!);
            selectSize.splice(remuveSize, 1);
        }
        if (selectSize.length !== 0) {
            const newData: Array<Data> = data.filter(e => selectSize.includes(e.size));
            sizeNums = newData.map(e => e.num);
        } else {
            sizeNums = data.map(e => e.num);
        }
    }
    createFilter();
}

size.addEventListener('click', (event) => sizeFilter(event));

// Favorite items
const favoriteInput: HTMLInputElement = document.querySelector('.favorite-input')!;

export function favoriteFilter() {
    if (favoriteInput.checked) {
        const newData: Array<Data> = data.filter( e => e.favorite === true);
        favoriteNums = newData.map( e => e.num);
    } else{
        favoriteNums = data.map( e => e.num);
    }
    createFilter();
}

favoriteInput.addEventListener('change', favoriteFilter);

// Reset filters
const resetBtn: HTMLElement = document.querySelector('.reset')!;

export function resetNums(): void {
    dataNums = data.map( e => e.num);
    shapeNums = data.map( e => e.num);
    colorNums = data.map( e => e.num);
    sizeNums = data.map( e => e.num);
    favoriteNums = data.map( e => e.num);
}

resetBtn.addEventListener('click', resetFilters);

// Reset settings
const resetSettingsBtn: HTMLElement = document.querySelector('.reset-settings')!;

resetSettingsBtn.addEventListener('click', resetSettings);

// Select Card
cardContainer.addEventListener('click', (event) => selectCard(event));

// Set from Localstorage
export function setFromLocal(): void {
    if (localStorage.getItem('dataNums')) {
        dataNums = localStorage.getItem('dataNums')!.split(',');
    }
    if (localStorage.getItem('shapeNums')) {
        shapeNums = localStorage.getItem('shapeNums')!.split(',');
    }
    if (localStorage.getItem('colorNums')) {
        colorNums = localStorage.getItem('colorNums')!.split(','); 
    }
    if (localStorage.getItem('sizeNums')) {
        sizeNums = localStorage.getItem('sizeNums')!.split(',');
    }
    if (localStorage.getItem('favorite') === 'true') {
        favoriteInput.checked = true;
    }
    if (localStorage.getItem('minCount')) {
        minCount = +localStorage.getItem('minCount')!;
    }
    if (localStorage.getItem('maxCount')) {
        maxCount = +localStorage.getItem('maxCount')!;
    }
    if (localStorage.getItem('minYear')) {
        minYear = +localStorage.getItem('minYear')!;
    }
    if (localStorage.getItem('maxYear')) {
        maxYear = +localStorage.getItem('maxYear')!;
    }
    if (localStorage.getItem('sortSelect')) {
        sortSelect.value = localStorage.getItem('sortSelect')!;
    }
}

// Game page select bg, tree, play audio, snow
const bgContainer: HTMLElement = document.querySelector('.bg-container')!;
const treeContainer: HTMLElement = document.querySelector('.tree-container')!;
const audioBtn: HTMLElement = document.querySelector('.audio-btn')!;
const snowBtn: HTMLElement = document.querySelector('.snow-btn')!;
const resetGameBtn: HTMLElement = document.querySelector('.reset-game')!;

bgContainer.addEventListener('click', (event) => getBg(event));
treeContainer.addEventListener('click', (event) => getTree(event));
audioBtn.addEventListener('click', playAudio);
snowBtn.addEventListener('click', createSnow);
resetGameBtn.addEventListener('click', resetGamePage);

// Drag and drop
const draggable: HTMLElement = document.querySelector('.selected-toys-container')!;
const target: HTMLElement = document.querySelector('.game')!;
const map: HTMLElement = document.querySelector('.map')!;

map.addEventListener('dragstart', handleDragStart);
map.addEventListener('dragend', handleDragEnterLeave);

draggable.addEventListener('dragstart', handleDragStart);
draggable.addEventListener('dragend', handleDragEnterLeave);

target.addEventListener('dragover', handleOverDrop);
target.addEventListener('drop', handleOverDrop);

// Lights
const switchLights: HTMLElement = document.querySelector('.switch-lights')!;
const colorBtns: HTMLElement = document.querySelector('.lights-btns')!;
const lightsLabel: HTMLElement = document.querySelector('.lights-label')!;

export function onOffLigfts() {
    const switchActive: boolean = switchLights.classList.contains('active');
    if (switchActive) {
        clearLights();
        switchLights.classList.remove('active');
        lightsLabel.textContent = 'off';
    } else {
        createLights();
        switchLights.classList.add('active');
        lightsLabel.textContent = 'on';
    }
}

colorBtns.addEventListener('click', colorLights);
switchLights.addEventListener('click', onOffLigfts);
