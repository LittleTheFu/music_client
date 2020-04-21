import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string, id?: number) => void;
    bodyClick: (name: string, id?: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // display: 'flex',
            // flexWrap: 'wrap',
            // justifyContent: 'space-around',
            // overflow: 'hidden',
            // padding: 0,
        },
        gridList: {
            // flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            // transform: 'translateZ(0)',
        },
    }),
);

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick, bodyClick } = props;
    // const classes = useStyles({});

    return (
        <div>
            <Grid container spacing={1}>
                {collections.map((c: MusicCollection, index: number) => {
                    return (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                            <MusicCollectionComponent
                                bodyClick={bodyClick}
                                coverClick={coverClick}
                                collection={c}
                            ></MusicCollectionComponent>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};
