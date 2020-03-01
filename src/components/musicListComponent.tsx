import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Music } from '../dataInterfaces/music';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

interface MusicList {
    musics: Music[];
    clickMusic: (music: Music, index: number) => void;
    likeClick: (id: number) => void;
}

const useStyles = makeStyles({
    list: {
        width: 600,
        height: 300,
    },
});

export const MusicListComponent: React.FC<MusicList> = (props: MusicList) => {
    const classes = useStyles({});
    const { musics, clickMusic, likeClick } = props;

    const musicElements = musics.map((music: Music, index: number) => {
        return (
            <ListItem button key={music.name} onClick={(): void => clickMusic(music, index)}>
                {music.like}
                {music.likedByCurrentUser ? (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            console.log('like');
                            likeClick(music.id);
                        }}
                    >
                        <FavoriteIcon></FavoriteIcon>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            console.log('like');
                            likeClick(music.id);
                        }}
                    >
                        <FavoriteBorderIcon></FavoriteBorderIcon>
                    </IconButton>
                )}
                ---{index} : {music.name}
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
