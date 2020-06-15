// src/store/system/reducers.ts

import {
    AllState,
    SystemActionTypes,
    UPDATE_SESSION,
    CLOSE_HINT,
    OPEN_HINT,
    OPEN_MASK,
    CLOSE_MASK,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    UPDATE_PLAY_STATE,
} from './types';

const initialState: AllState = {
    loggedIn: false,
    session: 'ssion',
    userName: 'usrname',

    hintOpen: false,
    hintMsg: 'msg',

    showBannedMask: false,
    drawerOpen: false,

    isPlaying: false,
};

export function systemReducer(state = initialState, action: SystemActionTypes): AllState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case CLOSE_HINT: {
            return {
                ...state,
                hintOpen: false,
            };
        }
        case OPEN_HINT: {
            return {
                ...state,
                ...action.payload,
                hintOpen: true,
            };
        }
        case OPEN_MASK: {
            return {
                ...state,
                showBannedMask: true,
            };
        }
        case CLOSE_MASK: {
            return {
                ...state,
                showBannedMask: false,
            };
        }
        case OPEN_DRAWER: {
            return {
                ...state,
                drawerOpen: true,
            };
        }
        case CLOSE_DRAWER: {
            return {
                ...state,
                drawerOpen: false,
            };
        }
        case UPDATE_PLAY_STATE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
