import 'reactn';
import './dataInterfaces/music';
import { MusicCollection } from './dataInterfaces/music';

declare module 'reactn/default' {
    export interface Reducers {
        updateMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'currentMusic' | 'musics'>;

        updateAvatar: (global: State, dispatch: Dispatch, avatar: string) => Pick<State, 'avatar'>;

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

        updateCollections: (
            global: State,
            dispatch: Dispatch,
            collections: MusicCollection[],
        ) => Pick<State, 'Collections'>;
    }

    export interface State {
        meId: number;

        drawerOpen: boolean;

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
