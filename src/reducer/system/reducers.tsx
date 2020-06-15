// src/store/system/reducers.ts

import { AllState, SystemActionTypes, UPDATE_SESSION, CLOSE_HINT, OPEN_HINT, OPEN_MASK, CLOSE_MASK } from './types';

const initialState: AllState = {
    loggedIn: false,
    session: 'ssion',
    userName: 'usrname',

    hintOpen: false,
    hintMsg: 'msg',

    showBannedMask: false,
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
        default:
            return state;
    }
}
