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
    // const hintState = useSelector(selectHintState);
    // const hintMsg = useSelector(selectHintMsg);

    // const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset/:id" element={<Reset />} />
                    <Route path="/forget_password" element={<ForgetPassword />} />
                    <Route path="/main" element={<Main />} />
                    {/* 将 Home 组件包裹在 Route 中 */}
                    <Route path="/" element={<Home />} /> 
                </Routes>
            </div>
        </Router>
    );
};

interface PrivateRouteProps {
    children: ReactNode;
    path: string;
}

const PrivateRoute = ({ children, path }: PrivateRouteProps) => {
    return (
        <Route
            path={path}
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
};

export default App;
