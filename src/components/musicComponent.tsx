import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const audioElement = new Audio('http://localhost:9999/music');

const useStyles = makeStyles({
    root: {
        height: 300,
    },
    icon: {
        size: 800,
    },
    box: {
        height: 100,
        color: 'red',
    },
    thumbers: {
        color: 'green',
    },
    indicator: {
        left: '0%',
    },
});

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);

    const classes = useStyles({});

    useEffect(() => {
        if (duration !== 0) {
            setPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    const logMsg = (): void => {
        console.log(currentTime + '...' + audioElement.currentTime);
    };

    const clickProgress = (e: object): void => {
        // console.log('progress bar clicked');
        console.log(e);
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
            <div>
                <LinearProgress
                    variant="determinate"
                    value={percent}
                    onClick={(e): void => clickProgress(e)}
                ></LinearProgress>
                <Button variant="contained" color="primary" className={classes.indicator}>
                    icon
                </Button>
            </div>
        </div>
    );
};

export default MusicComponent;
