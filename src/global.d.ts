import 'reactn';

declare module 'reactn/default' {
    export interface State {
        avatar: string;
        userId: string;
        isLogin: boolean;
        drawerOpen: boolean;
        loginModalOpen: boolean;
        // token: string;
    }
}
