import React from 'react';
import { MusicCollection } from '../dataInterfaces/music';
import { MusicCollectionComponent } from './musicCollectionComponent';

interface MusicCollectionsProps {
    collections: MusicCollection[];
    coverClick: (name: string) => void;
}

export const MusicCollectionsComponent: React.FC<MusicCollectionsProps> = (props: MusicCollectionsProps) => {
    const { collections, coverClick } = props;

    return (
        <div>
            {collections.map((c: MusicCollection, index: number) => {
                return (
                    <MusicCollectionComponent
                        coverClick={coverClick}
                        key={index}
                        collection={c}
                    ></MusicCollectionComponent>
                );
            })}
        </div>
    );
};
