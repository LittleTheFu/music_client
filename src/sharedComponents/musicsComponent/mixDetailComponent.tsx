import React, { useState, useEffect } from 'react';
import { Music } from '../../common/interface';
import { MusicListComponent } from './musicListComponent';
// 修改前
// import { Grid } from '@material-ui/core/Grid';
// import { makeStyles, createStyles } from '@material-ui/core/styles';

// 修改后
import { Grid } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { BackButton } from '../basicComponents/backButton';
import { DeleteButton } from '../basicComponents/deleteButton';

const useStyles = makeStyles(() =>
    createStyles({
        cover: {
            width: 160,
            paddingLeft: 10,
        },
        trashBtn: {
            display: 'inline',
        },
        name: {
            display: 'inline',
            padding: 5,
            fontSize: 30,
        },
    }),
);

interface MixDetailProps {
    currentMusicId: number;
    name?: string;
    cover?: string;
    musics: Music[];
    showBackButton: boolean;
    clickMusic: (music: Music) => void;
    addMusicClick: (id: number) => void;
    removeMusicClick?: (id: number) => void;
    commentClick?: (id: number) => void;
    trashClick?: () => void;
}

export const MixDetail: React.FC<MixDetailProps> = (props: MixDetailProps) => {
    const classes = useStyles();

    const {
        name,
        cover,
        musics,
        currentMusicId,
        clickMusic,
        addMusicClick,
        commentClick,
        removeMusicClick,
        trashClick,
        showBackButton,
    } = props;

    const [myMusics, setMyMusics] = useState(musics);

    useEffect(() => {
        setMyMusics(props.musics);
    }, [props.musics]);

    return (
        <div>
            {
                <Grid container>
                    {showBackButton ? (
                        <Grid item xs={12}>
                            <BackButton></BackButton>
                            {trashClick ? <DeleteButton clickDelete={trashClick} /> : <div />}{' '}
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                    {cover ? (
                        <Grid item xs={6} md={3}>
                            <img className={classes.cover} src={cover} alt="cover" />
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                    {name ? (
                        <Grid item xs={6} md={9}>
                            <div className={classes.name}>{name}</div>
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                    {myMusics ? (
                        <Grid item xs={12}>
                            <MusicListComponent
                                musics={myMusics}
                                currentMusicId={currentMusicId}
                                clickMusic={clickMusic}
                                addMusicClick={addMusicClick}
                                commentClick={commentClick}
                                removeMusicClick={removeMusicClick}
                            ></MusicListComponent>
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                </Grid>
            }
        </div>
    );
};
