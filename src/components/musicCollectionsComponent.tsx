import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string) => void;
    bodyClick: (name: string, id?: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            width: 600,
            padding: 20,
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            // transform: 'translateZ(0)',
        },
    }),
);

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick, bodyClick } = props;
    const classes = useStyles({});

    return (
        <div className={classes.root}>
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
        </div>
    );
};
