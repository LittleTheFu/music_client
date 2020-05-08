import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteCollection, getCollectionDetailById, removeMusicFromCollection } from '../service';
import { useDispatch } from 'reactn';
import { openHint } from '../globals';
import { useHistory } from 'react-router-dom';
import { MusicsDetail } from '../otherComponents/musicsDetail';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();
    const openTheHint = useDispatch(openHint);

    const history = useHistory();
    const intId = parseInt(id);

    const deleteClick = (): void => {
        deleteCollection(
            intId,
            (o): void => {
                openTheHint(o.msg);
                history.push(`/main/collections/`);
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
                openTheHint(o.msg);
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
