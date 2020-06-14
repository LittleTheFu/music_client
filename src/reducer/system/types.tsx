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

export interface HintMsg {
    hintMsg: string;
}

export interface AllState extends SystemState, HintState {}

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

export type SystemActionTypes = UpdateSessionAction | OpenHintAction | CloseHintAction;
