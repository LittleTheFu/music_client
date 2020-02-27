import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MusicApp } from './components/musicApp';
import { AppContextProvider, sampleAppContext } from './globalContext';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';

import { setGlobal } from 'reactn';

setGlobal({
    avatar: 'anonymous.png',
});

const App: React.FC = () => {
    const [avatar, setAvatar] = useGlobal('avatar');

    return (
        <div>
            <h1>{avatar}</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={(): void => {
                    sampleAppContext.gContextName = 'gogogo';
                }}
            >
                test
            </Button>
            <AppContextProvider value={sampleAppContext}>
                <MusicApp></MusicApp>
            </AppContextProvider>
        </div>
    );
};

export default App;
