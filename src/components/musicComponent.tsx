import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const audioElement = new Audio('http://localhost:9999/music');

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (duration !== 0) {
            setPercent(currentTime / duration);
        }
    }, [currentTime, duration]);

    const logMsg = (): void => {
        console.log(currentTime + '...' + audioElement.currentTime);
    };

    audioElement.onloadedmetadata = (): void => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
    };

    audioElement.ontimeupdate = (): void => {
        setCurrentTime(audioElement.currentTime);
    };

    const play = (): void => {
        audioElement.play();
    };

    const pause = (): void => {
        audioElement.pause();
    };

    const setTime = (): void => {
        audioElement.currentTime = 10;
        setCurrentTime(audioElement.currentTime);
        console.log('set time');
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={play}>
                play
            </Button>
            <Button variant="contained" color="primary" onClick={pause}>
                pause
            </Button>
            <Button variant="contained" color="primary" onClick={setTime}>
                set
            </Button>
            <Button variant="contained" color="primary" onClick={logMsg}>
                log
            </Button>
            <h1>{currentTime}</h1>
            <h1>{duration}</h1>
            <h1>{percent}</h1>
        </div>
    );
};

export default MusicComponent;
