// src/store/system/types.ts

import { Music } from 'common/interface';

export interface SystemState {
    loggedIn: boolean;
    session: string;
    userName: string;
}

export interface HintState {
    hintOpen: boolean;
    hintMsg: string;
}

export interface MaskState {
    showBannedMask: boolean;
}

export interface DrawerState {
    drawerOpen: boolean;
}

export interface PlayState {
    isPlaying: boolean;
}

export interface MailState {
    refreshMailPage: boolean;
    unreadMailCnt: number;
}

export interface MusicState {
    refreshMusicFlag: boolean;

    currentMusicId: number;
    currentMusic: Music;
    musics: Music[];
    musicIndex: number;
}

///////////////////

export interface AllState extends SystemState, HintState, MaskState, DrawerState, PlayState, MailState, MusicState {}

// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: SystemState;
}

export const OPEN_HINT = 'OPEN_HINT';

interface OpenHintAction {
    type: typeof OPEN_HINT;
    payload: { hintMsg: string };
}

export const CLOSE_HINT = 'CLOSE_HINT';
interface CloseHintAction {
    type: typeof CLOSE_HINT;
}

export const OPEN_MASK = 'OPEN_MASK';
export const CLOSE_MASK = 'CLOSE_MASK';
interface OpenMaskAction {
    type: typeof OPEN_MASK;
}
interface CloseMaskAction {
    type: typeof CLOSE_MASK;
}

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
interface OpenDrawerAction {
    type: typeof OPEN_DRAWER;
}
interface CloseDrawerAction {
    type: typeof CLOSE_DRAWER;
}

export const UPDATE_PLAY_STATE = 'UPDATE_PLAY_STATE';
interface UpdatePlayStateAction {
    type: typeof UPDATE_PLAY_STATE;
    payload: {
        isPlaying: boolean;
    };
}

export const UPDATE_UNREAD_MAIL_COUNT = 'UPDATE_UNREAD_MAIL_COUNT';
interface UpdateUnreadMailCountAction {
    type: typeof UPDATE_UNREAD_MAIL_COUNT;
    payload: {
        unreadMailCnt: number;
    };
}

export const INCREASE_UNREAD_MAIL_COUNT = 'INCREASE_UNREAD_MAIL_COUNT';
interface IncreaseUnreadMailCountAction {
    type: typeof INCREASE_UNREAD_MAIL_COUNT;
}

export const DECREASE_UNREAD_MAIL_COUNT = 'DECREASE_UNREAD_MAIL_COUNT';
interface DecreaseUnreadMailCountAction {
    type: typeof DECREASE_UNREAD_MAIL_COUNT;
}

export const REFRESH_MAIL_PAGE = 'REFRESH_MAIL_PAGE';
interface RefreashMailPageAction {
    type: typeof REFRESH_MAIL_PAGE;
}

export const UPDATE_MUSIC = 'UPDATE_MUSIC';
interface UpdateMusicAction {
    type: typeof UPDATE_MUSIC;
    payload: {
        music: Music;
    };
}

export const UPDATE_CURRENT_MUSIC = 'UPDATE_CURRENT_MUSIC';
interface UpdateCurrentMusicAction {
    type: typeof UPDATE_CURRENT_MUSIC;
    payload: {
        music: Music;
    };
}

export const UPDATE_MUSICS = 'UPDATE_MUSICS';
interface UpdateMusicsAction {
    type: typeof UPDATE_MUSICS;
    payload: {
        musics: Music[];
    };
}

export const JUMP_TO_NEXT_MUSIC = 'JUMP_TO_NEXT_MUSIC';
interface JumpToNextMusicAction {
    type: typeof JUMP_TO_NEXT_MUSIC;
}

export const UPDATE_MUSIC_REFRESHER = 'UPDATE_MUSIC_REFRESHER';
interface UpdateMusicRefresherAction {
    type: typeof UPDATE_MUSIC_REFRESHER;
    payload: {
        refreshMusicFlag: boolean;
    };
}

export type SystemActionTypes =
    | UpdateSessionAction
    | OpenHintAction
    | CloseHintAction
    | OpenMaskAction
    | CloseMaskAction
    | OpenDrawerAction
    | CloseDrawerAction
    | UpdatePlayStateAction
    | UpdateUnreadMailCountAction
    | IncreaseUnreadMailCountAction
    | DecreaseUnreadMailCountAction
    | RefreashMailPageAction
    | UpdateMusicAction
    | UpdateCurrentMusicAction
    | UpdateMusicsAction
    | JumpToNextMusicAction
    | UpdateMusicRefresherAction;
