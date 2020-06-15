import { setGlobal, addReducer } from 'reactn';
import { Music, dummyMusic } from './common/interface';
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

export const setMeName = (name: string): void => {
    sessionStorage.setItem('name', name);
};

export const getMeName = (): string => {
    return sessionStorage.getItem('name') || '';
};

export const setMeId = (id: number): void => {
    sessionStorage.setItem('meId', id.toString());
};

export const getMeId = (): number => {
    const strId = sessionStorage.getItem('meId') || '';
    const id = parseInt(strId);

    if (isNaN(id)) {
        return 0;
    }

    return id;
};

export const setMeUnreadMailNum = (num: number): void => {
    sessionStorage.setItem('unread', num.toString());
};

export const getMeUnreadMailNum = (): number => {
    const strNum = sessionStorage.getItem('unread') || '';
    const num = parseInt(strNum);

    if (isNaN(num)) {
        return 0;
    }

    return num;
};

setGlobal({
    refreshMailPage: false,
    unreadMailCnt: 0,

    meId: 0,

    refreshMusicFlag: false,

    currentMusicId: 0,
    // currentMusic: dummyMusic,
    currentMusic: null,

    musics: [],
    musicIndex: -1,
    musicLength: 0,

    Collections: [],

    isPlaying: false,

    hintOpen: false,
    hintMsg: '',
});

addReducer('openHint', (global: State, dispatch: Dispatch, msg: string) => ({
    hintMsg: msg,
    hintOpen: true,
}));

// export const openHint = (global: State, dispatch: Dispatch, msg: string): Pick<State, 'hintMsg' | 'hintOpen'> => ({
//     hintMsg: msg,
//     hintOpen: true,
// });

addReducer('updateUnreadMailCnt', (global: State, dispatch: Dispatch, cnt: number) => ({
    unreadMailCnt: cnt,
}));

export const decUnreadMailCnt = (global: State): Pick<State, 'unreadMailCnt'> => ({
    unreadMailCnt: global.unreadMailCnt - 1,
});

addReducer('incUnreadMailCnt', (global: State) => ({
    unreadMailCnt: global.unreadMailCnt + 1,
}));

addReducer('setRefreshMailPageFlag', (global: State) => ({
    refreshMailPage: !global.refreshMailPage,
}));

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
): Pick<State, 'currentMusic' | 'musicIndex' | 'currentMusicId' | 'refreshMusicFlag'> => ({
    currentMusic: music,
    musicIndex: global.musics.indexOf(music),
    currentMusicId: music.id,
    refreshMusicFlag: true,
});

export const updateMusics = (
    global: State,
    dispatch: Dispatch,
    musics: Music[],
): Pick<State, 'musics' | 'musicIndex' | 'musicLength' | 'currentMusic' | 'currentMusicId' | 'refreshMusicFlag'> => ({
    musics: musics.map(m => {
        m.isInPlayList = false;

        return m;
    }),
    musicIndex: 0,
    musicLength: musics.length,
    currentMusic: musics[0] ? musics[0] : dummyMusic,
    currentMusicId: musics[0] ? musics[0].id : dummyMusic.id,
    refreshMusicFlag: true,
});

export const updateToNextMusic = (
    global: State,
): Pick<State, 'currentMusic' | 'musicIndex' | 'currentMusicId' | 'refreshMusicFlag'> => ({
    musicIndex: (global.musicIndex + 1) % global.musics.length,
    currentMusic: global.musics[(global.musicIndex + 1) % global.musics.length],
    currentMusicId: global.musics[(global.musicIndex + 1) % global.musics.length].id,
    refreshMusicFlag: true,
});
