import 'reactn';
import './common/interface';
import { MusicCollection } from './common/interface';

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

        openHint: (global: State, dispatch: Dispatch, msg: string) => Pick<State, 'hintMsg' | 'hintOpen'>;

        updateNewMailHint: (global: State, dispatch: Dispatch, hint: boolean) => Pick<State, 'newMailHint'>;
    }

    export interface State {
        newMailHint: boolean;

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
