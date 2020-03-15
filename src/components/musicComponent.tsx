import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MusicInfoComponent } from './musicInfoComponent';
import { MusicListComponent } from './musicListComponent';
import { Music } from '../dataInterfaces/music';
import { PlayBarComponent } from './playBarComponent';
import { useGlobal, useDispatch } from 'reactn';
import {
    postLikeMusic,
    postDislikeMusic,
    fetchMusicsByCollectionName,
    addMusicToPersonalList,
    removeMusicFromPersonalList,
} from '../service';
import {
    updateMusic,
    updateCurrentMusic,
    updateMusics,
    updateMusicInPersoalListState,
    updatePlayListMusics,
} from '../globals';
import { MusicCollectionsComponent } from './musicCollectionsComponent';

interface MusicComponentProps {
    audioElement: HTMLAudioElement;
    musics: Music[];
}

const useStyles = makeStyles({
    paper: {
        padding: 80,
    },
});

export const MusicComponent: React.FC<MusicComponentProps> = (props: MusicComponentProps) => {
    const { audioElement, musics } = props;

    const updateMusicAfterClickLike = useDispatch(updateMusic);
    const updateCurerntMusicInfo = useDispatch(updateCurrentMusic);
    const updateAllMusics = useDispatch(updateMusics);
    const updateMusicsPersnalState = useDispatch(updateMusicInPersoalListState);
    const updatePersonalMusics = useDispatch(updatePlayListMusics);
    const [currentMusic] = useGlobal('currentMusic');
    const [avatar, setAvatar] = useGlobal('avatar');
    const [musicCollections, setMusicCollections] = useGlobal('Collections');

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);

    const [musicIndex, setMusicIndex] = useState(0);

    const classes = useStyles({});

    const [volumn, setVolumn] = useState(0.3);
    audioElement.volume = volumn;

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        audioElement.volume = volumn;
    }, [volumn]);

    // const logMsg = (): void => {
    //     console.log('log');
    // };

    const clickCollectionCover = (name: string): void => {
        // console.log('click collection cover');
        fetchMusicsByCollectionName(
            name,
            musicList => {
                // setMusics(musicList as Music[]);
                updateAllMusics(musicList as Music[]);
                console.log(musicList);
            },
            e => console.log(e),
        );
    };

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
        postLikeMusic(currentMusic.id, updateMusicAfterClickLike);
    };

    const musicItemDislikeClick = (id: number): void => {
        postDislikeMusic(id, updateMusicAfterClickLike);
    };

    const currentMusicInfoDislikeClick = (): void => {
        postDislikeMusic(currentMusic.id, updateMusicAfterClickLike);
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

    const playMusic = (m: Music, index: number): void => {
        updateCurerntMusicInfo(m);

        audioElement.src = m.address;
        audioElement.autoplay = true;

        setIsPlaying(true);
        setMusicIndex(index);
    };

    const skipToNext = (): void => {
        const musicNum = musics.length;
        if (musicNum > 0) {
            const i = (musicIndex + 1) % musicNum;
            playMusic(musics[i], i);
        }
    };

    audioElement.onended = skipToNext;

    return (
        <div>
            <MusicCollectionsComponent
                coverClick={clickCollectionCover}
                collections={musicCollections}
            ></MusicCollectionsComponent>
            <Paper variant="outlined" className={classes.paper}>
                <PlayBarComponent
                    musicPercent={musicPercent}
                    isPlaying={isPlaying}
                    cover={currentMusic.cover}
                    volumn={volumn * 100}
                    changeMusicPercent={changeMusicPercent}
                    pausePlay={pausePlay}
                    skipToNext={skipToNext}
                    changeMusicVolumn={changeMusicVolumn}
                ></PlayBarComponent>
                <MusicListComponent
                    musics={musics}
                    currentMusic={currentMusic}
                    clickMusic={playMusic}
                    likeClick={musicItemLikeClick}
                    dislikeClick={musicItemDislikeClick}
                    addMusicClick={addMusicToPersonalListClick}
                    removeMusicClick={removeMusicFromPersonalListClick}
                />
                <MusicInfoComponent
                    music={currentMusic}
                    likeClick={currentMusicInfoLikeClick}
                    dislikeClick={currentMusicInfoDislikeClick}
                ></MusicInfoComponent>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={(): void => {
                    setAvatar('avt');
                }}
            >
                setAvatar
            </Button>

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
    );
};
