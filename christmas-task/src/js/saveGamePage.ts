import { onOffLigfts } from "..";
import { playAudio } from "./gameMenu";
import { lightColor, resetLightColor, setLightColor } from "./lights";
import { createSnow } from "./snow";

const mainTreeContainer: HTMLElement = document.querySelector('.main-tree-container')!;
const mainTree: HTMLImageElement = document.querySelector('.main-tree')!;
const audioBtn: HTMLElement = document.querySelector('.audio-btn')!;
const snowBtn: HTMLElement = document.querySelector('.snow-btn')!;
const switchLights: HTMLElement = document.querySelector('.switch-lights')!;

export function setLocalStorageGamePage(): void {
    const audio: boolean = audioBtn.classList.contains('active');
    const snow: boolean = snowBtn.classList.contains('active');
    const switchOnOff: boolean = switchLights.classList.contains('active');
    localStorage.setItem('bg', mainTreeContainer.style.backgroundImage);
    localStorage.setItem('tree', mainTree.src);
    localStorage.setItem('audio', String(audio));
    localStorage.setItem('snow', String(snow));
    localStorage.setItem('switchOnOff', String(switchOnOff));
    localStorage.setItem('lightColor', lightColor);
}

export function getLocalStorageGamePage(): void {
    if (localStorage.getItem('bg')) {
        mainTreeContainer.style.backgroundImage = localStorage.getItem('bg')!;
    }
    if (localStorage.getItem('tree')) {
        mainTree.src = localStorage.getItem('tree')!;
    }
    if (localStorage.getItem('audio') === 'true') {
        document.addEventListener('click', getAudio)
    }
    if (localStorage.getItem('snow') === 'true') {
        createSnow();
    }
    if (localStorage.getItem('lightColor')) {
        setLightColor();
    }
    if (localStorage.getItem('switchOnOff') === 'true') {
        onOffLigfts();
    }
}

function getAudio(): void {
    playAudio();
    document.removeEventListener('click', getAudio);
}

export function resetGamePage(): void {
    localStorage.removeItem('bg');
    localStorage.removeItem('tree');
    localStorage.removeItem('audio');
    localStorage.removeItem('snow');
    localStorage.removeItem('switchOnOff');
    localStorage.removeItem('lightColor');
    mainTreeContainer.style.backgroundImage = 'url("./assets/bg/1.jpg")';
    mainTree.src = './assets/tree/1.png';
    const audio: boolean = audioBtn.classList.contains('active');
    const snow: boolean = snowBtn.classList.contains('active');
    const switchOnOff: boolean = switchLights.classList.contains('active');
    resetLightColor();
    if (switchOnOff) {
        onOffLigfts();
    }
    if (audio) {
        playAudio();
    }
    if (snow) {
        createSnow();
    }
}
