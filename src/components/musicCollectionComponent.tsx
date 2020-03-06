import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';

interface MusicCollectionProps {
    collection: MusicCollection;
}

export const MusicCollectionComponent: React.FC<MusicCollectionProps> = (props: MusicCollectionProps) => {
    const { collection } = props;

    return <h1>{collection.name}</h1>;
};
