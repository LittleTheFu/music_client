import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import { setLoginFlag, getMeId } from '../../globals';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import { emitLogoutSocketMsg } from '../../common/socket';
import Badge from '@material-ui/core/Badge';
import {
    getLoginUrl,
    getMailUrl,
    getCollectionsUrl,
    getSearchUrl,
    getAllUsersUrl,
    getLobbyUrl,
} from '../../common/routeName';
import { openDrawer } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnreadMailCount } from 'reducer/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        appButton: {
            color: 'white',
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const AppBarComponent: React.FC = () => {
    const _unreadMailCnt = useSelector(selectUnreadMailCount);
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const history = useHistory();

    const classes = useStyles();

    const menuClick = (): void => {
        openDrawer(dispatch);
    };

    const musicClick = (): void => {
        history.push(getLobbyUrl());
    };

    const mailClick = (): void => {
        history.push(getMailUrl());
    };

    const collectionsClick = (): void => {
        history.push(getCollectionsUrl());
    };

    const searchClick = (): void => {
        history.push(getSearchUrl());
    };

    const peopleClick = (): void => {
        history.push(getAllUsersUrl());
    };

    const exitClick = (): void => {
        setLoginFlag(false);
        emitLogoutSocketMsg(getMeId());
        history.push(getLoginUrl());
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={menuClick}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton className={classes.appButton} edge="start" onClick={musicClick}>
                        <MusicNoteIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={mailClick}>
                        <Badge color="secondary" badgeContent={_unreadMailCnt} invisible={_unreadMailCnt <= 0}>
                            <MailOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={collectionsClick}>
                        <AlbumIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={searchClick}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={peopleClick}>
                        <PeopleIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={exitClick}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};
