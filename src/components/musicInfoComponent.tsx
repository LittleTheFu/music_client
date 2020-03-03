import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Music, dummyMusic } from '../dataInterfaces/music';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

interface MusicInfoProps {
    music: Music;
    likeClick: () => void;
    dislikeClick: () => void;
}

const useStyles = makeStyles({
    card: {
        width: 600,
    },
    '@keyframes spin': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    cover: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        animationName: '$spin',
        animationDuration: '12000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationPlayState: 'running',
    },
    likeIcon: {
        color: 'red',
    },
});

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
    const classes = useStyles({});
    const { music, likeClick, dislikeClick } = props;
    return (
        <Card raised={true} className={classes.card}>
            <h4>
                {music.name}--
                {music.artist}--
                {music.album}--
            </h4>
            ---{music.like}{' '}
            {music.likedByCurrentUser ? (
                <IconButton className={classes.likeIcon} onClick={dislikeClick}>
                    <FavoriteIcon></FavoriteIcon>
                </IconButton>
            ) : (
                <IconButton className={classes.likeIcon} onClick={likeClick}>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                </IconButton>
            )}
            ---
            <CardMedia image={music.cover} className={classes.cover}></CardMedia>
        </Card>
    );
};

MusicInfoComponent.defaultProps = {
    music: dummyMusic,
};
