import React from 'react';
import './App.css';
import { MusicApp } from './components/musicApp';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';
import { LoginComponent } from './authComponents/login';
import { RegisterComponent } from './authComponents/register';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
    const [avatar] = useGlobal('avatar');

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/main">
                        <Main />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
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
