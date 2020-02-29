import 'reactn';
import './dataInterfaces/music';

declare module 'reactn/default' {
    export interface State {
        avatar: string;
        userId: string;
        isLogin: boolean;
        drawerOpen: boolean;
        loginModalOpen: boolean;
        currentMusic: Music;
    }
}
