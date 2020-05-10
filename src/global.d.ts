import 'reactn';
import './dataInterfaces/interface';
import { MusicCollection } from './dataInterfaces/interface';

declare module 'reactn/default' {
    export interface Reducers {
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

        updateToNextMusic: (global: State, dispatch: Dispatch) => Pick<State, 'currentMusic' | 'musicIndex'>;
    }

    export interface State {
        meId: number;

        drawerOpen: boolean;

        refreshMusicFlag: boolean;

        currentMusicId: number;
        currentMusic: Music;
        musics: Music[];
        musicIndex: number;
        musicLength: number;

        Collections: MusicCollection[];
        currentCollection: MusicCollection;

        currentClickUserId: number;

        isPlaying: boolean;

        hintOpen: boolean;
        hintMsg: string;
    }
}
