import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Music, dummyMusic } from '../dataInterfaces/music';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

interface MusicInfoProps {
    // name: string;
    // artist: string;
    // album: string;
    // cover?: string;
    music: Music;
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
});

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
    const classes = useStyles({});
    const { music } = props;
    return (
        <Card raised={true} className={classes.card}>
            <h4>
                {music.name}--
                {music.artist}--
                {music.album}--
            </h4>
            ---{music.like} <FavoriteBorderIcon></FavoriteBorderIcon>---
            <CardMedia image={music.cover} className={classes.cover}></CardMedia>
        </Card>
    );
};

MusicInfoComponent.defaultProps = {
    // name: 'name',
    // artist: 'artist',
    // album: 'album',
    // cover: 'http://localhost:9999/album/3.png',
    music: dummyMusic,
};
