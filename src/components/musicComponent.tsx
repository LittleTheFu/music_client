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
import {
    postLikeMusic,
    postDislikeMusic,
    fetchMusicsByCollectionName,
    addMusicToPersonalList,
    removeMusicFromPersonalList,
    getMusicComments,
} from '../service';
import {
    updateMusic,
    updateCurrentMusic,
    updateMusics,
    updateMusicInPersoalListState,
    updatePlayListMusics,
    updateToNextMusic,
    updateCollections,
    updateCollectionInfoMusics,
    updateComments,
    updateCurrentCommentMusicId,
} from '../globals';
import { MusicCollectionsComponent } from './musicCollectionsComponent';
import Grid from '@material-ui/core/Grid';
import { setCollectionPlayFlag } from '../helper';
import { MusicListDrawer } from './musicListDrawer';

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
    const updateAllMusics = useDispatch(updateMusics);
    const updateMusicsPersnalState = useDispatch(updateMusicInPersoalListState);
    const updatePersonalMusics = useDispatch(updatePlayListMusics);
    const updateToTheNextMusic = useDispatch(updateToNextMusic);
    const updateTheCollections = useDispatch(updateCollections);
    const updateTheCollectionInfoMusics = useDispatch(updateCollectionInfoMusics);
    const updateTheComments = useDispatch(updateComments);
    const updateTheCurrentCommentMusicId = useDispatch(updateCurrentCommentMusicId);

    const [currentTheMusic] = useGlobal('currentMusic');
    const [musicCollections] = useGlobal('Collections');
    const [musicIndex] = useGlobal('musicIndex');
    const [currentMusics] = useGlobal('musics');
    const [collectionInfoModalOpen, setCollectionInfoModalOpen] = useGlobal('collectionInfoModalOpen');
    const [commentModalOpen, setCommentModalOpen] = useGlobal('commentModalOpen');

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);
    const [showFullPart, setShowFullPart] = useState(true);
    const [musicListDrawerOpen, setMusicListDrawerOpen] = useState(false);

    const history = useHistory();

    const classes = useStyles({});

    const [volumn, setVolumn] = useState(0.0);
    audioElement.volume = volumn;

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        console.log('currentTheMusic:');
        console.log(currentTheMusic);
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
        audioElement.volume = volumn;
    }, [volumn]);

    useEffect(() => {
        return (): void => {
            console.log('pause in return useeffect');
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
        console.log('expand');
        setShowFullPart(true);
    };

    const shrink = (): void => {
        console.log('shrink');
        setShowFullPart(false);
    };

    const clickList = (): void => {
        setMusicListDrawerOpen(true);
        console.log('click list');
    };

    const musicItemLikeClick = (id: number): void => {
        postLikeMusic(id, updateMusicAfterClickLike, console.log);
    };

    const currentMusicInfoLikeClick = (): void => {
        postLikeMusic(currentTheMusic.id, updateMusicAfterClickLike, console.log);
    };

    const musicItemDislikeClick = (id: number): void => {
        postDislikeMusic(id, updateMusicAfterClickLike);
    };

    const currentMusicInfoDislikeClick = (): void => {
        postDislikeMusic(currentTheMusic.id, updateMusicAfterClickLike);
    };

    const currentMusicCommentClick = (): void => {
        history.push(`/main/music_comment/` + currentTheMusic.id);
    };

    const addMusicToPersonalListClick = (id: number): void => {
        console.log('ADD:' + id);
        addMusicToPersonalList(
            id,
            personalMusics => {
                updatePersonalMusics(personalMusics);
                updateMusicsPersnalState();
            },
            console.log,
        );
    };

    const removeMusicFromPersonalListClick = (id: number): void => {
        console.log('REMOVE:' + id);
        removeMusicFromPersonalList(
            id,
            personalMusics => {
                updatePersonalMusics(personalMusics);
                updateMusicsPersnalState();
            },
            console.log,
        );
    };

    const commentClick = (id: number): void => {
        updateTheCurrentCommentMusicId(id);
        getMusicComments(
            id,
            comments => {
                console.log(comments);
                updateTheComments(comments);
                setCommentModalOpen(true);
            },
            console.log,
        );
    };

    const changeMusicVolumn = (event: object, value: unknown): void => {
        setVolumn((value as number) / 100.0);
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

    const playMusic = (m: Music): void => {
        updateCurerntMusicInfo(m);
    };

    const clickCollectionCover = (name: string): void => {
        fetchMusicsByCollectionName(
            name,
            musicList => {
                updateAllMusics(musicList as Music[]);
                updateTheCollections(setCollectionPlayFlag(musicCollections, name));
            },
            e => console.log(e),
        );
    };

    const skipToNext = (): void => {
        console.log('NEXT');
        console.log(musicIndex);
        updateToTheNextMusic();
    };

    const bodyClick = (name: string): void => {
        console.log('BODY CLICK');
        fetchMusicsByCollectionName(
            name,
            musicList => {
                updateTheCollectionInfoMusics(musicList as Music[]);
                console.log(musicList);
                setCollectionInfoModalOpen(true);
            },
            e => console.log(e),
        );
    };

    const drawerCloseClick = (): void => {
        setMusicListDrawerOpen(false);
    };

    audioElement.onended = skipToNext;

    return (
        <div>
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
                            volumn={volumn * 100}
                            changeMusicPercent={changeMusicPercent}
                            pausePlay={pausePlay}
                            skipToNext={skipToNext}
                            changeMusicVolumn={changeMusicVolumn}
                            expand={expand}
                            shrink={shrink}
                            showFullPart={showFullPart}
                            clickList={clickList}
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
