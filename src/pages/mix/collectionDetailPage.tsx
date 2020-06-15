import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteCollection, getCollectionDetailById, removeMusicFromCollection } from '../../common/service';
import { useHistory } from 'react-router-dom';
import { MusicsDetail } from '../../sharedComponents/musicsComponent/musicsDetail';
import { getCollectionsUrl } from '../../common/routeName';
import { SystemActionTypes } from 'reducer/system/types';
import { openHint } from 'reducer/system/functions';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();

    const history = useHistory();
    const intId = parseInt(id);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const deleteClick = (): void => {
        deleteCollection(
            intId,
            (o): void => {
                openHint(dispatch, o.msg);
                history.push(getCollectionsUrl());
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
