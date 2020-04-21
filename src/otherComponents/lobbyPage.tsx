import React, { useState, useEffect } from 'react';
import { getPublicMusicCollections, fetchMusicsByCollectionId } from '../service';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { MusicCollection, Music } from '../dataInterfaces/music';
import { useHistory } from 'react-router-dom';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useDispatch } from 'reactn';

export const LobbyPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const history = useHistory();
    // const { path, url } = useRouteMatch();

    useEffect(() => {
        getPublicMusicCollections(collections => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    const clickCollectionCover = (name: string, id: number): void => {
        console.log('cover click');

        fetchMusicsByCollectionId(
            id,
            fetchedMusics => {
                const musics = fetchedMusics as Music[];
                if (musics && musics.length > 0) {
                    updatePlayingMusics(musics);
                    updateTheCurrentMusic(musics[0]);
                }
            },
            console.log,
        );
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
