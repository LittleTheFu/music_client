import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music, CollectionDetail } from '../../common/interface';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../../globals';
import { useHistory } from 'react-router-dom';
import { MyCollectionsModal } from './myCollectionsModal';
import { MixDetail } from './mixDetailComponent';
import { addMusicToCollection } from '../../common/service';
import { getMusicCommentUrl } from '../../common/routeName';
import { useDispatch as _useDispatch } from 'react-redux';
import { openHint } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';

interface MusicsDetailProps {
    initData: (
        id: number,
        resolve: (data: CollectionDetail) => void,
        reject: (arg0: object) => void,
    ) => Promise<CollectionDetail>;
    trashClick?: () => void;
    removeMusicClick?: (musicId: number, actionAfterRemoved: () => void) => void;
}

export const MusicsDetail: React.FC<MusicsDetailProps> = (props: MusicsDetailProps) => {
    const { id } = useParams();

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const [detail, setDetail] = useState<CollectionDetail>(null);
    const [currentTheMusicId] = useGlobal('currentMusicId');

    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const dispatch = _useDispatch<Dispatch<SystemActionTypes>>();

    const history = useHistory();

    const intId = parseInt(id);

    const { initData, trashClick, removeMusicClick } = props;

    useEffect(() => {
        initData(
            intId,
            detail => {
                setDetail(detail);
            },
            console.log,
        );
    }, [initData, intId]);

    const removeMusicClickWrapper = (musicId: number): void => {
        removeMusicClick(musicId, () => {
            setDetail({
                ...detail,
                musics: detail.musics.filter(m => {
                    return m.id !== musicId;
                }),
            });
        });
    };

    const clickMusic = (music: Music): void => {
        updatePlayingMusics(detail.musics);
        updateTheCurrentMusic(music);
    };

    const mixClick = (collectionId: number): void => {
        addMusicToCollection(collectionId, wantAddMusicId, (o): void => {
            openHint(dispatch, o.msg);
        });
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };

    const commentClick = (id: number): void => {
        history.push(getMusicCommentUrl(id));
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
                        trashClick={detail.canBeDeleted ? trashClick : null}
                        removeMusicClick={removeMusicClick ? removeMusicClickWrapper : null}
                        showBackButton={true}
                    ></MixDetail>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
