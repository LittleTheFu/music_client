import React, { useState, useEffect } from 'react';
import { InputBase } from '@mui/material';
import { Grid } from '@mui/material';
import { fetchMusicsByKeyword } from '../../common/service';
import { Music } from '../../common/interface';
import { MyCollectionsModal } from '../../sharedComponents/musicsComponent/myCollectionsModal';
import { addMusicToCollection } from '../../common/service';
import { useDebounce } from '../../common/debounce';
import { MixDetail } from '../../sharedComponents/musicsComponent/mixDetailComponent';
import { useDispatch, useSelector } from 'react-redux';
import { openHint, updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { selectCurrentMusicId } from 'reducer/rootReducer';
// 新增导入 Theme
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputRoot: {
            paddingTop: 30,
            paddingBottom: 30,
        },
        inputBox: {
            border: '1px solid grey',
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            borderRadius: theme.shape.borderRadius,
        },
        inputInput: {
            paddingLeft: 4,
        },
    }),
);

export const SearchPage: React.FC = () => {
    const currentTheMusicId = useSelector(selectCurrentMusicId);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const [content, setContent] = useState('');
    const [musics, setMusics] = useState<Music[]>([]);

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const classes = useStyles();

    const debouncedContent = useDebounce(content, 500);

    useEffect(() => {
        if (debouncedContent === '') {
            return;
        }

        fetchMusicsByKeyword(
            debouncedContent,
            (retMusic): void => {
                setMusics(retMusic);
            },
            console.log,
        );
    }, [debouncedContent]);

    const clickMusic = (music: Music): void => {
        updateMusics(dispatch, musics);
        updateCurrentMusic(dispatch, music);
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };

    const mixClick = (collectionId: number): void => {
        addMusicToCollection(collectionId, wantAddMusicId, (o): void => {
            openHint(dispatch, o.msg);
        });
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <MyCollectionsModal
                    modalOpen={modalOpen}
                    modalClose={(): void => {
                        setModalOpen(false);
                    }}
                    mixClick={mixClick}
                ></MyCollectionsModal>
            </Grid>
            <Grid item xs={12} className={classes.inputRoot}>
                <InputBase
                    classes={{
                        input: classes.inputInput,
                        root: classes.inputBox,
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e): void => {
                        setContent(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <MixDetail
                    addMusicClick={addMusicClick}
                    clickMusic={clickMusic}
                    currentMusicId={currentTheMusicId}
                    musics={musics}
                    showBackButton={false}
                ></MixDetail>
            </Grid>
        </Grid>
    );
};
