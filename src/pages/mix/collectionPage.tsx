import React, { useEffect, useState } from 'react';
import { getPrivateMusicCollections, fetchMusicsByCollectionId } from '../../common/service';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { MusicCollection } from '../../common/interface';
import { Grid } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles'; // 注意：如果使用的是 emotion 作为样式引擎，可能需要调整为 @mui/system
import { getCollectionDetailUrl } from 'common/routeName';
import { useDispatch } from 'react-redux';
import { openHint, updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// 修改导入方式
import { CreateCollectionModal } from '../../pages/mix/createCollectionModal';

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

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const history = useHistory();

    const classes = useStyles({});

    const clickCollectionCover = (id: number): void => {
        fetchMusicsByCollectionId(id, musics => {
            // const musics = fetchedMusics as Music[];
            if (musics) {
                if (musics.length > 0) {
                    updateMusics(dispatch, musics);
                    updateCurrentMusic(dispatch, musics[0]);
                } else {
                    openHint(dispatch, 'empty!');
                }
            }
        });
    };

    const bodyClick = (id: number): void => {
        history.push(getCollectionDetailUrl(id));
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
