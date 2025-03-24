import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteCollection, getCollectionDetailById, removeMusicFromCollection } from '../../common/service';
import { useNavigate } from 'react-router-dom';
import { MusicsDetail } from '../../sharedComponents/musicsComponent/musicsDetail';
import { getCollectionsUrl } from '../../common/routeName';
import { SystemActionTypes } from 'reducer/system/types';
import { openHint } from 'reducer/system/functions';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();
    const intId = parseInt(id);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const deleteClick = (): void => {
        deleteCollection(
            intId,
            (o): void => {
                openHint(dispatch, o.msg);
                // 修改前的跳转逻辑
                // history.push('/some-path');
                // 修改后的跳转逻辑
                navigate('/some-path');
                // 若要返回上一页，可使用
                // history.goBack();
                // 替换为
                navigate(-1);
            },
            console.log,
        );
    };

    const removeMusicClick = (musicId: number, actionAfterRemoved: () => void): void => {
        removeMusicFromCollection(
            musicId,
            intId,
            o => {
                actionAfterRemoved();
                openHint(dispatch, o.msg);
            },
            console.log,
        );
    };

    return (
        <MusicsDetail
            initData={getCollectionDetailById}
            trashClick={deleteClick}
            removeMusicClick={removeMusicClick}
        ></MusicsDetail>
    );
};
