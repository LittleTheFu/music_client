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
