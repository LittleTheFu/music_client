import { setGlobal } from 'reactn';
import { Music, dummyMusic, MusicCollection, MusicComment } from './dataInterfaces/music';
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

    currentMusic: dummyMusic,
    musics: [],
    musicIndex: -1,
    musicLength: 0,

    Collections: [],

    commentModalOpen: false,
    comments: [],
    currentCommentMusicId: 0,

    userCardModalOpen: false,
    currentClickUserId: 0,

    isPlaying: false,

    hintOpen: false,
    hintMsg: '',
});

export const openHint = (global: State, dispatch: Dispatch, msg: string): Pick<State, 'hintMsg' | 'hintOpen'> => ({
    hintMsg: msg,
    hintOpen: true,
});

export const updateCommentModalState = (
    global: State,
    dispatch: Dispatch,
    isOpen: boolean,
): Pick<State, 'commentModalOpen'> => ({
    commentModalOpen: isOpen,
});

export const updateAvatar = (global: State, dispatch: Dispatch, avatar: string): Pick<State, 'avatar'> => ({
    avatar: avatar,
});

export const updateCurrentCommentMusicId = (
    global: State,
    dispatch: Dispatch,
    id: number,
): Pick<State, 'currentCommentMusicId'> => ({
    currentCommentMusicId: id,
});

export const updateComments = (
    global: State,
    dispatch: Dispatch,
    comments: MusicComment[],
): Pick<State, 'comments'> => ({
    comments: comments,
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

        return m;
    }),
    musicIndex: 0,
    musicLength: musics.length,
    currentMusic: musics[0] ? musics[0] : dummyMusic,
});

export const updateMusicInPersoalListState = (global: State, dispatch: Dispatch): Pick<State, 'musics'> => ({
    musics: global.musics.map(m => {
        m.isInPlayList = false;

        return m;
    }),
});

export const updateToNextMusic = (global: State, dispatch: Dispatch): Pick<State, 'currentMusic' | 'musicIndex'> => ({
    musicIndex: (global.musicIndex + 1) % global.musics.length,
    currentMusic: global.musics[(global.musicIndex + 1) % global.musics.length],
});

export const updateCollections = (
    global: State,
    dispatch: Dispatch,
    collections: MusicCollection[],
): Pick<State, 'Collections'> => ({
    Collections: collections,
});
