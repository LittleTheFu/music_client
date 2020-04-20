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
import { LobbyPage } from '../otherComponents/lobbyPage';
import { MusicCommentPage } from '../otherComponents/musicCommentPage';

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
            <Grid item xs={12}>
                <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Switch>
                        <Route path={`${path}/lobby`}>
                            <LobbyPage></LobbyPage>
                        </Route>
                        <Route path={`${path}/profile`}>
                            <ProfilePage></ProfilePage>
                        </Route>
                        <Route path={`${path}/mail`}>
                            <MailPage></MailPage>
                        </Route>
                        <Route path={`${path}/userdetail/:id`}>
                            <UserDetailPage></UserDetailPage>
                        </Route>
                        <Route path={`${path}/followers/:id`}>
                            <FollowerListPage></FollowerListPage>
                        </Route>
                        <Route path={`${path}/collections`}>
                            <MusicCollectionPage></MusicCollectionPage>
                        </Route>
                        <Route path={`${path}/collection_detail/:id`}>
                            <CollectionDetailPage></CollectionDetailPage>
                        </Route>
                        <Route path={`${path}/music_comment/:id`}>
                            <MusicCommentPage></MusicCommentPage>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    );
};
