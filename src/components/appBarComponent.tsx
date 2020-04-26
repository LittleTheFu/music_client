import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import { useGlobal } from 'reactn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import { setLoginFlag } from '../globals';
import SearchIcon from '@material-ui/icons/Search';

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
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');

    const history = useHistory();
    const { path, url } = useRouteMatch();

    const classes = useStyles();

    const menuClick = (): void => {
        setDrawerOpen(true);
    };

    const musicClick = (): void => {
        history.push(`/main/lobby`);
    };

    const mailClick = (): void => {
        history.push(`/main/mail`);
    };

    const collectionsClick = (): void => {
        history.push(`/main/collections`);
    };

    const searchClick = (): void => {
        history.push(`/main/search`);
    };

    const exitClick = (): void => {
        setLoginFlag(false);
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
                        <MailOutlinedIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={collectionsClick}>
                        <AlbumIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={searchClick}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.appButton} onClick={exitClick}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};
