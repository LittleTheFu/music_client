import 'reactn';
import './dataInterfaces/music';
import { MusicCollection } from './dataInterfaces/music';

declare module 'reactn/default' {
    export interface Reducers {
        updatePlayListMusics: (global: State, dispatch: Dispatch, musics: Music[]) => Pick<State, 'playListMusics'>;
        updateMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'currentMusic' | 'musics'>;
        updateCurrentMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'currentMusic'>;
        updateMusics: (global: State, dispatch: Dispatch, musics: Music[]) => Pick<State, 'musics'>;
        updateMusicInPersoalListState: (global: State, dispatch: Dispatch) => Pick<State, 'musics'>;
    }

    export interface State {
        avatar: string;
        userId: string;
        isLogin: boolean;
        drawerOpen: boolean;
        loginModalOpen: boolean;
        regModalOpen: boolean;
        currentMusic: Music;
        musics: Music[];
        playListMusics: Music[];
        Collections: MusicCollection[];
    }
}
