import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string) => void;
}

const useStyles = makeStyles({
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
});

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick } = props;
    const classes = useStyles({});

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <GridList className={classes.gridList} cols={2.5}>
                    {collections.map((c: MusicCollection, index: number) => {
                        return (
                            <MusicCollectionComponent
                                coverClick={coverClick}
                                key={index}
                                collection={c}
                            ></MusicCollectionComponent>
                        );
                    })}
                </GridList>
            </Grid>
        </Grid>
    );
};
