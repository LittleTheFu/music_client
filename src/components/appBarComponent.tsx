import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUserName, isGuest, doLogout, gIsGuest } from '../globals';
import Button from '@material-ui/core/Button';
import { useGlobal } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface AppBarProps {
    menuButtonClick: () => void;
    avatarButtonClick: () => void;
}

export const AppBarComponent: React.FC<AppBarProps> = (props: AppBarProps) => {
    const [isLogin, setIsLogin] = useGlobal('isLogin');

    const classes = useStyles();
    const { menuButtonClick, avatarButtonClick } = props;

    const logout = (): void => {
        doLogout();
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={menuButtonClick}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Welcome
                    </Typography>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={avatarButtonClick}
                        color="inherit"
                        aria-label="menu"
                    >
                        <AccountCircleIcon />
                        {getUserName()}
                    </IconButton>
                    {isLogin ? (
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(): void => {
                                    setIsLogin(false);
                                }}
                            >
                                logout
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {isLogin ? <div>user</div> : <div>gst</div>}
                </Toolbar>
            </AppBar>
        </div>
    );
};
