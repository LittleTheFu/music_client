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
import { MailPage } from '../mailComponents/mailPage';
import { UserDetailPage } from '../otherComponents/userDetailPage';
import { FollowerListPage } from '../otherComponents/followerListPage';
import { MusicCollectionPage } from '../components/collectionPage';
import { CollectionDetailPage } from './collectionDetailPage';

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
                <Grid item xs={12}>
                    <Switch>
                        {/* <Route exact path={path}>
                            <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
                        </Route> */}
                        <Route path={`${path}/profile`}>
                            <ProfilePage></ProfilePage>
                        </Route>
                        <Route path={`${path}/mail`}>
                            <MailPage></MailPage>
                        </Route>
                        <Route path={`${path}/userdetail`}>
                            <UserDetailPage></UserDetailPage>
                        </Route>
                        <Route path={`${path}/followers`}>
                            <FollowerListPage></FollowerListPage>
                        </Route>
                        <Route path={`${path}/collections`}>
                            <MusicCollectionPage></MusicCollectionPage>
                        </Route>
                        <Route path={`${path}/collection_detail/:id`}>
                            <CollectionDetailPage></CollectionDetailPage>
                        </Route>
                    </Switch>
                </Grid>
                <Grid item xs={12}>
                    <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
                </Grid>
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
