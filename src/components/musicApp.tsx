import React from 'react';
import { MusicComponent } from '../musicPlayer/musicComponent';
import { getAudioPlayer } from '../musicPlayer/audioPlayer';
import { TemporaryDrawer } from './navDrawer/navDrawerComponent';
import { AppBarComponent } from './appBar/appBarComponent';

import Grid from '@mui/material/Grid';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 导入 useDispatch
import { ProfilePage } from '../pages/profile/profile';
// import { MailPage } from '../pages/mail/mailPage';


import MailDetailPage from '../pages/mail/mailDetailPage';
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
import { ChangePasswordPage } from '../pages/auth/editPassword';

import Backdrop from '@mui/material/Backdrop';

import { makeStyles } from '@mui/styles';
// 修改前
// import { zIndex } from '@mui/material/styles';
// 修改后
// import { zIndex } from '@mui/material';

const useStyles = makeStyles(() => ({
    backdrop: {
        // zIndex: zIndex.drawer + 1,
        color: '#fff',
        textAlign: 'center',
    },
}));

const audioElement = getAudioPlayer();

import { selectMaskState } from 'reducer/rootReducer';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { closeMask } from 'reducer/system/functions';
import { setLoginFlag } from 'helpers';
import { getLoginUrl } from 'common/routeName';
import { selectMusics } from 'reducer/rootReducer'; // 假设这是你的选择器

export const MusicApp: React.FC = () => {
    const match = useMatch('/'); 
    const path = match ? match.pathname : '';

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const maskState = useSelector(selectMaskState);
    const musics = useSelector(selectMusics); // 获取 musics 状态

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

    const classes = useStyles();

    const handleClose = (): void => {
        closeMask(dispatch);
        setLoginFlag(false);
        // 修改前
        // history.push(getLoginUrl());
        // 修改后
        navigate(getLoginUrl());
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
                    <Routes>
                        <Route path={`${path}/lobby`}>
                            <LobbyPage></LobbyPage>
                        </Route>
                        <Route path={`${path}/profile`}>
                            <ProfilePage></ProfilePage>
                        </Route>
                        {/* <Route path={`${path}/mail`}>
                            <MailPage></MailPage>
                        </Route> */}
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
                        <Route path={`${path}/edit_password`}>
                            <ChangePasswordPage></ChangePasswordPage>
                        </Route>



                    </Routes>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={maskState} onClick={handleClose}>
                <h1>You have been banned, click to redirect to login page!</h1>
            </Backdrop>
        </div>
    );
};