import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MusicInfoComponent } from './musicInfoComponent';
import { MusicListComponent } from './musicListComponent';
import { Music } from '../dataInterfaces/music';
import { PlayBarComponent } from './playBarComponent';
import { TemporaryDrawer } from './navDrawerComponent';

import { AppBarComponent } from './appBarComponent';

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

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);
    const [cover, setCover] = useState('default.png');
    const [name, setName] = useState('name');
    const [artist, setArtist] = useState('artist');
    const [album, setAlbum] = useState('album');
    const [musicIndex, setMusicIndex] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);

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
        // console.log(audioElement.volume);
    }, [volumn]);

    const logMsg = (): void => {
        console.log('log');
    };

    const changeMusicPercent = (event: object, value: unknown): void => {
        const percent = value as number;
        // console.log(percent);
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

    const playMusic = (m: Music, index: number): void => {
        setName(m.name);
        setArtist(m.artist);
        setAlbum(m.album);
        setCover(m.cover);

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
            <AppBarComponent menuButtonClick={(): void => setDrawerOpen(true)}></AppBarComponent>
            <TemporaryDrawer drawerOpen={drawerOpen} closeDrawer={(): void => setDrawerOpen(false)}></TemporaryDrawer>
            <Paper variant="outlined" className={classes.paper}>
                <PlayBarComponent
                    musicPercent={musicPercent}
                    isPlaying={isPlaying}
                    cover={cover}
                    volumn={volumn * 100}
                    changeMusicPercent={changeMusicPercent}
                    pausePlay={pausePlay}
                    skipToNext={skipToNext}
                    changeMusicVolumn={changeMusicVolumn}
                ></PlayBarComponent>
                <MusicListComponent musics={musics} clickMusic={playMusic} />
                <MusicInfoComponent name={name} artist={artist} cover={cover} album={album}></MusicInfoComponent>
            </Paper>

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
