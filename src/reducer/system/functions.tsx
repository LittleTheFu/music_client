import { OPEN_HINT, OPEN_MASK, CLOSE_MASK, SystemActionTypes } from './types';
import { Dispatch } from 'redux';

export const openHint = (dispatch: Dispatch<SystemActionTypes>, message: string): void => {
    dispatch({ type: OPEN_HINT, payload: { hintMsg: message } });
};

export const openMask = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: OPEN_MASK });
};

export const closeMask = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: CLOSE_MASK });
};
