import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { MusicComment } from '../dataInterfaces/music';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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

    const classes = useStyles({});

    // const infoElements = collectionInfoData.map((music: Music, index: number) => {
    //     return <ListItem key={music.name}>{music.name}</ListItem>;
    // });

    const infoElements = comments.map((comment: MusicComment, index: number) => {
        return <ListItem key={index}>{comment.content}</ListItem>;
    });

    return (
        <Dialog
            onClose={(): void => {
                setCommentModalOpen(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={commentModalOpen}
        >
            <DialogTitle id="simple-dialog-title">Comment</DialogTitle>
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>

            <TextField id="standard-basic" label="comment" />
        </Dialog>
    );
};
