import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AlbumIcon from '@material-ui/icons/Album';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const audioElement = new Audio('http://localhost:9999/music');

interface StyleProps {
    percent: string;
}

const useStyles = makeStyles({
    bound: {
        position: 'relative',
        width: '50%',
        left: 100,
    },
    progress: {},
    indicator: (props: StyleProps) => ({
        left: props.percent,
        top: -13,
        position: 'relative',
    }),
});

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);
    const [clickPercent, setClickPercent] = useState(0);

    const [props, setProps] = useState({ percent: '90%' });
    const classes = useStyles(props);

    const bar = useRef(null);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        setProps({ percent: (musicPercent - 1).toString() + '%' });
    }, [musicPercent]);

    // useEffect(() => {
    //     if (duration !== 0) {
    //         setCurrentTime(duration * clickPercent);
    //     }
    // }, [clickPercent]);

    const logMsg = (): void => {
        // console.log(currentTime + '...' + audioElement.currentTime);
        console.log(bar.current.getBoundingClientRect());
    };

    const clickProgress = (e: React.MouseEvent<HTMLElement>): void => {
        // console.log(e.clientX + ' : clientX');
        // console.log(e.pageX + ' : pageX');
        // console.log(e.movementX + ' : movmentX');
        // console.log(e.screenX + ' : screenX');
        if (!bar.current) return;
        const x = bar.current.getBoundingClientRect().x;
        const width = bar.current.getBoundingClientRect().width;
        const percent = (e.clientX - x) / width;
        const currentTime = duration * percent;
        setClickPercent(percent);
        if (duration !== 0) {
            audioElement.currentTime = currentTime;
            setCurrentTime(currentTime);
        }
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
        audioElement.currentTime = 200;
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
            <h1>musicPercent : {musicPercent}</h1>
            <h1>clickPercent : {clickPercent}</h1>
            <div className={classes.bound}>
                <LinearProgress
                    ref={bar}
                    className={classes.progress}
                    variant="determinate"
                    value={musicPercent}
                    onClick={(e): void => clickProgress(e)}
                ></LinearProgress>
                <AlbumIcon className={classes.indicator} color="secondary"></AlbumIcon>
            </div>
            <h1>width : {bar.current ? bar.current.offsetWidth : 0}</h1>
        </div>
    );
};

export default MusicComponent;
