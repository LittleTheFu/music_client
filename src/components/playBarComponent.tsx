import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    musicFunctionIcon: {
        height: 48,
        width: 48,
    },
    card: {
        display: 'flex',
        boarder: 'solid',
        // width: 600,
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

interface PlayBarProps {
    musicPercent: number;
    isPlaying: boolean;
    cover: string;
    volumn: number;
    changeMusicPercent: (event: object, value: unknown) => void;
    pausePlay: () => void;
    skipToNext: () => void;
    changeMusicVolumn: (event: object, value: unknown) => void;
}

export const PlayBarComponent: React.FC<PlayBarProps> = (props: PlayBarProps) => {
    const classes = useStyles({});
    const {
        musicPercent,
        isPlaying,
        cover,
        volumn,
        changeMusicPercent,
        pausePlay,
        skipToNext,
        changeMusicVolumn,
    } = props;
    return (
        <Card className={classes.card} raised={true}>
            <div className={classes.bound}>
                <Slider
                    color="secondary"
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
                    onChange={changeMusicVolumn}
                    value={volumn}
                ></Slider>
            </div>
        </Card>
    );
};

// export default PlayBarComponent;
