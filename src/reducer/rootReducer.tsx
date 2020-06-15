// src/store/index.ts

import { systemReducer } from './system/reducers';
import { chatReducer } from './chat/reducers';
import { combineReducers, createStore } from 'redux';
import { Music } from 'common/interface';
import { composeWithDevTools } from 'redux-devtools-extension';

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

export const selectDrawerState = (state: RootState): boolean => {
    return state.system.drawerOpen;
};

export const selectPlayState = (state: RootState): boolean => {
    return state.system.isPlaying;
};

export const selectUnreadMailCount = (state: RootState): number => {
    return state.system.unreadMailCnt;
};

export const selectMailRefresher = (state: RootState): boolean => {
    return state.system.refreshMailPage;
};

export const selectMusics = (state: RootState): Music[] => {
    return state.system.musics;
};

export const selectCurrentMusic = (state: RootState): Music => {
    return state.system.currentMusic;
};

export const selectCurrentMusicId = (state: RootState): number => {
    return state.system.currentMusicId;
};

export const selectRefreshMusicFlag = (state: RootState): boolean => {
    return state.system.refreshMusicFlag;
};

export const store = createStore(rootReducer, composeWithDevTools());
