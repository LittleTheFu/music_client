import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music, CollectionDetail } from '../dataInterfaces/music';
import { getAlbumDetail } from '../service';
import { MusicListComponent } from '../components/musicListComponent';
import { useGlobal, useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useHistory } from 'react-router-dom';
import { MyCollectionsModal } from '../components/myCollectionsModal';
import Grid from '@material-ui/core/Grid';
import { BackButton } from '../otherComponents/backButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MixDetail } from '../otherComponents/mixDetailComponent';

const useStyles = makeStyles(() =>
    createStyles({
        cover: {
            width: 160,
        },
    }),
);

export const AlbumDetailPage: React.FC = () => {
    const { id } = useParams();

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [detail, setDetail] = useState<CollectionDetail>(null);
    const [currentTheMusic] = useGlobal('currentMusic');
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const history = useHistory();

    const intId = parseInt(id);

    const classes = useStyles();

    useEffect(() => {
        getAlbumDetail(
            intId,
            detail => {
                setDetail(detail);
                console.log(detail);
            },
            console.log,
        );
    }, [history.location]);

    const clickMusic = (music: Music, index: number): void => {
        console.log('CLICK MUSIC');
        console.log(music);
        updatePlayingMusics(detail.musics);
        updateTheCurrentMusic(music);
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };

    const commentClick = (id: number): void => {
        history.push(`/main/music_comment/` + id);
    };

    return (
        <div>
            {detail ? (
                <div>
                    <MyCollectionsModal
                        modalOpen={modalOpen}
                        modalClose={(): void => {
                            setModalOpen(false);
                        }}
                        musicId={wantAddMusicId}
                    ></MyCollectionsModal>
                    <MixDetail
                        commentClick={commentClick}
                        addMusicClick={addMusicClick}
                        clickMusic={clickMusic}
                        currentMusic={currentTheMusic}
                        detail={detail}
                    ></MixDetail>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
