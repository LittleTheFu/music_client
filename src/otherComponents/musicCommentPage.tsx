import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMusicComments, postMusicComments } from '../service';
import { MusicComment } from '../dataInterfaces/music';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { BackButton } from '../otherComponents/backButton';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';

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
            height: 40,
            width: 40,
        },
        card: {
            width: '98%',
            marginLeft: 10,
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
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item xs={1}>
                                <Avatar
                                    className={classes.userAvatar}
                                    src={comment.avatar}
                                    onClick={(): void => {
                                        detailClick(comment.userId);
                                    }}
                                ></Avatar>
                            </Grid>
                            <Grid container item xs={11}>
                                {comment.username}: {comment.content}
                                <Grid item xs={12} className={classes.date}>
                                    {comment.date.toString()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
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
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>
        </Grid>
    );
};
