import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import { useDispatch, useGlobal } from 'reactn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import { setLoginFlag, openMenuDrawer, getMeId } from '../../globals';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import { emitLogoutSocketMsg } from '../../common/socket';
import Badge from '@material-ui/core/Badge';

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
    const openTheMenuDrawer = useDispatch(openMenuDrawer);
    const [_newMailHint] = useGlobal('newMailHint');
    const updateTheNewMailHint = useDispatch('updateNewMailHint');

    const history = useHistory();

    const classes = useStyles();

    const menuClick = (): void => {
        openTheMenuDrawer();
    };

    const musicClick = (): void => {
        history.push(`/main/lobby`);
    };

    const mailClick = (): void => {
        updateTheNewMailHint(false);
        history.push(`/main/mail`);
    };

    const collectionsClick = (): void => {
        history.push(`/main/collections`);
    };

    const searchClick = (): void => {
        history.push(`/main/search`);
    };

    const peopleClick = (): void => {
        history.push(`/main/all_users`);
    };

    const exitClick = (): void => {
        setLoginFlag(false);
        emitLogoutSocketMsg(getMeId());
        history.push('/login');
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
                        <Badge color="secondary" variant="dot" invisible={!_newMailHint}>
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
