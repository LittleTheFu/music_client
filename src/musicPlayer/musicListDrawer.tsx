import React from 'react';
// 修改前
// import Drawer from '@material-ui/core/Drawer';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import VolumeUpIcon from '@material-ui/icons/VolumeUp';
// 修改后
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const useStyles = makeStyles({
    list: {
        minWidth: 150,
        maxWidth: 300,
    },
    soundIcon: {
        color: 'red',
    },
    likeIcon: {
        color: 'red',
    },
    header: {
        textAlign: 'center',
    },
});

interface MusicListDrawerProps {
    open: boolean;
    closeClick: () => void;

    musics: Music[];
    currentMusicId: number;
    clickMusic: (music: Music) => void;
}

export const MusicListDrawer: React.FC<MusicListDrawerProps> = (props: MusicListDrawerProps) => {
    const { open, closeClick, musics, currentMusicId, clickMusic } = props;

    const classes = useStyles({});

    const musicElements = musics.map((music: Music, index: number) => {
        return (
            <ListItem divider button key={index} onClick={(): void => clickMusic(music)}>
                {music.name}
                {currentMusicId === music.id ? (
                    <VolumeUpIcon className={classes.soundIcon}></VolumeUpIcon>
                ) : (
                    <div></div>
                )}
            </ListItem>
        );
    });

    return (
        <div>
            <Drawer
                anchor="right"
                open={open}
                onClose={(): void => {
                    closeClick();
                }}
            >
                <h3 className={classes.header}>Play List</h3>
                <List component="nav" className={classes.list}>
                    <React.Fragment>{musicElements}</React.Fragment>{' '}
                </List>
            </Drawer>
        </div>
    );
};
