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
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/main">Main</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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

function Home() {
    return <LoginComponent></LoginComponent>;
}

function Register() {
    return <RegisterComponent></RegisterComponent>;
}

function Main() {
    return (
        <div>
            <MusicApp></MusicApp>
        </div>
    );
}

export default App;
