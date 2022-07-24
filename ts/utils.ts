export function removeReapetedContent(array: Array<string>): Array<string> {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i].includes(array[j]) && i !== j) {
                array[i] = array[i].replace(array[j], '');
            }
        }
    }
    return array;
}

export function removeReapetedElems(array: Array<string>): Array<string> {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}

export function toNumber(string: string): number | string {
    const number: number = Number(string);
    if (isNaN(number)) {
        return string;
    } else {
        return number;
    }
}

