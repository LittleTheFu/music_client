import React, { useState } from 'react';
import { MusicComponent } from './musicComponent';
import { getAudioPlayer } from './audioPlayer';
import { Music } from '../dataInterfaces/music';
import { fetchMusicList, fetchMusics } from '../service';
import Button from '@material-ui/core/Button';

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    const [musics, setMusics] = useState([]);

    const loadMusic = (): void => {
        fetchMusicList(
            musicList => {
                setMusics(musicList as Music[]);
                console.log(musicList);
            },
            e => console.log(e),
        );
    };

    const getMusics = (): void => {
        fetchMusics(
            musicList => {
                setMusics(musicList as Music[]);
                console.log(musicList);
            },
            e => console.log(e),
        );
    };

    return (
        <div>
            <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
            <Button variant="contained" color="primary" onClick={loadMusic}>
                loadMusic
            </Button>
            <Button variant="contained" color="primary" onClick={getMusics}>
                loadMusic
            </Button>
        </div>
    );
};

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
