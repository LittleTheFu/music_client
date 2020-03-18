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
    musicIndex: -1,
    musicLength: 0,

    playListMusics: [],
    Collections: [],

    isPlaying: false,
});

export const updatePlayListMusics = (
    global: State,
    dispatch: Dispatch,
    musics: Music[],
): Pick<State, 'playListMusics'> => ({
    playListMusics: musics.map(m => {
        m.isInPlayList = true;
        return m;
    }),
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

export const updateCurrentMusic = (
    global: State,
    dispatch: Dispatch,
    music: Music,
): Pick<State, 'currentMusic' | 'musicIndex'> => ({
    currentMusic: music,
    musicIndex: global.musics.indexOf(music),
});

export const updateMusics = (
    global: State,
    dispatch: Dispatch,
    musics: Music[],
): Pick<State, 'musics' | 'musicIndex' | 'musicLength' | 'currentMusic'> => ({
    musics: musics.map(m => {
        m.isInPlayList = false;
        global.playListMusics.forEach(k => {
            if (k.id === m.id) {
                m.isInPlayList = true;
            }
        });
        return m;
    }),
    musicIndex: 0,
    musicLength: musics.length,
    currentMusic: musics[0] ? musics[0] : dummyMusic,
});

export const updateMusicInPersoalListState = (global: State, dispatch: Dispatch): Pick<State, 'musics'> => ({
    musics: global.musics.map(m => {
        m.isInPlayList = false;
        global.playListMusics.forEach(k => {
            if (k.id === m.id) {
                m.isInPlayList = true;
            }
        });
        return m;
    }),
});

export const updateToNextMusic = (global: State, dispatch: Dispatch): Pick<State, 'currentMusic' | 'musicIndex'> => ({
    musicIndex: (global.musicIndex + 1) % global.musics.length,
    currentMusic: global.musics[(global.musicIndex + 1) % global.musics.length],
});
