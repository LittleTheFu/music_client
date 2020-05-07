import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music, CollectionDetail } from '../dataInterfaces/music';
import { deleteCollection, getCollectionDetailById, removeMusicFromCollection } from '../service';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useHistory } from 'react-router-dom';
import { MyCollectionsModal } from './myCollectionsModal';
import { MixDetail } from '../otherComponents/mixDetailComponent';
import { addMusicToCollection } from '../service';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [detail, setDetail] = useState<CollectionDetail>(null);
    const [currentTheMusicId] = useGlobal('currentMusicId');
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const history = useHistory();

    const intId = parseInt(id);

    useEffect(() => {
        getCollectionDetailById(
            intId,
            detail => {
                setDetail(detail);
            },
            console.log,
        );
    }, []);

    const mixClick = (collectionId: number): void => {
        addMusicToCollection(
            collectionId,
            wantAddMusicId,
            (o): void => {
                setModalOpen(false);
            },
            console.log,
        );
    };

    const deleteClick = (): void => {
        deleteCollection(
            intId,
            (o): void => {
                history.push(`/main/collections/`);
            },
            console.log,
        );
    };

    const clickMusic = (music: Music): void => {
        updatePlayingMusics(detail.musics);
        updateTheCurrentMusic(music);
    };
    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };
    const removeMusicClick = (musicId: number): void => {
        removeMusicFromCollection(
            musicId,
            intId,
            o => {
                setDetail({
                    ...detail,
                    musics: detail.musics.filter(m => {
                        return m.id !== musicId;
                    }),
                });
            },
            console.log,
        );
    };
    const commentClick = (id: number): void => {
        history.push(`/main/music_comment/` + id);
    };

    return (
        <div>
            {detail ? (
                <div>
                    <MyCollectionsModal
                        modalOpen={modalOpen}
                        modalClose={(): void => {
                            setModalOpen(false);
                        }}
                        mixClick={mixClick}
                    ></MyCollectionsModal>
                    <MixDetail
                        currentMusicId={currentTheMusicId}
                        detail={detail}
                        clickMusic={clickMusic}
                        addMusicClick={addMusicClick}
                        removeMusicClick={removeMusicClick}
                        commentClick={commentClick}
                        trashClick={detail.canBeDeleted ? deleteClick : null}
                    ></MixDetail>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
