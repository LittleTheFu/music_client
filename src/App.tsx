import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

const App: React.FC = () => {
    return (
        <div>
            <Button variant="contained" color="primary">
                你好，世界
            </Button>
            <audio controls>
                <source src="http://localhost:9999/music" type="audio/mp3" />
            </audio>
        </div>
    );
};

export default App;
