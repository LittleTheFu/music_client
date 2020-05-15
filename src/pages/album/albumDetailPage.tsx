import React from 'react';
import { getAlbumDetail } from '../../common/service';
import { MusicsDetail } from '../../sharedComponents/musicsComponent/musicsDetail';

export const AlbumDetailPage: React.FC = () => {
    return <MusicsDetail initData={getAlbumDetail}></MusicsDetail>;
};
