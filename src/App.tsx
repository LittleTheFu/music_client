import React from 'react';
import './App.css';
import { MusicApp } from './components/musicApp';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';

const App: React.FC = () => {
    const [avatar] = useGlobal('avatar');

    return (
        <div>
            <h1>{avatar}</h1>
            <MusicApp></MusicApp>
        </div>
    );
};

export default App;
