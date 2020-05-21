import { getMeId } from '../globals';

export const wrapName = (id: number, name: string): string => {
    if (id === getMeId()) {
        return name + '(me)';
    }

    return name;
};

export function wrapFunc1<T>(fn: (data: T) => void, param: T) {
    return (): void => {
        fn(param);
    };
}

export const getShortContentStr = (content: string): string => {
    const MAX_LEN = 10;
    const len = content.length;

    if (len <= MAX_LEN) {
        return content;
    }

    return content.substr(0, MAX_LEN) + '...';
};

// const getNumStr = (num: number, bitWidth = 2): string => {
//     let bit = 1;

//     let n = Math.floor(num / 10);
//     while (n > 0) {
//         bit++;
//         n = Math.floor(n / 10);
//     }

//     let padNum = bitWidth - bit;

//     if (padNum <= 0) {
//         return num.toString();
//     }

//     let str = '';
//     while (padNum > 0) {
//         str += '0';
//         padNum--;
//     }
//     str += num;

//     return str;
// };

// export const getLocalDateStr = (date: Date): string => {
//     const localDate = new Date(date);

//     const year = localDate.getUTCFullYear();
//     const month = localDate.getUTCMonth();
//     const day = localDate.getUTCDay();

//     const hour = localDate.getHours();
//     const min = localDate.getMinutes();
//     const sec = localDate.getSeconds();

//     return year + '/' + month + '/' + day + ' ' + getNumStr(hour) + ':' + getNumStr(min) + ':' + getNumStr(sec);
// };
