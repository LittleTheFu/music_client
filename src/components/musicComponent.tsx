import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MusicInfoComponent } from './musicInfoComponent';
import { MusicListComponent } from './musicListComponent';
import { Music } from '../dataInterfaces/music';
import { PlayBarComponent } from './playBarComponent';
import { CollectionInfoModal } from './collectionInfoModal';
import { CommentModal } from './commentModal';
import { UserCardModal } from '../otherComponents/userCardModal';
import { useGlobal, useDispatch } from 'reactn';
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

    // const [musicIndex, setMusicIndex] = useState(0);

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
            // console.log('music_percent : ' + (currentTime / duration) * 100);
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

    // const logMsg = (): void => {
    //     console.log('log');
    // };

    const changeMusicPercent = (event: object, value: unknown): void => {
        const percent = value as number;
        // console.log(percent);
        const currentTime = (duration * percent) / 100.0;
        if (duration !== 0) {
            audioElement.currentTime = currentTime;
        }
    };

    const musicItemLikeClick = (id: number): void => {
        postLikeMusic(id, updateMusicAfterClickLike);
    };

    const currentMusicInfoLikeClick = (): void => {
        postLikeMusic(currentTheMusic.id, updateMusicAfterClickLike);
    };

    const musicItemDislikeClick = (id: number): void => {
        postDislikeMusic(id, updateMusicAfterClickLike);
    };

    const currentMusicInfoDislikeClick = (): void => {
        postDislikeMusic(currentTheMusic.id, updateMusicAfterClickLike);
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
        // setIsPlaying(true);
        console.log('load finished');
    };

    audioElement.ontimeupdate = (): void => {
        // console.log('update : ' + audioElement.currentTime + 'duration : ' + duration);
        if (!audioElement.paused) {
            setCurrentTime(audioElement.currentTime);
        }
    };

    // const changeMusic = (): void => {
    //     audioElement.src = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3';
    // };

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

    // const setTime = (): void => {
    //     audioElement.currentTime = 200;
    //     setCurrentTime(audioElement.currentTime);
    //     console.log('set time');
    // };

    const playMusic = (m: Music): void => {
        updateCurerntMusicInfo(m);

        // audioElement.src = m.address;
        // audioElement.autoplay = true;

        // setIsPlaying(true);
        // setMusicIndex(index);
    };

    const clickCollectionCover = (name: string): void => {
        // console.log('click collection cover');
        fetchMusicsByCollectionName(
            name,
            musicList => {
                // setMusics(musicList as Music[]);
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
        // if (musicLength > 0) {
        //     const i = (musicIndex + 1) % musicLength;
        //     playMusic(musics[i], i);
        // } else {
        //     setMusicIndex(-1);
        // }
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

    audioElement.onended = skipToNext;

    return (
        <div>
            <CollectionInfoModal></CollectionInfoModal>
            <CommentModal></CommentModal>
            <UserCardModal></UserCardModal>
            <Grid item xs={12}>
                <div>
                    <MusicCollectionsComponent
                        coverClick={clickCollectionCover}
                        collections={musicCollections}
                        bodyClick={bodyClick}
                    ></MusicCollectionsComponent>
                    <Paper variant="outlined" className={classes.paper}>
                        <PlayBarComponent
                            musicPercent={musicPercent}
                            isPlaying={isPlaying}
                            cover={currentTheMusic.cover}
                            volumn={volumn * 100}
                            changeMusicPercent={changeMusicPercent}
                            pausePlay={pausePlay}
                            skipToNext={skipToNext}
                            changeMusicVolumn={changeMusicVolumn}
                        ></PlayBarComponent>
                        <MusicListComponent
                            musics={currentMusics}
                            currentMusic={currentTheMusic}
                            clickMusic={playMusic}
                            likeClick={musicItemLikeClick}
                            dislikeClick={musicItemDislikeClick}
                            addMusicClick={addMusicToPersonalListClick}
                            removeMusicClick={removeMusicFromPersonalListClick}
                            commentClick={commentClick}
                        />
                        <MusicInfoComponent
                            music={currentTheMusic}
                            likeClick={currentMusicInfoLikeClick}
                            dislikeClick={currentMusicInfoDislikeClick}
                        ></MusicInfoComponent>
                    </Paper>

                    {/* <Button
                variant="contained"
                color="primary"
                onClick={(): void => {
                    setAvatar('avt');
                }}
            >
                setAvatar
            </Button> */}

                    {/* <Button variant="contained" color="primary" onClick={setTime}>
                set
            </Button>
            <Button variant="contained" color="primary" onClick={logMsg}>
                log
            </Button>
            <Button variant="contained" color="primary" onClick={changeMusic}>
                change
            </Button>
            <h4>{currentTime}</h4>
            <h4>{duration}</h4>
            <h4>musicPercent : {musicPercent}</h4> */}
                </div>
            </Grid>
        </div>
    );
};
