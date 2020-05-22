import React from 'react';
import { MusicComponent } from '../musicPlayer/musicComponent';
import { getAudioPlayer } from '../musicPlayer/audioPlayer';
import { TemporaryDrawer } from './navDrawer/navDrawerComponent';
import { AppBarComponent } from './appBar/appBarComponent';
import { useGlobal } from 'reactn';
import Grid from '@material-ui/core/Grid';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ProfilePage } from '../pages/profile/profile';
import { MailPage } from '../pages/mail/mailPage';
import { MailDetailPage } from '../pages/mail/mailDetailPage';
import { UserDetailPage } from '../pages/userDetail/userDetailPage';
import { SearchPage } from '../pages/search/searchPage';
import { FollowerListPage } from '../pages/followers/followerListPage';
import { MusicCollectionPage } from '../pages/mix/collectionPage';
import { CollectionDetailPage } from '../pages/mix/collectionDetailPage';
import { LobbyPage } from '../pages/album/lobbyPage';
import { MusicCommentPage } from '../pages/comment/musicCommentPage';
import { MainDivider } from '../sharedComponents/basicComponents/mainDivider';
import { ArtistPage } from '../pages/artist/artistPage';
import { AlbumDetailPage } from '../pages/album/albumDetailPage';
import { AllUsersPage } from '../pages/allUsers/allUsersPage';
import { SourceCodePage } from '../pages/source/sourceCodePage';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { setLoginFlag } from '../globals';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        textAlign: 'center',
    },
}));

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    const [showBannedMask, setShowBannedMask] = useGlobal('showBannedMask');
    const [musics] = useGlobal('musics');
    const { path } = useRouteMatch();

    const history = useHistory();

    const classes = useStyles();

    const handleClose = (): void => {
        setShowBannedMask(false);
        setLoginFlag(false);
        history.push('/login');
    };

    return (
        <div>
            <AppBarComponent></AppBarComponent>
            <TemporaryDrawer></TemporaryDrawer>
            <Grid item xs={12}>
                <MusicComponent audioElement={audioElement} musics={musics}></MusicComponent>
            </Grid>
            <MainDivider></MainDivider>
            <Grid container>
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
                        <Route path={`${path}/all_users`}>
                            <AllUsersPage></AllUsersPage>
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
                        <Route path={`${path}/album/:id`}>
                            <AlbumDetailPage></AlbumDetailPage>
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
                        <Route path={`${path}/source_code`}>
                            <SourceCodePage></SourceCodePage>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={showBannedMask} onClick={handleClose}>
                <h1>You have been banned, click to redirect to login page!</h1>
            </Backdrop>
        </div>
    );
};
