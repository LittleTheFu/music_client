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
