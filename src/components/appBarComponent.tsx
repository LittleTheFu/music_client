import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { getDetail } from 'service';
import AlbumIcon from '@material-ui/icons/Album';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        exitButton: {
            color: 'white',
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        userAvatar: {
            backgroundColor: deepOrange[500],
        },
        guestAvatar: {
            backgroundColor: deepPurple[500],
        },
    }),
);

// interface AppBarProps {
//     menuButtonClick: () => void;
//     avatarButtonClick: () => void;
// }

export const AppBarComponent: React.FC = () => {
    const [isLogin, setIsLogin] = useGlobal('isLogin');
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');
    const [userId, setUserId] = useGlobal('userId');
    const [meId] = useGlobal('meId');
    const [currentClickUserId, setCurrentClickUserId] = useGlobal('currentClickUserId');
    const [avatar] = useGlobal('avatar');

    const history = useHistory();
    const { path, url } = useRouteMatch();

    const classes = useStyles();

    // const logout = (): void => {
    //     doLogout();
    // };

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
                        className={classes.exitButton}
                        edge="start"
                        onClick={(): void => {
                            history.push(`${url}`);
                        }}
                    >
                        <MusicNoteIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.exitButton}
                        onClick={(): void => {
                            history.push(`${url}/mail`);
                            console.log('MAIL CLICK');
                        }}
                    >
                        <MailOutlinedIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.exitButton}
                        onClick={(): void => {
                            history.push(`${url}/collections`);
                        }}
                    >
                        <AlbumIcon />
                    </IconButton>
                    {isLogin ? (
                        <div>
                            <IconButton
                                edge="start"
                                className={classes.exitButton}
                                onClick={(): void => {
                                    setIsLogin(false);
                                    setUserId('guest');

                                    history.push('/login');
                                }}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {isLogin ? (
                        <Avatar
                            src={avatar}
                            className={classes.userAvatar}
                            onClick={(): void => {
                                setCurrentClickUserId(meId).then(() => {
                                    history.push(`${url}/userdetail`);
                                });
                            }}
                        ></Avatar>
                    ) : (
                        <Avatar className={classes.guestAvatar}>G</Avatar>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};
