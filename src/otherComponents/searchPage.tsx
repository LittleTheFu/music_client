import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { fetchMusicsByKeyword } from '../service';
import { useGlobal, useDispatch } from 'reactn';
import { Music } from '../dataInterfaces/music';
import { MyCollectionsModal } from '../components/myCollectionsModal';
import { updateMusics, updateCurrentMusic, openHint } from '../globals';
import { MusicListComponent } from '../components/musicListComponent';
import { addMusicToCollection } from '../service';
import { useDebounce } from '../helper/debounce';

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
    const [currentTheMusic] = useGlobal('currentMusic');

    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const openTheHint = useDispatch(openHint);

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
        console.log('search : ' + debouncedContent);
    }, [debouncedContent]);

    const clickMusic = (music: Music): void => {
        updatePlayingMusics(musics);
        updateTheCurrentMusic(music);
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };

    const mixClick = (collectionId: number): void => {
        addMusicToCollection(
            collectionId,
            wantAddMusicId,
            (o): void => {
                openTheHint(o.msg);
                // setModalOpen(false);
            },
            console.log,
        );
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
                <MusicListComponent
                    musics={musics}
                    currentMusicId={currentTheMusic}
                    clickMusic={clickMusic}
                    addMusicClick={addMusicClick}
                ></MusicListComponent>
            </Grid>
        </Grid>
    );
};
