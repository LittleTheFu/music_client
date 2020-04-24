import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Slider from '@material-ui/core/Slider';
import Hidden from '@material-ui/core/Hidden';
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
    card: {
        // display: 'flex',
        // boarder: 'solid',
        // height: 72,
    },
    bound: {
        paddingTop: 0,
        paddingLeft: 10,
        width: '100%',
        left: 100,
    },
    musicSlider: {
        top: 24,
    },
    cover: {
        width: 100,
    },
    volumeRoot: { height: 54, position: 'relative', top: 10 },
    volumeSlier: {},
});

interface PlayBarProps {
    musicPercent: number;
    isPlaying: boolean;
    cover: string;
    volume: number;
    changeMusicPercent: (event: object, value: unknown) => void;
    pausePlay: () => void;
    skipToNext: () => void;
    changeMusicVolume: (event: object, value: unknown) => void;
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
        cover,
        volume,
        changeMusicPercent,
        pausePlay,
        skipToNext,
        changeMusicVolume,
        expand,
        shrink,
        showFullPart,
        clickList,
        volumeUpClick,
        volumeDownClick,
    } = props;
    return (
        <Card className={classes.card} raised={true}>
            <Grid container>
                <Grid item xs={12}>
                    <Slider
                        color="secondary"
                        className={classes.musicSlider}
                        value={musicPercent}
                        onChangeCommitted={changeMusicPercent}
                    ></Slider>
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
                {/* <Hidden xsDown>
                        <CardMedia image={cover} className={classes.cover}></CardMedia>
                    </Hidden> */}

                {/* <div className={classes.volumeRoot}>
                    <Slider
                        orientation="vertical"
                        className={classes.volumeSlier}
                        onChange={changeMusicVolume}
                        value={volume}
                    ></Slider>
                </div> */}
            </Grid>
        </Card>
    );
};
