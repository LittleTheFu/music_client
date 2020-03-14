import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Music } from '../dataInterfaces/music';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface MusicList {
    musics: Music[];
    currentMusic: Music;
    clickMusic: (music: Music, index: number) => void;
    likeClick: (id: number) => void;
    dislikeClick: (id: number) => void;
}

const useStyles = makeStyles({
    list: {
        width: 600,
        height: 300,
    },
    soundIcon: {
        color: 'red',
    },
    likeIcon: {
        color: 'red',
    },
});

export const MusicListComponent: React.FC<MusicList> = (props: MusicList) => {
    const classes = useStyles({});
    const { musics, currentMusic, clickMusic, likeClick, dislikeClick } = props;

    const musicElements = musics.map((music: Music, index: number) => {
        return (
            <ListItem button key={music.name} onClick={(): void => clickMusic(music, index)}>
                {music.like}
                {music.likedByCurrentUser ? (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            dislikeClick(music.id);
                        }}
                    >
                        <FavoriteIcon className={classes.likeIcon}></FavoriteIcon>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            likeClick(music.id);
                        }}
                    >
                        <FavoriteBorderIcon className={classes.likeIcon}></FavoriteBorderIcon>
                    </IconButton>
                )}
                ---{index} : {music.name}---
                {currentMusic.id === music.id ? (
                    <VolumeUpIcon className={classes.soundIcon}></VolumeUpIcon>
                ) : (
                    <div></div>
                )}
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </ListItem>
        );
    });

    return (
        <Card className={classes.list} raised={true}>
            <List component="nav">
                <React.Fragment>{musicElements}</React.Fragment>{' '}
            </List>
        </Card>
    );
};
