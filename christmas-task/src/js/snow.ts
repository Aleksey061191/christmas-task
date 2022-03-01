const snowContainer: HTMLDivElement = document.querySelector('.snow')!;
const snowBtn: HTMLElement = document.querySelector('.snow-btn')!;
let interval: NodeJS.Timer;

export function createSnowFlake(): void {
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = Math.random() * snowContainer.clientWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowFlake.style.opacity = String(Math.random());
    const size: string = Math.random() * 15 + 15 + 'px';
    snowFlake.style.width = size;
    snowFlake.style.height= size;

    snowContainer.append(snowFlake);

    setTimeout((): void => {
        snowFlake.remove();
    }, 4000)
}

export function createSnow(): void {
    if (snowBtn.classList.contains('active')){
        snowBtn.classList.remove('active');
        clearInterval(interval);
    } else {
        snowBtn.classList.add('active');
        interval = setInterval(createSnowFlake, 90);
    }
}