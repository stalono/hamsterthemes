/**
 * Весь код ниже был сгенерирован автоматически
 * С помощью компилятора TypeScript
 * Если есть желание посмотреть на качество кода
 * Это можно сделать в директории ts\hamster.ts
 * GitHub: https://github.com/stalono/hamsterthemes
*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = exports.removeReapetedElems = exports.removeReapetedContent = void 0;
function removeReapetedContent(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i].includes(array[j]) && i !== j) {
                array[i] = array[i].replace(array[j], '');
            }
        }
    }
    return array;
}
exports.removeReapetedContent = removeReapetedContent;
function removeReapetedElems(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}
exports.removeReapetedElems = removeReapetedElems;
function toNumber(string) {
    const number = Number(string);
    if (isNaN(number)) {
        return string;
    }
    else {
        return number;
    }
}
exports.toNumber = toNumber;
