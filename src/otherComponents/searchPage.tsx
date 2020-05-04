import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { fetchMusicsByKeyword } from '../service';
import { useGlobal, useDispatch } from 'reactn';
import { Music } from '../dataInterfaces/music';
import { MyCollectionsModal } from '../components/myCollectionsModal';
import { useHistory } from 'react-router-dom';
import { updateMusics, updateCurrentMusic } from '../globals';
import { MusicListComponent } from '../components/musicListComponent';

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

    const [content, setContent] = useState('');
    const [musics, setMusics] = useState<Music[]>([]);

    const [wantAddMusicId, setWantAddMusicId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    const history = useHistory();

    const classes = useStyles();

    const doSearch = (key: string): void => {
        if (key !== 'Enter') {
            return;
        }

        if (content === '') {
            return;
        }

        fetchMusicsByKeyword(
            content,
            (retMusic): void => {
                setMusics(retMusic);
            },
            console.log,
        );
        console.log('search : ' + content);
    };

    const clickMusic = (music: Music, index: number): void => {
        updatePlayingMusics(musics);
        updateTheCurrentMusic(music);
    };

    const addMusicClick = (id: number): void => {
        setWantAddMusicId(id);
        setModalOpen(true);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <MyCollectionsModal
                    modalOpen={modalOpen}
                    modalClose={(): void => {
                        setModalOpen(false);
                    }}
                    musicId={wantAddMusicId}
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
                    onKeyUp={(e): void => {
                        doSearch(e.key);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <MusicListComponent
                    musics={musics}
                    currentMusic={currentTheMusic}
                    clickMusic={clickMusic}
                    addMusicClick={addMusicClick}
                ></MusicListComponent>
            </Grid>
        </Grid>
    );
};
