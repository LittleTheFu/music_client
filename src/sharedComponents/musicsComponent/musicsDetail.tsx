import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Music, CollectionDetail } from '../../common/interface';
import { MyCollectionsModal } from './myCollectionsModal';
import { MixDetail } from './mixDetailComponent';
import { addMusicToCollection } from '../../common/service';
import { getMusicCommentUrl } from '../../common/routeName';
import { useDispatch, useSelector } from 'react-redux';
import { openHint, updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { selectCurrentMusicId } from 'reducer/rootReducer';

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
    // 新增：使用 useNavigate 钩子
    const navigate = useNavigate(); 

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const [detail, setDetail] = useState<CollectionDetail>(null);
    const currentTheMusicId = useSelector(selectCurrentMusicId);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

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
        updateMusics(dispatch, detail.musics);
        updateCurrentMusic(dispatch, music);
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
        // 使用 navigate 替代 history.push
        navigate(getMusicCommentUrl(id));
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

export default MusicsDetail;