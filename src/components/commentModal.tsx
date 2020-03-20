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
    }),
);

export const CommentModal: React.FC = () => {
    const [commentModalOpen, setCommentModalOpen] = useGlobal('commentModalOpen');
    const [comments] = useGlobal('comments');
    const [currentCommentMusicId] = useGlobal('currentCommentMusicId');
    const updateTheComments = useDispatch(updateComments);
    const [content, setContent] = useState('');

    const classes = useStyles({});

    const infoElements = comments.map((comment: MusicComment, index: number) => {
        return (
            <ListItem key={index}>
                {comment.username} : {comment.content}
            </ListItem>
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
        // console.log('username: ', user, 'password: ', password);
        // console.log('submit');
        // postLogin(user, password, resolveData);
        // You should see email and password in console.
        // ..code to submit form to backend here...
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
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField id="standard-basic" label="comment" onChange={(e): void => setContent(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    post
                </Button>
            </form>
        </Dialog>
    );
};
