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
    // const [userId, setUserId] = useGlobal('userId');

    const history = useHistory();
    const { path, url } = useRouteMatch();

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={(): void => {
                            setDrawerOpen(true);
                        }}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        className={classes.appButton}
                        edge="start"
                        onClick={(): void => {
                            history.push(`${url}/lobby`);
                        }}
                    >
                        <MusicNoteIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.appButton}
                        onClick={(): void => {
                            history.push(`${url}/mail`);
                        }}
                    >
                        <MailOutlinedIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.appButton}
                        onClick={(): void => {
                            history.push(`${url}/collections`);
                        }}
                    >
                        <AlbumIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.appButton}
                        onClick={(): void => {
                            history.push(`${url}/search`);
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.appButton}
                        onClick={(): void => {
                            setLoginFlag(false);
                            // setUserId('guest');

                            history.push('/login');
                        }}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};
