import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string) => void;
    bodyClick: (name: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            // transform: 'translateZ(0)',
        },

        rooter: {
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

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick, bodyClick } = props;
    const classes = useStyles({});

    return (
        <GridList className={classes.gridList} cols={2.5}>
            {collections.map((c: MusicCollection, index: number) => {
                return (
                    <MusicCollectionComponent
                        bodyClick={bodyClick}
                        coverClick={coverClick}
                        key={index}
                        collection={c}
                    ></MusicCollectionComponent>
                );
            })}
        </GridList>
    );
};
