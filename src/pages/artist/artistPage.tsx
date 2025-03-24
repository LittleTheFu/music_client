import React, { useEffect, useState } from 'react';
import { getArtistInfo } from '../../common/service';
import { useParams } from 'react-router-dom';
// 修改前
// import { useHistory } from 'react-router-dom';
// 修改后
import { useNavigate } from 'react-router-dom';
import { Artist } from '../../common/interface';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { makeStyles } from '@mui/styles';
import { createStyles } from '@mui/styles';
import { getAlbumUrl } from 'common/routeName';
import { updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { useDispatch } from 'react-redux';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';

const useStyles = makeStyles(() =>
    createStyles({
        artist: {
            width: 160,
            paddingLeft: 30,
            paddingTop: 30,
        },
        name: {
            paddingLeft: 40,
        },
    })
);

export const ArtistPage: React.FC = () => {
    const [artist, setArtist] = useState<Artist>(null);
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();
    const { id } = useParams();
    const intId = parseInt(id);
    const classes = useStyles();

    useEffect(() => {
        getArtistInfo(
            intId,
            (o): void => {
                setArtist(o);
            },
            console.log
        );
    }, [intId]);

    const clickCollectionCover = (id: number): void => {
        artist.albums.forEach((c) => {
            if (c.id === id) {
                updateMusics(dispatch, c.musics);
                updateCurrentMusic(dispatch, c.musics[0]);
            }
        });
    };

    const bodyClick = (id: number): void => {
        // 修改前
        // history.push(getAlbumUrl(id));
        // 修改后
        navigate(getAlbumUrl(id));
    };

    return (
        <div>
            {artist ? (
                <div>
                    <img alt="artist" src={artist.avatar} className={classes.artist} />
                    <h1 className={classes.name}>{artist.name}</h1>
                    <MusicCollectionsComponent
                        coverClick={clickCollectionCover}
                        collections={artist.albums}
                        bodyClick={bodyClick}
                    ></MusicCollectionsComponent>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
