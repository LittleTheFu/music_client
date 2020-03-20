import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

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

    const history = useHistory();

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
                    <Typography variant="h6" className={classes.title}>
                        Welcome
                    </Typography>
                    {/* <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="search" />
                    </form> */}
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
                        <Avatar className={classes.userAvatar}>U</Avatar>
                    ) : (
                        <Avatar className={classes.guestAvatar}>G</Avatar>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};
