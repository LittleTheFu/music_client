import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMusicComments, postMusicComments } from '../service';
import { MusicComment } from '../dataInterfaces/interface';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { BackButton } from '../otherComponents/backButton';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';
import { CommentCard } from '../otherComponents/commentCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        userAvatar: {
            height: 80,
            width: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        card: {
            width: '100%',
        },
        item: {
            width: '100%',
        },
        date: {
            color: 'grey',
        },
        inputBox: {
            width: '100%',
        },
        postButton: {
            width: '100%',
        },
    }),
);

export const MusicCommentPage: React.FC = () => {
    const [comments, setComments] = useState<MusicComment[]>([]);
    const [content, setContent] = useState('');

    const openTheHint = useDispatch(openHint);
    const history = useHistory();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getMusicComments(
            intId,
            retComments => {
                setComments(retComments);
            },
            console.log,
        );
    }, [intId]);

    const detailClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    const infoElements = comments.map((comment: MusicComment, index: number) => {
        return (
            <div key={index}>
                <ListItem>
                    <CommentCard detailClick={detailClick} comment={comment}></CommentCard>
                </ListItem>
                <Divider />
            </div>
        );
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        postMusicComments(
            intId,
            content,
            comments => {
                openTheHint('you post a new comment!');
                setComments(comments);
            },
            console.log,
        );
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <BackButton></BackButton>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        className={classes.inputBox}
                        id="standard-basic"
                        label="comment"
                        variant="outlined"
                        onChange={(e): void => setContent(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.postButton}>
                        post
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12}>
                <List>
                    <React.Fragment>{infoElements}</React.Fragment>
                </List>
            </Grid>
        </Grid>
    );
};
