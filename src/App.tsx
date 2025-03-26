import React, { ReactNode } from 'react';
import './App.css';
import { MusicApp } from './components/musicApp';
import { LoginComponent } from './pages/auth/login';
import { ResetPasswordPage } from './pages/auth/resetPassword';
import { RegisterComponent } from './pages/auth/register';
import { ForgetPasswordPage } from './pages/auth/forget';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getLoginFlag } from './helpers';
import Snackbar from '@mui/material/Snackbar';
import { initSocket } from './common/socket';
import { useSelector, useDispatch } from 'react-redux';
import { selectHintState, selectHintMsg } from 'reducer/rootReducer';
import { SystemActionTypes, CLOSE_HINT } from 'reducer/system/types';
import { Dispatch } from 'redux';

initSocket();

const App: React.FC = () => {
    const hintState = useSelector(selectHintState);
    const hintMsg = useSelector(selectHintMsg);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    return (
        <Router>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={hintState}
                autoHideDuration={1000}
                onClose={(): void => {
                    dispatch({ type: CLOSE_HINT });
                }}
                message={hintMsg}
            />
            <div>
                {/* 将 Switch 替换为 Routes */}
                <Routes>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/reset/:id">
                        <Reset />
                    </Route>
                    <Route path="/forget_password">
                        <ForgetPassword />
                    </Route>
                    <PrivateRoute path="/main">
                        <Main />
                    </PrivateRoute>
                    <Route path="/">
                        <Home />
                    </Route>

                </Routes>
            </div>
        </Router>
    );
};

interface PrivateRouteProps {
    children: ReactNode;
    path: string;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps): JSX.Element => {
    return (
        <Route
            {...rest}
            // 将 render 属性替换为 element 属性
            element={getLoginFlag() ? children : <Navigate to="/login" replace />}
        />
    );
};

const Reset = (): JSX.Element => {
    return <ResetPasswordPage></ResetPasswordPage>;
};

const Home = (): JSX.Element => {
    return <LoginComponent></LoginComponent>;
};

const Register = (): JSX.Element => {
    return <RegisterComponent></RegisterComponent>;
};

const ForgetPassword = (): JSX.Element => {
    return <ForgetPasswordPage></ForgetPasswordPage>;
};

const Main = (): JSX.Element => {
    return (
        <div>
            <MusicApp></MusicApp>
        </div>
    );
};// ... existing code ...

export default App;
