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
interface MusicCollectionProps {
    collection: MusicCollection;
    coverClick: (name: string) => void;
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
    const { collection, coverClick } = props;
    const classes = useStyles({});

    return (
        <div className={classes.main}>
            <GridListTile
                onClick={(): void => {
                    console.log('tile clicked');
                }}
            >
                <img src={collection.cover} alt={collection.name} />
                <GridListTileBar
                    title={collection.name}
                    subtitle={<span>by: {collection.name}</span>}
                    actionIcon={
                        <IconButton
                            onClick={(): void => {
                                coverClick(collection.name);
                            }}
                        >
                            <PlayCircleFilledIcon />
                        </IconButton>
                    }
                />
            </GridListTile>
            {/* <Card raised={true} className={classes.card}>
                <h6>{collection.name}</h6>
                <CardMedia
                    image={collection.cover}
                    className={classes.cover}
                    onClick={(): void => {
                        coverClick(collection.name);
                    }}
                ></CardMedia>
            </Card> */}
        </div>
    );
};
