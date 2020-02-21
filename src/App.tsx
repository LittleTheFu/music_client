import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MusicApp } from './components/musicApp';

const App: React.FC = () => {
    return (
        <div>
            <MusicApp></MusicApp>
        </div>
    );
};

export default App;
