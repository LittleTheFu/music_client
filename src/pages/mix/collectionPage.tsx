import React, { useEffect, useState } from 'react';
import { getPrivateMusicCollections, fetchMusicsByCollectionId } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import { CreateCollectionModal } from './createCollectionModal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'reactn';
import { updateMusics, updateCurrentMusic } from '../../globals';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        addIcon: {
            // height: 60,
            // width: 60,
        },
    }),
);

export const MusicCollectionPage: React.FC = () => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const history = useHistory();

    const classes = useStyles({});

    const clickCollectionCover = (name: string, id: number): void => {
        fetchMusicsByCollectionId(
            id,
            musics => {
                // const musics = fetchedMusics as Music[];
                if (musics && musics.length > 0) {
                    updatePlayingMusics(musics);
                    updateTheCurrentMusic(musics[0]);
                }
            },
            console.log,
        );
    };

    const bodyClick = (name: string, id: number): void => {
        history.push(`/main/collection_detail/` + id);
    };

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const addNewCollection = (collection: MusicCollection): void => {
        setMusicCollections(musicCollections.concat(collection));
    };

    useEffect(() => {
        getPrivateMusicCollections((collections): void => {
            setMusicCollections(collections);
        });
    }, []);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <CreateCollectionModal
                        addToCollections={addNewCollection}
                        modalOpen={modalOpen}
                        modalClose={closeModal}
                    ></CreateCollectionModal>
                </Grid>
                <Grid item xs={12}>
                    <IconButton
                        onClick={(e): void => {
                            e.stopPropagation();
                            setModalOpen(true);
                        }}
                    >
                        <AddCircleOutlineIcon className={classes.addIcon}></AddCircleOutlineIcon>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <MusicCollectionsComponent
                        coverClick={clickCollectionCover}
                        collections={musicCollections}
                        bodyClick={bodyClick}
                    ></MusicCollectionsComponent>
                </Grid>
            </Grid>
        </div>
    );
};
