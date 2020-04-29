import React, { useEffect, useState } from 'react';
import { getArtistInfo, getAlbums } from '../service';
import { useHistory, useParams } from 'react-router-dom';
import { Artist } from '../dataInterfaces/music';

export const ArtistPage: React.FC = () => {
    const [artist, setArtist] = useState<Artist>(null);

    const history = useHistory();

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getArtistInfo(
            intId,
            (o): void => {
                console.log(o);
                setArtist(o);
            },
            console.log,
        );
    }, [history.location]);

    return (
        <div>
            {artist ? (
                <div>
                    <img alt="" src={artist.avatar} />
                    {artist.name}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
