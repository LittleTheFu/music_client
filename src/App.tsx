import React, { Component, ReactNode } from 'react';
import './App.css';
import { MusicApp } from './components/musicApp';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';
import { LoginComponent } from './authComponents/login';
import { RegisterComponent } from './authComponents/register';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { isLogin } from './globals';

const App: React.FC = () => {
    const [avatar] = useGlobal('avatar');

    return (
        <Router>
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
            render={({ location }) =>
                isLogin() ? (
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
