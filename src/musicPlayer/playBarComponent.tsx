import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Slider from '@material-ui/core/Slider';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListIcon from '@material-ui/icons/List';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    musicFunctionIcon: {
        height: '100%',
        width: '100%',
    },
});

interface PlayBarProps {
    musicPercent: number;
    isPlaying: boolean;
    volume: number;
    changeMusicPercent: (event: object, value: unknown) => void;
    pausePlay: () => void;
    skipToNext: () => void;
    expand: () => void;
    shrink: () => void;
    showFullPart: boolean;
    clickList: () => void;
    volumeUpClick?: () => void;
    volumeDownClick?: () => void;
}

export const PlayBarComponent: React.FC<PlayBarProps> = (props: PlayBarProps) => {
    const classes = useStyles({});
    const {
        musicPercent,
        isPlaying,
        changeMusicPercent,
        pausePlay,
        skipToNext,
        expand,
        shrink,
        showFullPart,
        clickList,
        volumeUpClick,
        volumeDownClick,
    } = props;
    return (
        <Card raised={true}>
            <Grid container>
                <Grid item xs={12}>
                    <Slider color="secondary" value={musicPercent} onChangeCommitted={changeMusicPercent}></Slider>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} md={1}>
                        <IconButton aria-label="play/pause" onClick={pausePlay}>
                            {isPlaying ? (
                                <PauseIcon className={classes.musicFunctionIcon}></PauseIcon>
                            ) : (
                                <PlayArrowIcon className={classes.musicFunctionIcon}></PlayArrowIcon>
                            )}
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <IconButton aria-label="next" onClick={skipToNext}>
                            <SkipNextIcon className={classes.musicFunctionIcon}></SkipNextIcon>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <IconButton aria-label="volumeup" onClick={volumeUpClick}>
                            <AddIcon className={classes.musicFunctionIcon}></AddIcon>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <IconButton aria-label="volumedown" onClick={volumeDownClick}>
                            <RemoveIcon className={classes.musicFunctionIcon}></RemoveIcon>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        {showFullPart ? (
                            <IconButton aria-label="shrink" onClick={shrink}>
                                <VisibilityOffIcon className={classes.musicFunctionIcon}></VisibilityOffIcon>
                            </IconButton>
                        ) : (
                            <IconButton aria-label="expand" onClick={expand}>
                                <VisibilityIcon className={classes.musicFunctionIcon}></VisibilityIcon>
                            </IconButton>
                        )}
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <IconButton aria-label="musics" onClick={clickList}>
                            <ListIcon className={classes.musicFunctionIcon}></ListIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};
