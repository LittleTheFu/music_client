// src/store/system/types.ts

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

///////////////////

export interface HintMsg {
    hintMsg: string;
}

export interface AllState extends SystemState, HintState, MaskState, DrawerState, PlayState {}

// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: SystemState;
}

export const OPEN_HINT = 'OPEN_HINT';

interface OpenHintAction {
    type: typeof OPEN_HINT;
    payload: HintMsg;
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

export type SystemActionTypes =
    | UpdateSessionAction
    | OpenHintAction
    | CloseHintAction
    | OpenMaskAction
    | CloseMaskAction
    | OpenDrawerAction
    | CloseDrawerAction
    | UpdatePlayStateAction;
