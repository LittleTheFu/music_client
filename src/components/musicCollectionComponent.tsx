import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useGlobal, useDispatch } from 'reactn';

interface MusicCollectionProps {
    collection: MusicCollection;
    coverClick: (name: string) => void;
    bodyClick: (name: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            padding: 3,
        },
        card: {
            [theme.breakpoints.down('sm')]: {
                width: 100,
            },
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        cover: {
            [theme.breakpoints.down('sm')]: {
                width: 75,
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                width: 150,
                height: 150,
            },

            // borderRadius: '50%',
        },
    }),
);

export const MusicCollectionComponent: React.FC<MusicCollectionProps> = (props: MusicCollectionProps) => {
    const { collection, coverClick, bodyClick } = props;
    const classes = useStyles({});
    const [collectionInfoModalOpen, setCollectionInfoModalOpen] = useGlobal('collectionInfoModalOpen');

    return (
        <div className={classes.main}>
            <GridListTile>
                <img
                    src={collection.cover}
                    alt={collection.name}
                    onClick={(): void => {
                        bodyClick(collection.name);
                    }}
                />
                <GridListTileBar
                    title={collection.name}
                    subtitle={collection.isPlaying ? <span>by: playing</span> : <span></span>}
                    actionIcon={
                        <IconButton
                            onClick={(event): void => {
                                event.preventDefault();
                                coverClick(collection.name);
                            }}
                        >
                            <PlayCircleFilledIcon />
                        </IconButton>
                    }
                />
            </GridListTile>
        </div>
    );
};
