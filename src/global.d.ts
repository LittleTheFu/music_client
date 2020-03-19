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
        // updateCurrentCollection: (global: State, dispatch: Dispatch, name: string) => Pick<State, 'currentCollection'>;
        updateCollections: (
            global: State,
            dispatch: Dispatch,
            collections: MusicCollection[],
        ) => Pick<State, 'Collections'>;

        updateCollectionInfoMusics: (
            global: State,
            dispatch: Dispatch,
            musics: Music[],
        ) => Pick<State, 'collectionInfoData'>;
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
        currentCollection: MusicCollection;

        collectionInfoModalOpen: boolean;
        collectionInfoData: Music[];

        isPlaying: boolean;
    }
}
