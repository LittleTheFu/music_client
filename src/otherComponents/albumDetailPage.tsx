import React from 'react';
import { getAlbumDetail } from '../service';
import { MusicsDetail } from './musicsDetail';

export const AlbumDetailPage: React.FC = () => {
    return <MusicsDetail initData={getAlbumDetail}></MusicsDetail>;
};
