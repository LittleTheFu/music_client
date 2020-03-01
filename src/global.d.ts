import 'reactn';
import './dataInterfaces/music';

declare module 'reactn/default' {
    export interface Reducers {
        updateMusic: (global: State, dispatch: Dispatch, music: Music) => Pick<State, 'update_music'>;
    }

    export interface State {
        avatar: string;
        userId: string;
        isLogin: boolean;
        drawerOpen: boolean;
        loginModalOpen: boolean;
        currentMusic: Music;
        musics: Music[];
    }
}
