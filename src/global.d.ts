import 'reactn';
import './dataInterfaces/music';
import { MusicCollection, MusicComment } from './dataInterfaces/music';

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

        updateComments: (global: State, dispatch: Dispatch, comments: MusicComment[]) => Pick<State, 'comments'>;
        updateCurrentCommentMusicId: (
            global: State,
            dispatch: Dispatch,
            id: number,
        ) => Pick<State, 'currentCommentMusicId'>;

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

        currentMusic: Music;
        musics: Music[];
        musicIndex: number;
        musicLength: number;

        Collections: MusicCollection[];
        currentCollection: MusicCollection;

        currentCommentMusicId: number;

        currentClickUserId: number;

        isPlaying: boolean;

        hintOpen: boolean;
        hintMsg: string;
    }
}
