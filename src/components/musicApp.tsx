import React, { useState } from 'react';
import { MusicComponent } from './musicComponent';
import { getAudioPlayer } from './audioPlayer';
import { TemporaryDrawer } from './navDrawerComponent';
import { AppBarComponent } from './appBarComponent';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics } from '../globals';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { ProfilePage } from '../authComponents/profile';

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    const [musics] = useGlobal('musics');
    const [keyword] = useState('');
    const updateTheMusics = useDispatch(updateMusics);
    const { path, url } = useRouteMatch();

    return (
        <div>
            <AppBarComponent></AppBarComponent>
            <TemporaryDrawer></TemporaryDrawer>
            <Grid container spacing={1}>
                <Switch>
                    <Route exact path={path}>
                        <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
                    </Route>
                    <Route path={`${path}/:profile`}>
                        <ProfilePage></ProfilePage>
                    </Route>
                </Switch>
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
