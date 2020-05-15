import React from 'react';
import { MusicCollection } from '../../common/interface';
import { MusicCollectionComponent } from './musicCollectionComponent';
import Grid from '@material-ui/core/Grid';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string, id?: number) => void;
    bodyClick: (name: string, id?: number) => void;
}

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick, bodyClick } = props;

    return (
        <div>
            <Grid container>
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
