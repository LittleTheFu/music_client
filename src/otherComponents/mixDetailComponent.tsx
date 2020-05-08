import React from 'react';
import { Music } from '../dataInterfaces/music';
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
    currentMusicId: number;
    name?: string;
    cover?: string;
    musics: Music[];
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
    } = props;

    return (
        <div>
            {
                <Grid container>
                    <Grid item xs={12}>
                        <BackButton></BackButton>
                    </Grid>
                    {cover ? (
                        <Grid item xs={6} md={3}>
                            <img className={classes.cover} src={cover} alt="cover" />
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                    {name ? (
                        <Grid item xs={6} md={9}>
                            <h1>{name}</h1>
                            {trashClick ? <DeleteButton clickDelete={trashClick} /> : <div />}
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                    {musics ? (
                        <Grid item xs={12}>
                            <MusicListComponent
                                musics={musics}
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
