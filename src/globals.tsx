import { setGlobal } from 'reactn';
import { Music, dummyMusic, MusicCollection } from './dataInterfaces/music';
import { State, Dispatch } from 'reactn/default';

export const setToken = (token: string): void => {
    sessionStorage.setItem('jwtToken', token);
};

export const getToken = (): string => {
    return sessionStorage.getItem('jwtToken') || '';
};

export const setLoginFlag = (isLogin: boolean): void => {
    const flag = isLogin ? 1 : 0;
    sessionStorage.setItem('isLogin', flag.toString());
};

export const getLoginFlag = (): boolean => {
    const flag = sessionStorage.getItem('isLogin') || '';
    return flag === '1' ? true : false;
};

export const setMeAvatar = (avatar: string): void => {
    sessionStorage.setItem('avatar', avatar);
};

export const getMeAvatar = (): string => {
    return sessionStorage.getItem('avatar') || '';
};

export const setMeId = (id: number): void => {
    sessionStorage.setItem('meId', id.toString());
};

export const getMeId = (): number => {
    const strId = sessionStorage.getItem('meId') || '';
    const id = parseInt(strId);

    if (id === NaN) {
        return 0;
    }

    return id;
};

setGlobal({
    meId: 0,

    drawerOpen: false,

    currentMusicId: 0,
    currentMusic: dummyMusic,
    musics: [],
    musicIndex: -1,
    musicLength: 0,

    Collections: [],

    currentClickUserId: 0,

    isPlaying: false,

    hintOpen: false,
    hintMsg: '',
});

export const openHint = (global: State, dispatch: Dispatch, msg: string): Pick<State, 'hintMsg' | 'hintOpen'> => ({
    hintMsg: msg,
    hintOpen: true,
});

export const updateMusic = (
    global: State,
    dispatch: Dispatch,
    music: Music,
): Pick<State, 'currentMusic' | 'musics' | 'currentMusicId'> => ({
    currentMusic: global.currentMusic.id === music.id ? music : global.currentMusic,
    musics: global.musics.map(m => {
        if (m.id === music.id) {
            return music;
        } else {
            return m;
        }
    }),
    currentMusicId: global.currentMusic.id === music.id ? music.id : global.currentMusic.id,
});

export const updateCurrentMusic = (
    global: State,
    dispatch: Dispatch,
    music: Music,
): Pick<State, 'currentMusic' | 'musicIndex' | 'currentMusicId'> => ({
    currentMusic: music,
    musicIndex: global.musics.indexOf(music),
    currentMusicId: music.id,
});

export const updateMusics = (
    global: State,
    dispatch: Dispatch,
    musics: Music[],
): Pick<State, 'musics' | 'musicIndex' | 'musicLength' | 'currentMusic' | 'currentMusicId'> => ({
    musics: musics.map(m => {
        m.isInPlayList = false;

        return m;
    }),
    musicIndex: 0,
    musicLength: musics.length,
    currentMusic: musics[0] ? musics[0] : dummyMusic,
    currentMusicId: musics[0] ? musics[0].id : dummyMusic.id,
});

export const updateMusicInPersoalListState = (global: State, dispatch: Dispatch): Pick<State, 'musics'> => ({
    musics: global.musics.map(m => {
        m.isInPlayList = false;

        return m;
    }),
});

export const updateToNextMusic = (
    global: State,
    dispatch: Dispatch,
): Pick<State, 'currentMusic' | 'musicIndex' | 'currentMusicId'> => ({
    musicIndex: (global.musicIndex + 1) % global.musics.length,
    currentMusic: global.musics[(global.musicIndex + 1) % global.musics.length],
    currentMusicId: global.musics[(global.musicIndex + 1) % global.musics.length].id,
});

export const updateCollections = (
    global: State,
    dispatch: Dispatch,
    collections: MusicCollection[],
): Pick<State, 'Collections'> => ({
    Collections: collections,
});
