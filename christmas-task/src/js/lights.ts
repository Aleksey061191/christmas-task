const treeContainer: HTMLElement = document.querySelector('.lights-tree-container')!;
const switchLights: HTMLElement = document.querySelector('.switch-lights')!;
const colorBtns: HTMLElement = document.querySelector('.lights-btns')!;
const lightsLabel: HTMLElement = document.querySelector('.lights-label')!;
export let lightColor: string = 'multicolor';

function createLight(size: number, rotate: number, count: number, index: number): void {
    const ul: HTMLElement = document.createElement('ul');
    ul.classList.add('lightrope');
    ul.style.width = size + 'px',
    ul.style.height = size + 'px';
    for (let i: number = 0; i <= count; i++) {
        const li: HTMLElement = document.createElement('li');
        li.innerHTML = '';
        li.classList.add(lightColor);
        li.style.transform = `rotate(${rotate + index * i}deg) translate(${size / 2 - 10}px)`;
        ul.append(li);
    }
    treeContainer.append(ul);
}

export function createLights(): void {
    if (!switchLights.classList.contains('active')) {
        const btns: NodeListOf<HTMLElement> = colorBtns.querySelectorAll('.light-color');
        btns.forEach(e => {
            if (e.dataset.light == lightColor){
                e.classList.add('active')
            }
        });
    }
    createLight(80, 55, 3, 20);
    createLight(140, 55, 6, 10);
    createLight(200, 55, 9, 7);
    createLight(260, 55, 11, 6);
    createLight(320, 55, 14, 4.8);
    createLight(380, 55, 17, 4);
    createLight(440, 55, 20, 3.5);
    createLight(500, 55, 23, 3);
}

export function clearLights(): void {
    treeContainer.innerHTML = '';
    const btns: NodeListOf<HTMLElement> = colorBtns.querySelectorAll('.light-color');
    btns.forEach(e => e.classList.remove('active'));
}

export function colorLights(e: Event): void {
    if ((<HTMLElement>e.target!).classList.contains('light-color')) {
        if (!switchLights.classList.contains('active')) {
            switchLights.classList.add('active');
            lightsLabel.textContent = 'on';
        }
        lightColor = (<HTMLElement>e.target!).dataset.light!;
        clearLights();
        (<HTMLElement>e.target!).classList.add('active');
        createLights();
    }
}

export function setLightColor(): void {
    lightColor = localStorage.getItem('lightColor')!;
}

export function resetLightColor(): void {
    lightColor = 'multicolor';
}