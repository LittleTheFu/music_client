import React from 'react';
import { MusicComponent } from './musicComponent';
import { getAudioPlayer } from './audioPlayer';
import { TemporaryDrawer } from './navDrawerComponent';
import { AppBarComponent } from './appBarComponent';
import { useGlobal } from 'reactn';
import Grid from '@material-ui/core/Grid';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ProfilePage } from '../authComponents/profile';
import { MailPage } from '../mailComponents/mailPage';
import { MailDetailPage } from '../mailComponents/mailDetailPage';
import { UserDetailPage } from '../otherComponents/userDetailPage';
import { SearchPage } from '../otherComponents/searchPage';
import { FollowerListPage } from '../otherComponents/followerListPage';
import { MusicCollectionPage } from '../components/collectionPage';
import { CollectionDetailPage } from './collectionDetailPage';
import { LobbyPage } from '../otherComponents/lobbyPage';
import { MusicCommentPage } from '../otherComponents/musicCommentPage';
import { MainDivider } from '../otherComponents/mainDivider';
import { ArtistPage } from '../otherComponents/artistPage';

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    const [musics] = useGlobal('musics');
    const { path } = useRouteMatch();

    return (
        <div>
            <AppBarComponent></AppBarComponent>
            <TemporaryDrawer></TemporaryDrawer>
            <Grid item xs={12}>
                <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
            </Grid>
            <MainDivider></MainDivider>
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
                        <Route path={`${path}/mail_detail/:id`}>
                            <MailDetailPage></MailDetailPage>
                        </Route>
                        <Route path={`${path}/userdetail/:id`}>
                            <UserDetailPage></UserDetailPage>
                        </Route>
                        <Route path={`${path}/search`}>
                            <SearchPage></SearchPage>
                        </Route>
                        <Route path={`${path}/followers/:id`}>
                            <FollowerListPage></FollowerListPage>
                        </Route>
                        <Route path={`${path}/artist/:id`}>
                            <ArtistPage></ArtistPage>
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
