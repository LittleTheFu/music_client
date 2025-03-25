import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SystemActionTypes } from 'reducer/system/types';
import { loadAlbumList } from 'reducer/system/functions';
import { getAlbumUrl } from 'common/routeName';
import { useNavigate } from 'react-router-dom';
import { selectAlbumList, selectAlbumLoading } from 'reducer/rootReducer';
import PageHeader from '../path/to/PageHeader'; // 替换为实际的导入路径
import AlbumList from '../path/to/AlbumList'; // 替换为实际的导入路径

export const LobbyPage: React.FC = () => {
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const albumList = useSelector(selectAlbumList);
    const loading = useSelector(selectAlbumLoading);
    const navigate = useNavigate();

    const bodyClick = (id: number): void => {
        navigate(getAlbumUrl(id));
    };

    useEffect(() => {
        if (albumList.length === 0) {
            dispatch(loadAlbumList());
        }
    }, [dispatch, albumList]);

    return (
        <div>
            <PageHeader
                title={'Albums'}
                searchBar={true}
                searchCallback={(str: string) => {
                    dispatch(loadAlbumList({ keyword: str }));
                }}
            ></PageHeader>
            <div className={classes.content}>
                <AlbumList
                    albumList={albumList}
                    bodyClick={bodyClick}
                    loading={loading}
                ></AlbumList>
            </div>
        </div>
    );
};

export default LobbyPage;