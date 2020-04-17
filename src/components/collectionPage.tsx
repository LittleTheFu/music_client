import React, { useEffect, useState } from 'react';
import { getMusicCollections } from '../service';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { MusicCollection } from '../dataInterfaces/music';

export const MusicCollectionPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);

    const clickCollectionCover = (name: string): void => {
        console.log('cover click');
    };
    const bodyClick = (name: string): void => {
        console.log('body click');
    };

    useEffect(() => {
        getMusicCollections((collections): void => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    return (
        <MusicCollectionsComponent
            coverClick={clickCollectionCover}
            collections={musicCollections}
            bodyClick={bodyClick}
        ></MusicCollectionsComponent>
    );
};
