import { getMeId } from '../helpers';
import { validate } from 'email-validator';

export const PASSWORD_MIN_LEN = 4;
export const PASSWORD_MAX_LEN = 6;

const isValidLength = (str: string, minLen: number, maxLen: number): boolean => {
    const len = str.length;

    if (len < minLen) return false;
    if (len > maxLen) return false;

    return true;
};

export const isValidPassowrd = (password: string): boolean => {
    return isValidLength(password, PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
};

const getLengthHelpText = (minLen: number, maxLen: number): string => {
    return '(' + minLen + ' - ' + maxLen + ') characters';
};

export const getPassowrdHelpText = (): string => {
    return getLengthHelpText(PASSWORD_MIN_LEN, PASSWORD_MAX_LEN);
};

export const USERNAME_MIN_LEN = 4;
export const USERNAME_MAX_LEN = 6;

export const isValidUserName = (name: string): boolean => {
    return isValidLength(name, USERNAME_MIN_LEN, USERNAME_MAX_LEN);
};

export const getUsernameHelpText = (): string => {
    return getLengthHelpText(USERNAME_MIN_LEN, USERNAME_MAX_LEN);
};

export const EMAIL_MIN_LEN = 4;
export const EMAIL_MAX_LEN = 30;

export const isValidEmail = (email: string): boolean => {
    return isValidLength(email, EMAIL_MIN_LEN, EMAIL_MAX_LEN) && validate(email);
};

export const getEmailHelpText = (): string => {
    return getLengthHelpText(EMAIL_MIN_LEN, EMAIL_MAX_LEN);
};

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
