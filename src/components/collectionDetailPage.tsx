import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { Music } from '../dataInterfaces/music';
import { fetchMusicsByCollectionId } from '../service';
import { MusicListComponent } from './musicListComponent';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();
    const [musics, setMusics] = useState<Music[]>([]);
    const [currentTheMusic] = useGlobal('currentMusic');
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const intId = parseInt(id);

    useEffect(() => {
        fetchMusicsByCollectionId(
            intId,
            fetchedMusics => {
                setMusics(fetchedMusics);
                console.log(fetchedMusics);
            },
            console.log,
        );
    }, []);

    const clickMusic = (music: Music, index: number): void => {
        console.log('click music');
        updatePlayingMusics(musics);
        updateTheCurrentMusic(music);
    };
    const likeClick = (id: number): void => {
        console.log('like');
    };
    const dislikeClick = (id: number): void => {
        console.log('dislike');
    };
    const addMusicClick = (id: number): void => {
        console.log('add music');
    };
    const removeMusicClick = (id: number): void => {
        console.log('remove');
    };
    const commentClick = (id: number): void => {
        console.log('comment click');
    };

    const musicElements = musics.map((m: Music, index: number) => {
        return (
            <h3 key={index}>
                {m.id}--{m.name}--{m.artist}
            </h3>
        );
    });

    return (
        <div>
            <h1>Collection Detail:{id}</h1>
            {/* {musics && musics.length > 0 ? <React.Fragment>{musicElements}</React.Fragment> : <div></div>} */}
            <MusicListComponent
                musics={musics}
                currentMusic={currentTheMusic}
                clickMusic={clickMusic}
                likeClick={likeClick}
                dislikeClick={dislikeClick}
                addMusicClick={addMusicClick}
                removeMusicClick={removeMusicClick}
                commentClick={commentClick}
            ></MusicListComponent>
        </div>
    );
};
