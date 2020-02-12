import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import MusicComponent from './components/musicComponent';

const App: React.FC = () => {
    return (
        <div>
            <MusicComponent></MusicComponent>
            <Button variant="contained" color="primary">
                你好，世界
            </Button>
        </div>
    );
};

export default App;
