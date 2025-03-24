import React from 'react';
import { makeStyles } from '@mui/styles'; // 或者使用 @mui/system 中的样式功能
import AppBar from '@mui/material/AppBar';
// 修改前
// import Toolbar from '@material-ui/core/Toolbar';
// 修改后
import Toolbar from '@mui/material/Toolbar';
// 修改前
// import IconButton from '@material-ui/core/IconButton';
// 修改后
import IconButton from '@mui/material/IconButton';
// 修改前
// import MenuIcon from '@material-ui/icons/Menu';
// 修改后
import MenuIcon from '@mui/icons-material/Menu';

// 修改前
// import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
// 修改后
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

// 修改前
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// 修改后
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// 修改前
// import MusicNoteIcon from '@material-ui/icons/MusicNote';
// 修改后
import MusicNoteIcon from '@mui/icons-material/MusicNote';

// 修改前
// import AlbumIcon from '@material-ui/icons/Album';
// 修改后
import AlbumIcon from '@mui/icons-material/Album';

// 修改前
// import SearchIcon from '@material-ui/icons/Search';
// 修改后
import SearchIcon from '@mui/icons-material/Search';

// 修改前
// import PeopleIcon from '@material-ui/icons/People';
// 修改后
import PeopleIcon from '@mui/icons-material/People';

// 修改前
// import Badge from '@material-ui/core/Badge';
// 修改后
import Badge from '@mui/material/Badge';
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
import { setLoginFlag } from '../../globals';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const classes = useStyles();

    const menuClick = (): void => {
        openDrawer(dispatch);
    };

    const musicClick = (): void => {
        navigate(getLobbyUrl());
    };

    const mailClick = (): void => {
        navigate(getMailUrl());
    };

    const collectionsClick = (): void => {
        navigate(getCollectionsUrl());
    };

    const searchClick = (): void => {
        navigate(getSearchUrl());
    };

    const peopleClick = (): void => {
        navigate(getAllUsersUrl());
    };

    const exitClick = (): void => {
        setLoginFlag(false);
        emitLogoutSocketMsg(getMeId());
        navigate(getLoginUrl());
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
