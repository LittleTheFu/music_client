import 'reactn';

declare module 'reactn/default' {
    export interface State {
        avatar: string;
        isLogin: boolean;
        drawerOpen: boolean;
        loginModalOpen: boolean;
    }
}
