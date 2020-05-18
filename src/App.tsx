import React, { ReactNode } from 'react';
import './App.css';
import { MusicApp } from './components/musicApp';
import { LoginComponent } from './pages/auth/login';
import { RegisterComponent } from './pages/auth/register';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getLoginFlag } from './globals';
import Snackbar from '@material-ui/core/Snackbar';
import { useGlobal } from 'reactn';
import io from 'socket.io-client';

const socket: SocketIOClient.Socket = io('localhost:9999');
socket.on('connect', function() {
    console.log('Connected');

    socket.emit('events', { test: 'test' });
    socket.emit('identity', 0, (response: any) => console.log('Identity:', response));
});
socket.on('events', function(data: any) {
    console.log('event', data);
});
socket.on('exception', function(data: any) {
    console.log('event', data);
});
socket.on('disconnect', function() {
    console.log('Disconnected');
});

const App: React.FC = () => {
    const [hintOpen, setHintOpen] = useGlobal('hintOpen');
    const [hintMsg] = useGlobal('hintMsg');

    return (
        <Router>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={hintOpen}
                autoHideDuration={1000}
                onClose={(): void => {
                    setHintOpen(false);
                }}
                message={hintMsg}
            />
            <div>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <PrivateRoute path="/main">
                        <Main />
                    </PrivateRoute>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
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
            render={(): React.ReactNode =>
                getLoginFlag() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                        }}
                    />
                )
            }
        />
    );
};

const Home = (): JSX.Element => {
    return <LoginComponent></LoginComponent>;
};

const Register = (): JSX.Element => {
    return <RegisterComponent></RegisterComponent>;
};

const Main = (): JSX.Element => {
    return (
        <div>
            <MusicApp></MusicApp>
        </div>
    );
};

export default App;
