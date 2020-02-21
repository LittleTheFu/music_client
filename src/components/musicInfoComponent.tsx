import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

interface MusicInfoProps {
    name: string;
    artist: string;
    album: string;
    cover?: string;
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

    return (
        <Card raised={true} className={classes.card}>
            <h4>
                {props.name}--
                {props.artist}--
                {props.album}--
            </h4>
            <CardMedia image={props.cover} className={classes.cover}></CardMedia>
        </Card>
    );
};

MusicInfoComponent.defaultProps = {
    name: 'name',
    artist: 'artist',
    album: 'album',
    cover: 'http://localhost:9999/album/3.png',
};
