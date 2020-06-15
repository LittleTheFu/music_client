// src/store/system/reducers.ts

import { AllState, SystemActionTypes, UPDATE_SESSION, CLOSE_HINT, OPEN_HINT } from './types';

const initialState: AllState = {
    loggedIn: false,
    session: 'ssion',
    userName: 'usrname',

    hintOpen: false,
    hintMsg: 'msg',
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
        default:
            return state;
    }
}
