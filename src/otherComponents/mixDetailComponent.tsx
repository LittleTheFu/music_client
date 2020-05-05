import React from 'react';
import { Music, CollectionDetail } from '../dataInterfaces/music';
import { MusicListComponent } from '../components/musicListComponent';
import Grid from '@material-ui/core/Grid';
import { BackButton } from '../otherComponents/backButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { DeleteButton } from '../otherComponents/deleteButton';

const useStyles = makeStyles(() =>
    createStyles({
        cover: {
            width: 160,
        },
    }),
);

interface MixDetailProps {
    currentMusic: Music;
    detail: CollectionDetail;
    clickMusic: (music: Music, index: number) => void;
    addMusicClick: (id: number) => void;
    removeMusicClick?: (id: number) => void;
    commentClick?: (id: number) => void;
    trashClick?: () => void;
}

export const MixDetail: React.FC<MixDetailProps> = (props: MixDetailProps) => {
    const classes = useStyles();

    const { detail, currentMusic, clickMusic, addMusicClick, commentClick, removeMusicClick, trashClick } = props;

    return (
        <div>
            {detail ? (
                <Grid container>
                    <Grid item xs={12}>
                        <BackButton></BackButton>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <img className={classes.cover} src={detail.cover} alt="cover" />
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <h1>{detail.name}</h1>
                        {trashClick ? <DeleteButton clickDelete={trashClick} /> : <div />}
                    </Grid>
                    <Grid item xs={12}>
                        <MusicListComponent
                            musics={detail.musics}
                            currentMusic={currentMusic}
                            clickMusic={clickMusic}
                            addMusicClick={addMusicClick}
                            commentClick={commentClick}
                            removeMusicClick={removeMusicClick}
                        ></MusicListComponent>
                    </Grid>
                </Grid>
            ) : (
                <div></div>
            )}
        </div>
    );
};
