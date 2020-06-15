import React, { useState, useEffect } from 'react';
import { MusicInfoComponent } from './musicInfoComponent';
import { Music } from '../common/interface';
import { PlayBarComponent } from './playBarComponent';
import { useHistory } from 'react-router-dom';
import { postLikeMusic, postDislikeMusic } from '../common/service';
import Grid from '@material-ui/core/Grid';
import { MusicListDrawer } from './musicListDrawer';
import { getMusicCommentUrl } from '../common/routeName';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPlayState,
    selectCurrentMusic,
    selectMusics,
    selectRefreshMusicFlag,
    selectCurrentMusicId,
} from 'reducer/rootReducer';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import {
    updatePlayState,
    openHint,
    jumpToNextMusic,
    updateMusic,
    updateCurrentMusic,
    updateMusicRefresher,
} from 'reducer/system/functions';

interface MusicComponentProps {
    audioElement: HTMLAudioElement;
    musics: Music[];
}

export const MusicComponent: React.FC<MusicComponentProps> = (props: MusicComponentProps) => {
    const { audioElement } = props;
    const currentTheMusic = useSelector(selectCurrentMusic);

    const currentMusics = useSelector(selectMusics);

    const currentTheMusicId = useSelector(selectCurrentMusicId);

    const refresher = useSelector(selectRefreshMusicFlag);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [likeButtunGuard, setLikeButtunGuard] = useState(false);

    const [musicPercent, setMusicPercent] = useState(0);
    const [showFullPart, setShowFullPart] = useState(false);

    const [musicListDrawerOpen, setMusicListDrawerOpen] = useState(false);

    const history = useHistory();

    const [volume, setVolume] = useState(0.5);
    audioElement.volume = volume;

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const isPlaying = useSelector(selectPlayState);

    useEffect(() => {
        if (refresher && currentTheMusic && currentTheMusicId > 0) {
            updateMusicRefresher(dispatch, false);

            audioElement.src = currentTheMusic.address;
            audioElement.autoplay = true;

            updatePlayState(dispatch, true);

            setLikeButtunGuard(false);
        }
    }, [refresher, audioElement.autoplay, audioElement.src, currentTheMusic, currentTheMusicId, dispatch]);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        openHint(dispatch, 'volume : ' + Math.round(volume * 100) + '%');
    }, [volume, dispatch]);

    useEffect(() => {
        return (): void => {
            audioElement.pause();
            audioElement.src = '';
        };
    }, [audioElement]);

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

    const clickHeartIcon = (
        postAct: (musicId: number, resolve: (data: Music) => void, reject?: (data: Error) => void) => Promise<Music>,
    ): void => {
        if (currentTheMusic) {
            if (likeButtunGuard) {
                openHint(dispatch, 'too busy!!!');
            } else {
                setLikeButtunGuard(true);
                postAct(
                    currentTheMusic.id,
                    (data): void => {
                        updateMusic(dispatch, data);
                        setLikeButtunGuard(false);
                    },
                    e => {
                        console.log(e);
                        setLikeButtunGuard(false);
                    },
                );
            }
        }
    };

    const currentMusicInfoLikeClick = (): void => {
        clickHeartIcon(postLikeMusic);
    };

    const currentMusicInfoDislikeClick = (): void => {
        clickHeartIcon(postDislikeMusic);
    };

    const currentMusicCommentClick = (): void => {
        if (currentTheMusic) {
            history.push(getMusicCommentUrl(currentTheMusic.id));
        }
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
        if (audioElement.src === '') {
            openHint(dispatch, 'choose a music first!');
            return;
        }

        if (isPlaying) {
            audioElement.pause();
            updatePlayState(dispatch, false);
        } else {
            audioElement.play();
            updatePlayState(dispatch, true);
        }
    };

    const volumeUp = (): void => {
        const v = Math.min(1, volume + 0.05);

        setVolume(v);
        audioElement.volume = v;
    };

    const volumeDown = (): void => {
        const v = Math.max(0.0, volume - 0.05);
        setVolume(v);

        audioElement.volume = v;
    };

    const playMusic = (m: Music): void => {
        updateCurrentMusic(dispatch, m);
    };

    const skipToNext = (): void => {
        console.log(currentMusics);
        if (currentMusics && currentMusics.length > 0) {
            jumpToNextMusic(dispatch);
        }
    };

    const drawerCloseClick = (): void => {
        setMusicListDrawerOpen(false);
    };

    audioElement.onended = skipToNext;

    return (
        <div>
            <Grid item xs={12}>
                <div>
                    <MusicListDrawer
                        open={musicListDrawerOpen}
                        closeClick={drawerCloseClick}
                        musics={currentMusics}
                        currentMusicId={currentTheMusicId}
                        clickMusic={playMusic}
                    ></MusicListDrawer>

                    <PlayBarComponent
                        musicPercent={musicPercent}
                        isPlaying={isPlaying}
                        volume={volume}
                        changeMusicPercent={changeMusicPercent}
                        pausePlay={pausePlay}
                        skipToNext={skipToNext}
                        expand={expand}
                        shrink={shrink}
                        showFullPart={showFullPart}
                        clickList={clickList}
                        volumeUpClick={volumeUp}
                        volumeDownClick={volumeDown}
                    ></PlayBarComponent>
                    {showFullPart ? (
                        <MusicInfoComponent
                            musicId={currentTheMusicId}
                            currentTime={currentTime}
                            music={currentTheMusic}
                            likeClick={currentMusicInfoLikeClick}
                            dislikeClick={currentMusicInfoDislikeClick}
                            commentClick={currentMusicCommentClick}
                            isPlaying={isPlaying}
                        ></MusicInfoComponent>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Grid>
        </div>
    );
};
