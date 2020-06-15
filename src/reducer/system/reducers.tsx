// src/store/system/reducers.ts

import {
    AllState,
    SystemActionTypes,
    CLOSE_HINT,
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
import { dummyMusic } from 'common/interface';

const initialState: AllState = {
    hintOpen: false,
    hintMsg: 'msg',

    showBannedMask: false,
    drawerOpen: false,

    isPlaying: false,

    refreshMailPage: false,
    unreadMailCnt: 0,

    refreshMusicFlag: false,

    currentMusicId: 0,
    currentMusic: null,

    musics: [],
    musicIndex: -1,
};

export function systemReducer(state = initialState, action: SystemActionTypes): AllState {
    console.log(action);
    switch (action.type) {
        case UPDATE_UNREAD_MAIL_COUNT:
        case UPDATE_PLAY_STATE:
        case UPDATE_MUSIC_REFRESHER: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case REFRESH_MAIL_PAGE: {
            return {
                ...state,
                refreshMailPage: !state.refreshMailPage,
            };
        }
        case INCREASE_UNREAD_MAIL_COUNT: {
            return {
                ...state,
                unreadMailCnt: state.unreadMailCnt + 1,
            };
        }
        case DECREASE_UNREAD_MAIL_COUNT: {
            return {
                ...state,
                unreadMailCnt: state.unreadMailCnt - 1,
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
        case UPDATE_MUSIC: {
            return {
                ...state,
                currentMusic:
                    state.currentMusic.id === action.payload.music.id ? action.payload.music : state.currentMusic,
                musics: state.musics.map(m => {
                    if (m.id === action.payload.music.id) {
                        return action.payload.music;
                    } else {
                        return m;
                    }
                }),
                currentMusicId:
                    state.currentMusic.id === action.payload.music.id ? action.payload.music.id : state.currentMusic.id,
            };
        }
        case UPDATE_CURRENT_MUSIC: {
            return {
                ...state,
                currentMusic: action.payload.music,
                musicIndex: state.musics.indexOf(action.payload.music),
                currentMusicId: action.payload.music.id,
                refreshMusicFlag: true,
            };
        }
        case UPDATE_MUSICS: {
            return {
                ...state,
                musics: action.payload.musics,
                musicIndex: 0,
                currentMusic: state.musics[0] ? state.musics[0] : dummyMusic,
                currentMusicId: state.musics[0] ? state.musics[0].id : dummyMusic.id,
                refreshMusicFlag: true,
            };
        }
        case JUMP_TO_NEXT_MUSIC: {
            return {
                ...state,
                musicIndex: (state.musicIndex + 1) % state.musics.length,
                currentMusic: state.musics[(state.musicIndex + 1) % state.musics.length],
                currentMusicId: state.musics[(state.musicIndex + 1) % state.musics.length].id,
                refreshMusicFlag: true,
            };
        }
        default:
            return state;
    }
}
