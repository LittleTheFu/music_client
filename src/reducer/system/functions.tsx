import { OPEN_HINT, SystemActionTypes } from './types';
import { Dispatch } from 'redux';

export const openHint = (dispatch: Dispatch<SystemActionTypes>, message: string): void => {
    dispatch({ type: OPEN_HINT, payload: { hintMsg: message } });
};
