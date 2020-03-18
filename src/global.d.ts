import 'reactn';
import './dataInterfaces/music';
import { MusicCollection } from './dataInterfaces/music';

declare module 'reactn/default' {
    export interface Reducers {
        updatePlayListMusics: (global: State, dispatch: Dispatch, musics: Music[]) => Pick<State, 'playListMusics'>;
        updateMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'currentMusic' | 'musics'>;
        updateCurrentMusic: (
            global: State,
            dispatch: Dispatch,
            music: Music,
        ) => Pick<State, 'currentMusic' | 'musicIndex'>;
        updateMusics: (
            global: State,
            dispatch: Dispatch,
            musics: Music[],
        ) => Pick<State, 'musics' | 'musicIndex' | 'musicLength' | 'currentMusic'>;
        updateMusicInPersoalListState: (global: State, dispatch: Dispatch) => Pick<State, 'musics'>;
        updateToNextMusic: (global: State, dispatch: Dispatch) => Pick<State, 'currentMusic' | 'musicIndex'>;
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
        musicIndex: number;
        musicLength: number;

        playListMusics: Music[];
        Collections: MusicCollection[];

        isPlaying: boolean;
    }
}
