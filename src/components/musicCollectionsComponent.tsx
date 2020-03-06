import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';

interface MusicCollectionsProps {
    collections: MusicCollection[];
}

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections } = props;

    return (
        <div>
            {collections.map((c: MusicCollection, index: number) => {
                return <MusicCollectionComponent key={index} collection={c}></MusicCollectionComponent>;
            })}
        </div>
    );
};
