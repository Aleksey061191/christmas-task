import { data } from '../data/data';
import { Data } from './createCard';

const searchInput: HTMLInputElement = document.querySelector('.search')!;

let searchNums: Array<string> = data.map(e => e.num);

export function search(): Array<string> {
    const value: string = searchInput.value.toLowerCase();
    let newData: Array<Data>;
    if (searchInput.value !== '') {
        newData = data.filter(e => e.name.toLowerCase().includes(value));
        searchNums = newData.map(e => e.num);
    } else {
        searchNums = data.map(e => e.num);
    }
    return searchNums;
}

export function resetSearch(): void {
    searchNums = data.map(e => e.num);
}