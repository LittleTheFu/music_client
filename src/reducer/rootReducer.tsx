// src/store/index.ts

import { systemReducer } from './system/reducers';
import { chatReducer } from './chat/reducers';
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const selectName = (state: RootState): string => {
    return state.system.userName;
};

export const selectHintState = (state: RootState): boolean => {
    return state.system.hintOpen;
};

export const selectHintMsg = (state: RootState): string => {
    return state.system.hintMsg;
};

export const selectMaskState = (state: RootState): boolean => {
    return state.system.showBannedMask;
};

export const store = createStore(rootReducer);
