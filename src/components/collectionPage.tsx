import React, { useEffect, useState } from 'react';
import { getPrivateMusicCollections, fetchMusicsByCollectionId } from '../service';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { MusicCollection, Music } from '../dataInterfaces/music';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import { CreateCollectionModal } from './createCollectionModal';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';

export const MusicCollectionPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const history = useHistory();
    const { path, url } = useRouteMatch();

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

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const addNewCollection = (collection: MusicCollection): void => {
        setMusicCollections(musicCollections.concat(collection));
    };

    useEffect(() => {
        getPrivateMusicCollections((collections): void => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    return (
        <div>
            <CreateCollectionModal
                addToCollections={addNewCollection}
                modalOpen={modalOpen}
                modalClose={closeModal}
            ></CreateCollectionModal>
            <IconButton
                onClick={(e): void => {
                    e.stopPropagation();
                    setModalOpen(true);

                    console.log('ADD COLLECTION');
                }}
            >
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </IconButton>
            <MusicCollectionsComponent
                coverClick={clickCollectionCover}
                collections={musicCollections}
                bodyClick={bodyClick}
            ></MusicCollectionsComponent>
        </div>
    );
};
