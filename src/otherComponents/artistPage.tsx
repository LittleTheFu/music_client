import React, { useEffect } from 'react';
import { getArtistInfo, getAlbums } from '../service';
import { useHistory, useParams } from 'react-router-dom';

export const ArtistPage: React.FC = () => {
    const history = useHistory();

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getAlbums((o): void => {
            console.log(o);
        }, console.log);
        // getArtistInfo(
        //     intId,
        //     (o): void => {
        //         console.log(o);
        //     },
        //     console.log,
        // );
    }, []);

    return <h1>Artist</h1>;
};
