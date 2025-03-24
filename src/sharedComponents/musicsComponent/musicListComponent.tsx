import React, { useState, useEffect } from 'react';
// 修改前
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// import { List } from '@material-ui/core/List';
// import { ListItem } from '@material-ui/core/ListItem';
// import { Button } from '@material-ui/core';
// import VolumeUp from '@material-ui/icons/VolumeUp';
// import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
// import RemoveCircleOutlineOutlined from '@material-ui/icons/RemoveCircleOutlineOutlined';
// import Comment from '@material-ui/icons/Comment';

// 修改后
import { makeStyles, createStyles } from '@mui/styles';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { Button } from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Comment from '@mui/icons-material/Comment';

import { Music } from '../../common/interface';
import { IconButton } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import CommentIcon from '@material-ui/icons/Comment';

interface MusicList {
    musics: Music[];
    currentMusicId: number;
    clickMusic: (music: Music) => void;
    addMusicClick: (id: number) => void;
    removeMusicClick?: (id: number) => void;
    commentClick?: (id: number) => void;
}

const useStyles = makeStyles({
    list: {
        // height: 300,
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
    const { musics, currentMusicId, clickMusic, addMusicClick, removeMusicClick, commentClick } = props;

    const [myMusics, setMyMusics] = useState(musics);

    useEffect(() => {
        setMyMusics(props.musics);
    }, [props.musics]);

    const musicElements = myMusics.map((music: Music, index: number) => {
        return (
            <ListItem divider button key={index} onClick={(): void => clickMusic(music)}>
                {music.name}
                {currentMusicId === music.id ? (
                    <VolumeUpIcon className={classes.soundIcon}></VolumeUpIcon>
                ) : (
                    <div></div>
                )}
                <IconButton
                    onClick={(e): void => {
                        e.stopPropagation();
                        addMusicClick(music.id);
                    }}
                >
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </IconButton>
                {removeMusicClick ? (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            removeMusicClick(music.id);
                        }}
                    >
                        <RemoveCircleOutlineOutlinedIcon></RemoveCircleOutlineOutlinedIcon>
                    </IconButton>
                ) : (
                    <div></div>
                )}
                {commentClick ? (
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            commentClick(music.id);
                        }}
                    >
                        <CommentIcon></CommentIcon>
                    </IconButton>
                ) : (
                    <div></div>
                )}
            </ListItem>
        );
    });

    return (
        <List component="nav">
            <React.Fragment>{musicElements}</React.Fragment>{' '}
        </List>
    );
};
