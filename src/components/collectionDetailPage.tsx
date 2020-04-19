import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { Music, CollectionDetail, dummyCollectionDetail } from '../dataInterfaces/music';
import { fetchMusicsByCollectionId, getCollectionDetailById } from '../service';
import { MusicListComponent } from './musicListComponent';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const CollectionDetailPage: React.FC = () => {
    const { id } = useParams();
    // const [musics, setMusics] = useState<Music[]>([]);
    const [detail, setDetail] = useState<CollectionDetail>(dummyCollectionDetail);
    const [currentTheMusic] = useGlobal('currentMusic');
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const intId = parseInt(id);

    useEffect(() => {
        getCollectionDetailById(
            intId,
            detail => {
                setDetail(detail);
                console.log(detail);
            },
            console.log,
        );
    }, []);

    const clickMusic = (music: Music, index: number): void => {
        console.log('click music');
        updatePlayingMusics(detail.musics);
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
        history.push(`/main/music_comment/` + id);

        console.log('comment click');
    };

    return (
        <div>
            <h1>{detail.name}</h1>
            {detail.canBeDeleted ? (
                <IconButton
                    onClick={(e): void => {
                        e.stopPropagation();
                        history.push(`/main/collections/`);
                    }}
                >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            ) : (
                <div></div>
            )}
            <MusicListComponent
                musics={detail.musics}
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
