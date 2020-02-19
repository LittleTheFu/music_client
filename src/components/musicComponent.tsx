import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import { fetchMusicList } from '../service';
import Paper from '@material-ui/core/Paper';
import { MusicInfoComponent } from './musicInfoComponent';
import { MusicListComponent } from './musicListComponent';
import { Music } from '../dataInterfaces/music';
import { PlayBarComponent } from './playBarComponent';

let musics: Music[] = [];
fetchMusicList(
    musicList => (musics = musicList as Music[]),
    e => console.log(e),
);
console.log('aaaaaa');

// musics.push({
//     address: 'http://localhost:9999/music/0.mp3',
//     cover: 'http://localhost:9999/album/0.png',
//     name: 'Honey Bunny My Love',
//     artist: 'SHAKING PINK',
//     album: 'しぇいきんぐ!SHAKING PINK',
// });
// musics.push({
//     address: 'http://localhost:9999/music/1.mp3',
//     cover: 'http://localhost:9999/album/1.png',
//     name: 'Tasty Carrots',
//     artist: 'Shou (Discandy)',
//     album: 'TastyCarrots',
// });
// musics.push({
//     address: 'http://localhost:9999/music/2.mp3',
//     cover: 'http://localhost:9999/album/2.png',
//     name: '萃梦想歌',
//     artist: 'Silver Forest',
//     album: 'Vermillion Summer',
// });
// musics.push({
//     address: 'http://localhost:9999/music/3.mp3',
//     cover: 'http://localhost:9999/album/3.png',
//     name: 'What’s Love?',
//     artist: 'SKELT 8 BAMBINO',
//     album: 'Whats Love? feat.SoulJa',
// });
// musics.push({
//     address: 'http://localhost:9999/music/4.mp3',
//     cover: 'http://localhost:9999/album/4.png',
//     name: 'Will ( Original Mix )',
//     artist: 'SnoweeD',
//     album: 'Will',
// });
// musics.push({
//     address: 'http://localhost:9999/music/5.mp3',
//     cover: 'http://localhost:9999/album/5.png',
//     name: 'Bubbles',
//     artist: 'SnowFlakez!',
//     album: 'Bubbles',
// });
// musics.push({
//     address: 'http://localhost:9999/music/6.mp3',
//     cover: 'http://localhost:9999/album/6.png',
//     name: 'Grayedout-Antifront- (Soleily Remix)',
//     artist: 'Soleily',
//     album: 'ANTiFRONT GEARS',
// });
// musics.push({
//     address: 'http://localhost:9999/music/7.mp3',
//     cover: 'http://localhost:9999/album/7.png',
//     name: 'Thalidomide Chocolat',
//     artist: 'Sound.AVE',
//     album: 'Reliance',
// });

const audioElement = new Audio();
audioElement.src = 'http://localhost:9999/music/1.mp3';

audioElement.autoplay = false;

// const useStyles = makeStyles({});

const MusicComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicPercent, setMusicPercent] = useState(0);
    const [cover, setCover] = useState('http://localhost:9999/album/0.png');
    const [name, setName] = useState('name');
    const [artist, setArtist] = useState('artist');
    const [album, setAlbum] = useState('album');
    const [musicIndex, setMusicIndex] = useState(0);

    // const classes = useStyles({});

    const [volumn, setVolumn] = useState(0.5);
    audioElement.volume = volumn;

    const bar = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (duration !== 0) {
            setMusicPercent((currentTime / duration) * 100);
        }
    }, [currentTime, duration]);

    useEffect(() => {
        audioElement.volume = volumn;
        console.log(audioElement.volume);
    }, [volumn]);

    const logMsg = (): void => {
        console.log(bar.current.getBoundingClientRect());
    };

    const changeMusicPercent = (event: object, value: unknown): void => {
        const percent = value as number;
        console.log(percent);
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
        const i = (musicIndex + 1) % 8;
        playMusic(musics[i], i);
    };

    audioElement.onended = skipToNext;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={setTime}>
                set
            </Button>
            <Button variant="contained" color="primary" onClick={logMsg}>
                log
            </Button>
            <Button variant="contained" color="primary" onClick={changeMusic}>
                change
            </Button>
            <h1>{currentTime}</h1>
            <h1>{duration}</h1>
            <h1>musicPercent : {musicPercent}</h1>
            <h4>{name}</h4>
            <h4>{artist}</h4>
            <h4>{album}</h4>
            <Paper variant="outlined">
                <PlayBarComponent
                    musicPercent={musicPercent}
                    isPlaying={isPlaying}
                    cover={cover}
                    changeMusicPercent={changeMusicPercent}
                    pausePlay={pausePlay}
                    skipToNext={skipToNext}
                    changeMusicVolumn={changeMusicVolumn}
                ></PlayBarComponent>
                <MusicListComponent musics={musics} clickMusic={playMusic} />
                <MusicInfoComponent name={name} artist={artist} cover={cover} album={album}></MusicInfoComponent>
            </Paper>
            <h1>width : {bar.current ? bar.current.offsetWidth : 0}</h1>
        </div>
    );
};

export default MusicComponent;
