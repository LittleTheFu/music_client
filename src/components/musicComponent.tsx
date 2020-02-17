import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { fetchNextMusic } from '../service';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';

const audioElement = new Audio();
audioElement.src = 'http://localhost:9999/music/1.mp3';
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
        height: 72,
    },
    bound: {
        paddingTop: 0,
        paddingLeft: 10,
        width: '80%',
        left: 100,
    },
    musicSlider: {
        top: 24,
    },
    cover: {
        width: 100,
    },
    volumnRoot: { height: 54, position: 'relative', top: 10 },
    volumnSlier: {},
});

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);
    const [cover, setCover] = useState('http://localhost:9999/album/0.png');

    const classes = useStyles({});

    const [volumn, setVolumn] = useState(0.5);
    audioElement.volume = volumn;

    const bar = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        audioElement.volume = volumn;
        console.log(audioElement.volume);
    }, [volumn]);

    const logMsg = (): void => {
        console.log(bar.current.getBoundingClientRect());
    };

    const changeMusicPercent = (event: object, value: unknown): void => {
        const percent = value as number;
        console.log(percent);
        const currentTime = (duration * percent) / 100.0;
        if (duration !== 0) {
            audioElement.currentTime = currentTime;
        }
    };

    const changeMusicVolumn = (event: object, value: unknown): void => {
        setVolumn((value as number) / 100.0);
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
            (name, cover) => {
                audioElement.src = name;
                audioElement.autoplay = true;
                setCover(cover);
                setIsPlaying(true);
            },
            e => console.log(e),
        );
    };

    audioElement.onended = skipToNext;

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
            <h4>songName</h4>
            <h4>artist-album</h4>
            <Paper variant="outlined">
                <Card className={classes.card}>
                    <div className={classes.bound}>
                        <Slider
                            className={classes.musicSlider}
                            value={musicPercent}
                            onChangeCommitted={changeMusicPercent}
                        ></Slider>
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
                    <CardMedia image={cover} className={classes.cover}></CardMedia>
                    <div className={classes.volumnRoot}>
                        <Slider
                            orientation="vertical"
                            className={classes.volumnSlier}
                            onChangeCommitted={changeMusicVolumn}
                        ></Slider>
                    </div>
                </Card>
            </Paper>
            <h1>width : {bar.current ? bar.current.offsetWidth : 0}</h1>
        </div>
    );
};

export default MusicComponent;
