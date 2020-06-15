import {
    OPEN_HINT,
    OPEN_MASK,
    CLOSE_MASK,
    SystemActionTypes,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    UPDATE_PLAY_STATE,
} from './types';
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

export const openDrawer = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: OPEN_DRAWER });
};

export const closeDrawer = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: CLOSE_DRAWER });
};

export const updatePlayState = (dispatch: Dispatch<SystemActionTypes>, isPlaying: boolean): void => {
    dispatch({ type: UPDATE_PLAY_STATE, payload: { isPlaying: isPlaying } });
};
