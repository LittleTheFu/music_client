import React, { useState, useEffect } from 'react';
import { getAlbums } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import { getAlbumUrl } from 'common/routeName';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { SystemActionTypes } from 'reducer/system/types';
import { updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

export const LobbyPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const albumList = useSelector(selectAlbumList);
    const loading = useSelector(selectAlbumLoading);
    // const history = useHistory(); // 移除这行代码
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const bodyClick = (id: number): void => {
        // 修改前
        // history.push(getAlbumUrl(id));
        // 修改后
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