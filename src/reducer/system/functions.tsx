import {
    SystemActionTypes,
    OPEN_HINT,
    OPEN_MASK,
    CLOSE_MASK,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    UPDATE_PLAY_STATE,
    UPDATE_UNREAD_MAIL_COUNT,
    INCREASE_UNREAD_MAIL_COUNT,
    DECREASE_UNREAD_MAIL_COUNT,
    REFRESH_MAIL_PAGE,
    UPDATE_MUSIC,
    UPDATE_CURRENT_MUSIC,
    UPDATE_MUSICS,
    JUMP_TO_NEXT_MUSIC,
    UPDATE_MUSIC_REFRESHER,
} from './types';
import { Dispatch } from 'redux';
import { Music } from 'common/interface';

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

export const updateUnreadMailCount = (dispatch: Dispatch<SystemActionTypes>, unreadMailCnt: number): void => {
    dispatch({ type: UPDATE_UNREAD_MAIL_COUNT, payload: { unreadMailCnt: unreadMailCnt } });
};

export const increaseUnreadMailCount = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: INCREASE_UNREAD_MAIL_COUNT });
};

export const decreaseUnreadMailCount = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: DECREASE_UNREAD_MAIL_COUNT });
};

export const refreshMailPage = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: REFRESH_MAIL_PAGE });
};

export const updateMusic = (dispatch: Dispatch<SystemActionTypes>, music: Music): void => {
    dispatch({ type: UPDATE_MUSIC, payload: { music: music } });
};

export const updateCurrentMusic = (dispatch: Dispatch<SystemActionTypes>, music: Music): void => {
    dispatch({ type: UPDATE_CURRENT_MUSIC, payload: { music: music } });
};

export const updateMusics = (dispatch: Dispatch<SystemActionTypes>, musics: Music[]): void => {
    dispatch({ type: UPDATE_MUSICS, payload: { musics: musics } });
};

export const jumpToNextMusic = (dispatch: Dispatch<SystemActionTypes>): void => {
    dispatch({ type: JUMP_TO_NEXT_MUSIC });
};

export const updateMusicRefresher = (dispatch: Dispatch<SystemActionTypes>, refreshMusicFlag: boolean): void => {
    dispatch({ type: UPDATE_MUSIC_REFRESHER, payload: { refreshMusicFlag: refreshMusicFlag } });
};
