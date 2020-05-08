import React, { useEffect, useState } from 'react';
import { getArtistInfo } from '../service';
import { useHistory, useParams } from 'react-router-dom';
import { Artist } from '../dataInterfaces/music';
import { useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';

export const ArtistPage: React.FC = () => {
    const [artist, setArtist] = useState<Artist>(null);
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const history = useHistory();

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getArtistInfo(
            intId,
            (o): void => {
                setArtist(o);
            },
            console.log,
        );
    }, [history.location]);

    const clickCollectionCover = (name: string, id: number): void => {
        artist.albums.forEach(c => {
            if (c.id === id) {
                updatePlayingMusics(c.musics);
                updateTheCurrentMusic(c.musics[0]);
            }
        });
    };

    const bodyClick = (name: string, id: number): void => {
        // history.push(`/main/collection_detail/` + id);
        history.push(`/main/album/` + id);
    };

    return (
        <div>
            {artist ? (
                <div>
                    <img alt="" src={artist.avatar} />
                    {artist.name}
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
