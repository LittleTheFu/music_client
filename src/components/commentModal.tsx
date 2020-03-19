import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

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
    const classes = useStyles({});

    // const infoElements = collectionInfoData.map((music: Music, index: number) => {
    //     return <ListItem key={music.name}>{music.name}</ListItem>;
    // });

    return (
        <Dialog
            onClose={(): void => {
                setCommentModalOpen(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={commentModalOpen}
        >
            <DialogTitle id="simple-dialog-title">Comment</DialogTitle>
            <TextField id="standard-basic" label="comment" />
        </Dialog>
    );
};
