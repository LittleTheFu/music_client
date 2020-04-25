import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MusicInfoComponent } from './musicInfoComponent';
import { Music } from '../dataInterfaces/music';
import { PlayBarComponent } from './playBarComponent';
import { CollectionInfoModal } from './collectionInfoModal';
import { CommentModal } from './commentModal';
import { UserCardModal } from '../otherComponents/userCardModal';
import { useGlobal, useDispatch } from 'reactn';
import { useHistory } from 'react-router-dom';
import { postLikeMusic, postDislikeMusic } from '../service';
import { updateMusic, updateCurrentMusic, updateToNextMusic } from '../globals';
import Grid from '@material-ui/core/Grid';
import { MusicListDrawer } from './musicListDrawer';
import Snackbar from '@material-ui/core/Snackbar';

interface MusicComponentProps {
    audioElement: HTMLAudioElement;
    musics: Music[];
}

const useStyles = makeStyles({
    paper: {
        padding: 0,
    },
});

export const MusicComponent: React.FC<MusicComponentProps> = (props: MusicComponentProps) => {
    const { audioElement } = props;

    const updateMusicAfterClickLike = useDispatch(updateMusic);
    const updateCurerntMusicInfo = useDispatch(updateCurrentMusic);
    const updateToTheNextMusic = useDispatch(updateToNextMusic);

    const [currentTheMusic] = useGlobal('currentMusic');
    const [currentMusics] = useGlobal('musics');

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [musicPercent, setMusicPercent] = useState(0);
    const [showFullPart, setShowFullPart] = useState(true);

    const [musicListDrawerOpen, setMusicListDrawerOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const history = useHistory();

    const classes = useStyles({});

    const [volume, setVolume] = useState(0.5);
    audioElement.volume = volume;

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audioElement.src = currentTheMusic.address;
        audioElement.autoplay = true;
        setIsPlaying(true);
    }, [currentTheMusic.id]);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        audioElement.volume = volume;
    }, [volume]);

    useEffect(() => {
        return (): void => {
            audioElement.pause();
            audioElement.src = '';
        };
    }, []);

    const changeMusicPercent = (event: object, value: unknown): void => {
        const percent = value as number;
        const currentTime = (duration * percent) / 100.0;

        if (duration !== 0) {
            audioElement.currentTime = currentTime;
        }
    };

    const expand = (): void => {
        setShowFullPart(true);
    };

    const shrink = (): void => {
        setShowFullPart(false);
    };

    const clickList = (): void => {
        setMusicListDrawerOpen(true);
    };

    const currentMusicInfoLikeClick = (): void => {
        postLikeMusic(currentTheMusic.id, updateMusicAfterClickLike, console.log);
    };

    const currentMusicInfoDislikeClick = (): void => {
        postDislikeMusic(currentTheMusic.id, updateMusicAfterClickLike);
    };

    const currentMusicCommentClick = (): void => {
        history.push(`/main/music_comment/` + currentTheMusic.id);
    };

    const changeMusicVolume = (event: object, value: unknown): void => {
        setVolume((value as number) / 100.0);
    };

    audioElement.onloadedmetadata = (): void => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
    };

    audioElement.ontimeupdate = (): void => {
        if (!audioElement.paused) {
            setCurrentTime(audioElement.currentTime);
        }
    };

    const pausePlay = (): void => {
        if (isPlaying) {
            audioElement.pause();
            setIsPlaying(false);
        } else {
            audioElement.play();
            setIsPlaying(true);
        }
    };

    const volumeUp = (): void => {
        setVolume(Math.min(1, volume + 0.05));
        setSnackOpen(true);
    };

    const volumeDown = (): void => {
        setVolume(Math.max(0.0, volume - 0.05));
        setSnackOpen(true);
    };

    const playMusic = (m: Music): void => {
        updateCurerntMusicInfo(m);
    };

    const skipToNext = (): void => {
        updateToTheNextMusic();
    };

    const drawerCloseClick = (): void => {
        setMusicListDrawerOpen(false);
    };

    const setSnackClose = (): void => {
        setSnackOpen(false);
    };

    audioElement.onended = skipToNext;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackOpen}
                autoHideDuration={700}
                onClose={setSnackClose}
                message={'volume : ' + Math.round(volume * 100) + '%'}
            />
            <CollectionInfoModal></CollectionInfoModal>
            <CommentModal></CommentModal>
            <UserCardModal></UserCardModal>
            <Grid item xs={12}>
                <div>
                    <Paper variant="outlined" className={classes.paper}>
                        <MusicListDrawer
                            open={musicListDrawerOpen}
                            closeClick={drawerCloseClick}
                            musics={currentMusics}
                            currentMusic={currentTheMusic}
                            clickMusic={playMusic}
                        ></MusicListDrawer>

                        <PlayBarComponent
                            musicPercent={musicPercent}
                            isPlaying={isPlaying}
                            cover={currentTheMusic.cover}
                            volume={volume}
                            changeMusicPercent={changeMusicPercent}
                            pausePlay={pausePlay}
                            skipToNext={skipToNext}
                            changeMusicVolume={changeMusicVolume}
                            expand={expand}
                            shrink={shrink}
                            showFullPart={showFullPart}
                            clickList={clickList}
                            volumeUpClick={volumeUp}
                            volumeDownClick={volumeDown}
                        ></PlayBarComponent>
                        {showFullPart ? (
                            <MusicInfoComponent
                                currentTime={currentTime}
                                music={currentTheMusic}
                                likeClick={currentMusicInfoLikeClick}
                                dislikeClick={currentMusicInfoDislikeClick}
                                commentClick={currentMusicCommentClick}
                            ></MusicInfoComponent>
                        ) : (
                            <div></div>
                        )}
                    </Paper>
                </div>
            </Grid>
        </div>
    );
};
