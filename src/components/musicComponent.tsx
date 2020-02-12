import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const MusicComponent: React.FC = () => {
    // const [audioElement] = useState(new Audio('http://localhost:9999/music'));
    // const [audioEl, setAudio] = useState()
    const audioElement = new Audio('http://localhost:9999/music');

    // let currentTime = 0;
    const [currentTime, setCurrentTime] = useState(0);
    // useEffect(() => {
    //     console.log('change');
    // }, [currentTime]);

    const logMsg = (): void => {
        // console.log(audioElement.duration);
        // console.log(audioElement.currentTime);
        // console.log(audioElement.currentSrc);
        console.log(currentTime + '...' + audioElement.currentTime);
    };

    // let currentSrc = '';
    audioElement.onloadedmetadata = (): void => {
        // logMsg();
        // currentSrc = audioElement.currentSrc;
        // console.log('loaded');
        // console.log(audioElement.currentSrc);
        // console.log(currentSrc);
        // setCurrentTime(audioElement.currentTime);
    };

    audioElement.ondurationchange = (): void => {
        // console.log('duration change beg');
        // console.log(audioElement.duration);
        // console.log('duration change end');
    };

    audioElement.ontimeupdate = (): void => {
        // currentTime = audioElement.currentTime;
        setCurrentTime(audioElement.currentTime);
        // console.log('update');
        // console.log(audioElement.currentTime);
    };

    // logMsg();

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
        </div>
    );
};

export default MusicComponent;
