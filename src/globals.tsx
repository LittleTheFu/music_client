import { setGlobal } from 'reactn';
import { Music, dummyMusic } from './dataInterfaces/music';
import { State, Dispatch } from 'reactn/default';

let gToken = '';

export const setToken = (token: string): void => {
    gToken = token;
};

export const getToken = (): string => {
    return gToken;
};

export const isTokenExsit = (): boolean => {
    return gToken.length > 0;
};

setGlobal({
    avatar: 'anonymous.png',
    userId: 'guest',
    isLogin: false,
    drawerOpen: false,
    loginModalOpen: false,
    regModalOpen: false,
    currentMusic: dummyMusic,
    musics: [],
    Collections: [],
});

export const updateMusic = (
    global: State,
    dispatch: Dispatch,
    music: Music,
): Pick<State, 'currentMusic' | 'musics'> => ({
    currentMusic: global.currentMusic.id === music.id ? music : global.currentMusic,
    musics: global.musics.map(m => {
        if (m.id === music.id) {
            return music;
        } else {
            return m;
        }
    }),
});

export const updateCurrentMusic = (global: State, dispatch: Dispatch, music: Music): Pick<State, 'currentMusic'> => ({
    currentMusic: music,
});

export const updateMusics = (global: State, dispatch: Dispatch, musics: Music[]): Pick<State, 'musics'> => ({
    musics: musics,
});
