import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AlbumIcon from '@material-ui/icons/Album';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { fetchNextMusic } from '../service';

const audioElement = new Audio();
audioElement.src = 'http://localhost:9999/1.mp3';
// audioElement.src = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3';
// audioElement.load();
// audioElement.muted = true;
// audioElement
//     .play()
//     .then(() => {
//         console.log('PLAY');
//     })
//     .catch(e => {
//         console.log(e);
//     });
audioElement.autoplay = false;

interface StyleProps {
    percent: string;
}

const useStyles = makeStyles({
    musicFunctionIcon: {
        height: 48,
        width: 48,
    },
    card: {
        display: 'flex',
        boarder: 'solid',
        width: 600,
    },
    bound: {
        paddingTop: 0,
        paddingLeft: 10,
        width: '80%',
        left: 100,
    },
    progress: {
        top: 35,
    },
    indicator: (props: StyleProps) => ({
        left: props.percent,
        top: 21,
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

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        setProps({ percent: (musicPercent - 1).toString() + '%' });
    }, [musicPercent]);

    const logMsg = (): void => {
        console.log(bar.current.getBoundingClientRect());
    };

    const clickProgress = (e: React.MouseEvent<HTMLElement>): void => {
        if (!bar.current) return;
        const x = bar.current.getBoundingClientRect().x;
        const width = bar.current.getBoundingClientRect().width;
        const percent = (e.clientX - x) / width;
        const currentTime = duration * percent;
        setClickPercent(percent);
        if (duration !== 0) {
            audioElement.currentTime = currentTime;
        }
    };

    audioElement.onloadedmetadata = (): void => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
        // setIsPlaying(true);
        console.log('load finished');
    };

    audioElement.ontimeupdate = (): void => {
        setCurrentTime(audioElement.currentTime);
    };

    const changeMusic = (): void => {
        audioElement.src = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3';
    };

    const pausePlay = (): void => {
        if (isPlaying) {
            audioElement.pause();
            setIsPlaying(false);
        } else {
            audioElement
                .play()
                .then(() => {
                    console.log('PLAY');
                })
                .catch(e => {
                    console.log(e);
                });
            setIsPlaying(true);
        }
    };

    const setTime = (): void => {
        audioElement.currentTime = 200;
        setCurrentTime(audioElement.currentTime);
        console.log('set time');
    };

    const skipToNext = (): void => {
        fetchNextMusic(
            name => {
                audioElement.src = name;
                audioElement.autoplay = true;
                setIsPlaying(true);
            },
            e => console.log(e),
        );
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={setTime}>
                set
            </Button>
            <Button variant="contained" color="primary" onClick={logMsg}>
                log
            </Button>
            <Button variant="contained" color="primary" onClick={changeMusic}>
                change
            </Button>
            <h1>{currentTime}</h1>
            <h1>{duration}</h1>
            <h1>musicPercent : {musicPercent}</h1>
            <h1>clickPercent : {clickPercent}</h1>
            <Card className={classes.card}>
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
                <IconButton aria-label="play/pause" onClick={pausePlay}>
                    {isPlaying ? (
                        <PauseIcon className={classes.musicFunctionIcon}></PauseIcon>
                    ) : (
                        <PlayArrowIcon className={classes.musicFunctionIcon}></PlayArrowIcon>
                    )}
                </IconButton>
                <IconButton aria-label="next" onClick={skipToNext}>
                    <SkipNextIcon className={classes.musicFunctionIcon}></SkipNextIcon>
                </IconButton>
            </Card>
            <h1>width : {bar.current ? bar.current.offsetWidth : 0}</h1>
        </div>
    );
};

export default MusicComponent;
