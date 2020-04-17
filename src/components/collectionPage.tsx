import React, { useEffect, useState } from 'react';
import { getMusicCollections } from '../service';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { MusicCollection } from '../dataInterfaces/music';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import { CreateCollectionModal } from './createCollectionModal';

export const MusicCollectionPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const clickCollectionCover = (name: string): void => {
        console.log('cover click');
    };

    const bodyClick = (name: string): void => {
        console.log('body click');
    };

    const closeModal = (): void => {
        setModalOpen(false);
    };

    useEffect(() => {
        getMusicCollections((collections): void => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    return (
        <div>
            <CreateCollectionModal modalOpen={modalOpen} modalClose={closeModal}></CreateCollectionModal>
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
