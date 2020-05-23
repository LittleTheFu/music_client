import React, { useState, useEffect, useCallback } from 'react';
import { MusicInfoComponent } from './musicInfoComponent';
import { Music } from '../common/interface';
import { PlayBarComponent } from './playBarComponent';
import { useGlobal, useDispatch } from 'reactn';
import { useHistory } from 'react-router-dom';
import { postLikeMusic, postDislikeMusic } from '../common/service';
import { updateMusic, updateCurrentMusic, updateToNextMusic } from '../globals';
import Grid from '@material-ui/core/Grid';
import { MusicListDrawer } from './musicListDrawer';

interface MusicComponentProps {
    audioElement: HTMLAudioElement;
    musics: Music[];
}

export const MusicComponent: React.FC<MusicComponentProps> = (props: MusicComponentProps) => {
    const { audioElement } = props;

    const updateMusicAfterClickHeartIcon = useDispatch(updateMusic);
    const updateCurerntMusicInfo = useDispatch(updateCurrentMusic);
    const updateToTheNextMusic = useDispatch(updateToNextMusic);
    const openTheHint = useCallback(useDispatch('openHint'), []);

    const [currentTheMusic] = useGlobal('currentMusic');
    const [currentMusics] = useGlobal('musics');
    const [currentTheMusicId] = useGlobal('currentMusicId');
    const [refresher, setRefresher] = useGlobal('refreshMusicFlag');

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [likeButtunGuard, setLikeButtunGuard] = useState(false);

    const [musicPercent, setMusicPercent] = useState(0);
    const [showFullPart, setShowFullPart] = useState(false);

    const [musicListDrawerOpen, setMusicListDrawerOpen] = useState(false);

    const history = useHistory();

    const [volume, setVolume] = useState(0.5);
    audioElement.volume = volume;

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (refresher && currentTheMusic && currentTheMusicId > 0) {
            setRefresher(false);

            audioElement.src = currentTheMusic.address;
            audioElement.autoplay = true;

            setIsPlaying(true);

            setLikeButtunGuard(false);
        }
    }, [refresher, setRefresher, audioElement.autoplay, audioElement.src, currentTheMusic, currentTheMusicId]);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        openTheHint('volume : ' + Math.round(volume * 100) + '%');
    }, [volume, openTheHint]);

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
                openTheHint('too busy!!!');
            } else {
                setLikeButtunGuard(true);
                postAct(
                    currentTheMusic.id,
                    (data): void => {
                        updateMusicAfterClickHeartIcon(data);
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
            history.push(`/main/music_comment/` + currentTheMusic.id);
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
            openTheHint('choose a music first!');
            return;
        }

        if (isPlaying) {
            audioElement.pause();
            setIsPlaying(false);
        } else {
            audioElement.play();
            setIsPlaying(true);
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
        updateCurerntMusicInfo(m);
    };

    const skipToNext = (): void => {
        if (currentMusics && currentMusics.length > 0) {
            updateToTheNextMusic();
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
