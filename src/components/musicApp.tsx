import React, { useState } from 'react';
import { MusicComponent } from './musicComponent';
import { getAudioPlayer } from './audioPlayer';
import { Music } from '../dataInterfaces/music';
// import { fetchPlayListMusicList, fetchMusics, postShowProfile } from '../service';
import Button from '@material-ui/core/Button';
import { TemporaryDrawer } from './navDrawerComponent';
import { AppBarComponent } from './appBarComponent';
import { useGlobal, useDispatch } from 'reactn';
import { fetchMusicsByKeyword } from '../service';
import { updateMusics } from '../globals';
import Grid from '@material-ui/core/Grid';

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    const [musics] = useGlobal('musics');
    const [keyword, setKeyword] = useState('');
    const updateTheMusics = useDispatch(updateMusics);

    const searchMusics = (): void => {
        fetchMusicsByKeyword(
            'a',
            musics => {
                console.log(musics);
            },
            e => console.log(e),
        );
    };

    const testFunc = (): void => {
        const o = { a: 1, b: 2, c: 3 };
        const { a, b } = o;
        // if (!(d in o)) console.log('no d');
        if ('d' in o) console.log('d in o');
        if ('a' in o) console.log('a in o');
        console.log('a : ' + a + ' b: ' + b);
    };

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        fetchMusicsByKeyword(
            keyword,
            musics => {
                console.log(musics);
                if (musics.length > 0) {
                    updateTheMusics(musics);
                }
            },
            e => console.log(e),
        );
    }

    return (
        <div>
            <AppBarComponent></AppBarComponent>
            <TemporaryDrawer></TemporaryDrawer>
            <Grid container spacing={1}>
                {/* <form noValidate autoComplete="off" onSubmit={handleSubmitSearch}>
                <TextField id="standard-basic" label="search" onChange={(e): void => setKeyword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    search
                </Button>
            </form> */}
                <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
            </Grid>
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
