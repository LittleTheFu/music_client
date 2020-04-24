import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music, CollectionDetail, dummyCollectionDetail } from '../dataInterfaces/music';
import { deleteCollection, getCollectionDetailById, removeMusicFromCollection } from '../service';
import { MusicListComponent } from './musicListComponent';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { MyCollectionsModal } from './myCollectionsModal';
import Grid from '@material-ui/core/Grid';
import { BackButton } from '../otherComponents/backButton';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [detail, setDetail] = useState<CollectionDetail>(dummyCollectionDetail);
    const [currentTheMusic] = useGlobal('currentMusic');
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

    const deleteClick = (): void => {
        deleteCollection(
            intId,
            (o): void => {
                history.push(`/main/collections/`);
            },
            console.log,
        );
    };

    const clickMusic = (music: Music, index: number): void => {
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <MyCollectionsModal
                        modalOpen={modalOpen}
                        modalClose={(): void => {
                            setModalOpen(false);
                        }}
                        musicId={wantAddMusicId}
                    ></MyCollectionsModal>
                </Grid>
                <Grid item xs={12}>
                    <BackButton></BackButton>
                    {detail.name}
                    {detail.canBeDeleted ? (
                        <div>
                            <IconButton
                                onClick={(): void => {
                                    deleteClick();
                                }}
                            >
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <MusicListComponent
                        musics={detail.musics}
                        currentMusic={currentTheMusic}
                        clickMusic={clickMusic}
                        addMusicClick={addMusicClick}
                        removeMusicClick={detail.canBeDeleted ? removeMusicClick : null}
                        commentClick={commentClick}
                    ></MusicListComponent>
                </Grid>
            </Grid>
        </div>
    );
};
