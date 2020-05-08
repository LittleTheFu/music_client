import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music, CollectionDetail } from '../dataInterfaces/music';
import { getAlbumDetail } from '../service';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic, openHint } from '../globals';
import { useHistory } from 'react-router-dom';
import { MyCollectionsModal } from '../components/myCollectionsModal';
import { MixDetail } from '../otherComponents/mixDetailComponent';
import { addMusicToCollection } from '../service';

export const AlbumDetailPage: React.FC = () => {
    const { id } = useParams();

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const [detail, setDetail] = useState<CollectionDetail>(null);
    const [currentTheMusicId] = useGlobal('currentMusicId');

    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const openTheHint = useDispatch(openHint);

    const history = useHistory();

    const intId = parseInt(id);

    useEffect(() => {
        getAlbumDetail(
            intId,
            detail => {
                setDetail(detail);
                console.log(detail);
            },
            console.log,
        );
    }, [history.location]);

    const clickMusic = (music: Music): void => {
        console.log('CLICK MUSIC');
        console.log(music);
        updatePlayingMusics(detail.musics);
        updateTheCurrentMusic(music);
    };

    const mixClick = (collectionId: number): void => {
        addMusicToCollection(
            collectionId,
            wantAddMusicId,
            (o): void => {
                openTheHint(o.msg);
            },
            console.log,
        );
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
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
                        commentClick={commentClick}
                        addMusicClick={addMusicClick}
                        clickMusic={clickMusic}
                        currentMusicId={currentTheMusicId}
                        musics={detail.musics}
                        name={detail.name}
                        cover={detail.cover}
                    ></MixDetail>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
