import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AlbumIcon from '@material-ui/icons/Album';

const audioElement = new Audio('http://localhost:9999/music');

interface StyleProps {
    percent: string;
}

const useStyles = makeStyles({
    // one: {
    //     width: 200,
    //     height: 200,
    //     backgroundColor: 'red',
    //     zIndex: 5000,
    //     position: 'relative',
    //     opacity: 0.5,
    // },
    // inner: {
    //     width: 150,
    //     height: 150,
    //     backgroundColor: 'pink',
    //     zIndex: 100,
    //     position: 'relative',
    // },
    // two: {
    //     width: 150,
    //     height: 150,
    //     backgroundColor: 'green',
    //     marginTop: -20,
    //     position: 'relative',
    //     zIndex: 1000,
    // },
    // three: {
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'blue',
    //     position: 'absolute',
    //     zIndex: 10000,
    // },
    bound: {
        // padding: 20,
        // height: 20,
        // position: 'absolute',
    },
    progress: {
        // marginTop: 30,
    },
    indicator: (props: StyleProps) => ({
        // marginTop: -100,
        // padding: -20,
        // border: -20,
        left: props.percent,
        top: -13,
        position: 'relative',
        // position: 'absolute',
        // optical: 0.5,
    }),
});

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);

    const [props, setProps] = useState({ percent: '90%' });
    // const props = { percent: '90%' };
    const classes = useStyles(props);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        setProps({ percent: (musicPercent - 1).toString() + '%' });
    }, [musicPercent]);

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
            <h1>{musicPercent}</h1>
            <div className={classes.bound}>
                <LinearProgress
                    className={classes.progress}
                    variant="determinate"
                    value={musicPercent}
                    onClick={(e): void => clickProgress(e)}
                ></LinearProgress>
                <AlbumIcon className={classes.indicator} color="secondary"></AlbumIcon>
                {/* <Button variant="contained" color="primary" className={classes.indicator}>
                    icon
                </Button> */}
            </div>
            {/* <div>
                <div className={classes.one}>
                    <div className={classes.inner}></div>
                </div>
                <div className={classes.two}></div>
                <div className={classes.three}></div>
            </div> */}
        </div>
    );
};

export default MusicComponent;
