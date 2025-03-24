import React, { useState, useEffect } from 'react';
import { getAlbums } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import { getAlbumUrl } from 'common/routeName';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { SystemActionTypes } from 'reducer/system/types';
import { updateMusics, updateCurrentMusic } from 'reducer/system/functions';

export const LobbyPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();


    useEffect(() => {
        getAlbums(collections => {
            setMusicCollections(collections);
            // console.log(collections);
        });
    }, []);

    const clickCollectionCover = (id: number): void => {
        const c = musicCollections.find(ms => {
            return ms.id === id;
        });

        if (c && c.musics && c.musics.length > 0) {
            updateMusics(dispatch, c.musics);
            updateCurrentMusic(dispatch, c.musics[0]);
        }
    };

    const bodyClick = (id: number): void => {
        history.push(getAlbumUrl(id));
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

export default LobbyPage;