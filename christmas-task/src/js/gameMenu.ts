const mainTreeContainer: HTMLElement = document.querySelector('.main-tree-container')!;
const mainTree: HTMLImageElement = document.querySelector('.main-tree')!;
const audioBtn: HTMLElement = document.querySelector('.audio-btn')!;
const audio: HTMLAudioElement = new Audio();
let isPlay: boolean = false;

export function getBg(bg: Event): void {
    if ((<HTMLElement>bg.target).dataset.bg) {
        const newBg: string = (<HTMLElement>bg.target).dataset.bg!;
        mainTreeContainer.style.backgroundImage = `url(./assets/bg/${newBg}.jpg)`;
    }
}

export function getTree(tree: Event): void {
    if ((<HTMLElement>tree.target).dataset.tree) {
        const newTree: string = (<HTMLElement>tree.target).dataset.tree!;
        mainTree.src = `./assets/tree/${newTree}.png`;
    }
    console.log(mainTree.src)
}

export function playAudio(): void {
    audio.src = './assets/audio/audio.mp3';
    audio.volume = 0.2;
    if (isPlay) {
        audio.pause();
        isPlay = false;
        audioBtn.classList.remove('active');
    } else {
        audio.play();
        isPlay = true;
        audioBtn.classList.add('active');
    }
}
