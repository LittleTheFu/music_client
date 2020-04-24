import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

interface MusicCollectionProps {
    collection: MusicCollection;
    coverClick: (name: string, id?: number) => void;
    bodyClick: (name: string, id?: number) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        main: {
            padding: 0,
        },
        playButton: {
            color: 'red',
        },
        card: {
            width: 160,
            height: 160,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        cover: {
            width: 120,
            height: 120,
        },
    }),
);

export const MusicCollectionComponent: React.FC<MusicCollectionProps> = (props: MusicCollectionProps) => {
    const { collection, coverClick, bodyClick } = props;
    const classes = useStyles({});

    return (
        <div className={classes.main}>
            <GridListTile className={classes.card}>
                <img
                    className={classes.card}
                    src={collection.cover}
                    alt={collection.name}
                    onClick={(): void => {
                        bodyClick(collection.name, collection.id);
                    }}
                />
                <GridListTileBar
                    title={collection.name}
                    subtitle={collection.isPlaying ? <span>by: playing</span> : <span></span>}
                    actionIcon={
                        <IconButton
                            onClick={(event): void => {
                                event.preventDefault();
                                coverClick(collection.name, collection.id);
                            }}
                        >
                            <PlayCircleFilledIcon className={classes.playButton} />
                        </IconButton>
                    }
                />
            </GridListTile>
        </div>
    );
};
