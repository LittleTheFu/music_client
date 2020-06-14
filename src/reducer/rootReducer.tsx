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

export const store = createStore(rootReducer);
