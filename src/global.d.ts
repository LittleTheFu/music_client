import 'reactn';
import './dataInterfaces/music';
import { MusicCollection, MusicComment } from './dataInterfaces/music';

declare module 'reactn/default' {
    export interface Reducers {
        updatePlayListMusics: (global: State, dispatch: Dispatch, musics: Music[]) => Pick<State, 'playListMusics'>;
        updateMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'currentMusic' | 'musics'>;

        updateCommentModalState: (
            global: State,
            dispatch: Dispatch,
            isOpen: boolean,
        ) => Pick<State, 'commentModalOpen'>;

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

        updateCollectionInfoMusics: (
            global: State,
            dispatch: Dispatch,
            musics: Music[],
        ) => Pick<State, 'collectionInfoData'>;
    }

    export interface State {
        avatar: string;
        userId: string;
        meId: number;
        isLogin: boolean;

        drawerOpen: boolean;

        currentMusic: Music;
        musics: Music[];
        musicIndex: number;
        musicLength: number;

        playListMusics: Music[];
        Collections: MusicCollection[];
        currentCollection: MusicCollection;

        collectionInfoModalOpen: boolean;
        collectionInfoData: Music[];

        commentModalOpen: boolean;
        comments: MusicComment[];
        currentCommentMusicId: number;

        userCardModalOpen: boolean;
        currentClickUserId: number;

        isPlaying: boolean;
    }
}
