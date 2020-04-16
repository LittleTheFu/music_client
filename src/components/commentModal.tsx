import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal, useDispatch } from 'reactn';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { MusicComment } from '../dataInterfaces/music';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { postMusicComments } from '../service';
import { updateComments } from '../globals';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 300,
            height: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        userAvatar: {
            backgroundColor: deepOrange[500],
            height: 40,
            width: 40,
        },
        card: {
            width: 500,
        },
        date: {
            color: 'grey',
        },
        inputBox: {
            width: 450,
        },
    }),
);

export const CommentModal: React.FC = () => {
    const [commentModalOpen, setCommentModalOpen] = useGlobal('commentModalOpen');
    const [comments] = useGlobal('comments');
    const [currentCommentMusicId] = useGlobal('currentCommentMusicId');
    const [userCardModalOpen, setUserCardModalOpen] = useGlobal('userCardModalOpen');
    const [currentClickUserId, setCurrentClickUserId] = useGlobal('currentClickUserId');
    const updateTheComments = useDispatch(updateComments);
    const [content, setContent] = useState('');

    const classes = useStyles({});

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
                                        setUserCardModalOpen(true);
                                        setCurrentClickUserId(comment.userId);
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
        console.log('post');

        postMusicComments(
            currentCommentMusicId,
            content,
            comments => {
                updateTheComments(comments as MusicComment[]);
                console.log('AFTER POST');
                console.log(comments);
            },
            console.log,
        );
    }

    return (
        <Dialog
            onClose={(): void => {
                setCommentModalOpen(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={commentModalOpen}
        >
            <DialogTitle id="simple-dialog-title">Comments</DialogTitle>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    className={classes.inputBox}
                    id="standard-basic"
                    label="comment"
                    onChange={(e): void => setContent(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    post
                </Button>
            </form>
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>
        </Dialog>
    );
};
