import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Music } from '../dataInterfaces/music';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
    list: {
        // width: 600,
        // height: 300,
    },
    soundIcon: {
        color: 'red',
    },
    likeIcon: {
        color: 'red',
    },
});

interface MusicListDrawerProps {
    open: boolean;
    closeClick: () => void;

    musics: Music[];
    currentMusic: Music;
    clickMusic: (music: Music, index: number) => void;
}

export const MusicListDrawer: React.FC<MusicListDrawerProps> = (props: MusicListDrawerProps) => {
    const { open, closeClick, musics, currentMusic, clickMusic } = props;

    const classes = useStyles({});

    const musicElements = musics.map((music: Music, index: number) => {
        return (
            <ListItem button key={music.name} onClick={(): void => clickMusic(music, index)}>
                {music.name}
                {currentMusic.id === music.id ? (
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
                <List component="nav">
                    <React.Fragment>{musicElements}</React.Fragment>{' '}
                </List>
            </Drawer>
        </div>
    );
};
