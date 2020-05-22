import React, { useState, useEffect } from 'react';
import { getAlbums } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import { useHistory } from 'react-router-dom';
import { updateMusics, updateCurrentMusic } from '../../globals';
import { useDispatch } from 'reactn';

export const LobbyPage: React.FC = () => {
    // const [albums, setAlbums] = useState<Album[]>([]);
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const history = useHistory();

    useEffect(() => {
        getAlbums(collections => {
            setMusicCollections(collections);
            // console.log(collections);
        });
    }, []);

    const clickCollectionCover = (name: string, id: number): void => {
        musicCollections.forEach(c => {
            if (c.id === id) {
                updatePlayingMusics(c.musics);
                updateTheCurrentMusic(c.musics[0]);
            }
        });
    };

    const bodyClick = (name: string, id: number): void => {
        // history.push(`/main/collection_detail/` + id);
        history.push(`/main/album/` + id);
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
