import React, { useState, useEffect } from 'react';
import { getAlbums } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import { useHistory } from 'react-router-dom';
import { updateMusics, updateCurrentMusic } from '../../globals';
import { useDispatch } from 'reactn';
import { getAlbumUrl } from 'common/routeName';

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

    const clickCollectionCover = (id: number): void => {
        const c = musicCollections.find(ms => {
            return ms.id === id;
        });

        if (c && c.musics && c.musics.length > 0) {
            updatePlayingMusics(c.musics);
            updateTheCurrentMusic(c.musics[0]);
        }
    };

    const bodyClick = (id: number): void => {
        // history.push(`/main/collection_detail/` + id);
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
