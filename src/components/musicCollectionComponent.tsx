import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

interface MusicCollectionProps {
    collection: MusicCollection;
    coverClick: (name: string) => void;
}

const useStyles = makeStyles({
    card: {
        width: 340,
    },
    cover: {
        width: 200,
        height: 100,
    },
});

export const MusicCollectionComponent: React.FC<MusicCollectionProps> = (props: MusicCollectionProps) => {
    const { collection, coverClick } = props;
    const classes = useStyles({});

    return (
        <div>
            <Card raised={true} className={classes.card}>
                <h1>{collection.name}</h1>
                <CardMedia
                    image={collection.cover}
                    className={classes.cover}
                    onClick={(): void => {
                        coverClick(collection.name);
                    }}
                ></CardMedia>
            </Card>
        </div>
    );
};
