import React, { useState, useEffect } from 'react';
import { getPublicMusicCollections } from '../service';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { MusicCollection } from '../dataInterfaces/music';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const LobbyPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);

    const history = useHistory();
    const { path, url } = useRouteMatch();

    useEffect(() => {
        getPublicMusicCollections(collections => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    const clickCollectionCover = (name: string): void => {
        console.log('cover click');
    };

    const bodyClick = (name: string, id: number): void => {
        history.push(`/main/collection_detail/` + id);

        console.log('body click');
    };

    return (
        <div>
            {' '}
            <MusicCollectionsComponent
                coverClick={clickCollectionCover}
                collections={musicCollections}
                bodyClick={bodyClick}
            ></MusicCollectionsComponent>
        </div>
    );
};
