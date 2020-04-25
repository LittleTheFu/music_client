import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

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
        gridList: {},
        playButton: {
            color: 'red',
            width: 48,
            height: 48,
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
        root: {
            position: 'relative',
            // height: 400,
        },
        mask: {
            position: 'absolute',
            width: 160,
            height: 90,
            color: 'white',
            backgroundColor: 'black',
            left: 0,
            bottom: 0,
            opacity: 0.6,
        },
        name: {
            width: 100,
            height: 90,
            wordBreak: 'break-all',
            textAlign: 'center',
            verticalAlign: 'middle',
            top: 40,
            position: 'absolute',
        },
        buttonBox: {
            position: 'absolute',
            top: 90,
            left: 90,
            // zInde: 100,
        },
    }),
);

export const MusicCollectionComponent: React.FC<MusicCollectionProps> = (props: MusicCollectionProps) => {
    const { collection, coverClick, bodyClick } = props;
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <img
                className={classes.card}
                src={collection.cover}
                alt={collection.name}
                onClick={(): void => {
                    bodyClick(collection.name, collection.id);
                }}
            />
            <div
                className={classes.mask}
                onClick={(): void => {
                    bodyClick(collection.name, collection.id);
                }}
            >
                <div className={classes.name}>{collection.name}</div>
            </div>

            <IconButton
                className={classes.buttonBox}
                onClick={(): void => {
                    coverClick(collection.name, collection.id);
                }}
            >
                <PlayCircleFilledWhiteOutlinedIcon className={classes.playButton} />
            </IconButton>
        </div>
    );
};
