import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUserName } from '../global';

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
    const classes = useStyles();

    const { menuButtonClick, avatarButtonClick } = props;
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
                </Toolbar>
            </AppBar>
        </div>
    );
};
