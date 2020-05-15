import { getMeId } from '../globals';

export const wrapName = (id: number, name: string): string => {
    if (id === getMeId()) {
        return name + '(me)';
    }

    return name;
};
