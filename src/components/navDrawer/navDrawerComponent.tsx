import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getMeId, setLoginFlag, getMeAvatar, getMeName } from '../../globals';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { NavListIconButton } from './NavListIconButton';
import AlbumIcon from '@material-ui/icons/Album';
import PeopleIcon from '@material-ui/icons/People';
import GitHubIcon from '@material-ui/icons/GitHub';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { emitLogoutSocketMsg } from '../../common/socket';
import Badge from '@material-ui/core/Badge';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {
    getLoginUrl,
    getAllUsersUrl,
    getSearchUrl,
    getLobbyUrl,
    getCollectionsUrl,
    getMailUrl,
    getProfileUrl,
    getSourceCodeUrl,
    getEditPasswordUrl,
    getUserDetailUrl,
} from '../../common/routeName';
import { selectDrawerState, selectUnreadMailCount } from 'reducer/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { closeDrawer } from 'reducer/system/functions';

// const useStyles = makeStyles(() =>
//     createStyles({
//         avatar: {
//             borderRadius: '50%',
//             display: 'block',
//             marginLeft: 'auto',
//             marginRight: 'auto',
//             height: 80,
//             width: 80,
//         },
//         name: {
//             textAlign: 'center',
//             fontWeight: 'bold',
//         },
//     }),
// );

export const TemporaryDrawer: React.FC = () => {
    const drawerState = useSelector(selectDrawerState);
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    // const classes = useStyles({});
    const history = useHistory();
    const _unreadMailCnt = useSelector(selectUnreadMailCount);

    const logoutClick = (): void => {
        setLoginFlag(false);
        emitLogoutSocketMsg(getMeId());
        history.push(getLoginUrl());
    };

    const peopleClick = (): void => {
        history.push(getAllUsersUrl());
    };

    const meClick = (): void => {
        history.push(getUserDetailUrl(getMeId()));
    };

    const editClick = (): void => {
        history.push(getProfileUrl());
    };

    const passwordClick = (): void => {
        history.push(getEditPasswordUrl());
    };

    const searchClick = (): void => {
        history.push(getSearchUrl());
    };

    const collectionsClick = (): void => {
        history.push(getCollectionsUrl());
    };

    const mailClick = (): void => {
        history.push(getMailUrl());
    };

    const musicClick = (): void => {
        history.push(getLobbyUrl());
    };

    const projectClick = (): void => {
        history.push(getSourceCodeUrl());
    };

    return (
        <div>
            <Drawer
                anchor="left"
                open={drawerState}
                onClose={(): void => {
                    closeDrawer(dispatch);
                }}
            >
                <List>
                    <UserHead
                        padding={5}
                        avatar={getMeAvatar()}
                        userName={getMeName()}
                        avatarClick={meClick}
                        size={80}
                    ></UserHead>
                    <Divider></Divider>
                    <NavListIconButton msg={'music'} iconClick={musicClick}>
                        <MusicNoteIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'mail'} iconClick={mailClick}>
                        <Badge color="secondary" badgeContent={_unreadMailCnt} invisible={_unreadMailCnt <= 0}>
                            <MailIcon />
                        </Badge>
                    </NavListIconButton>

                    <NavListIconButton msg={'collections'} iconClick={collectionsClick}>
                        <AlbumIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'search'} iconClick={searchClick}>
                        <SearchIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'edit'} iconClick={editClick}>
                        <EditIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'change password'} iconClick={passwordClick}>
                        <VpnKeyIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'me'} iconClick={meClick}>
                        <PersonIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'community'} iconClick={peopleClick}>
                        <PeopleIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'source code'} iconClick={projectClick}>
                        <GitHubIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'logout'} iconClick={logoutClick}>
                        <ExitToAppIcon />
                    </NavListIconButton>
                </List>
            </Drawer>
        </div>
    );
};
