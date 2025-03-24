import React, { useState } from 'react';
// 修改前
// import { DialogTitle } from '@material-ui/core/DialogTitle';
// import { Dialog } from '@material-ui/core/Dialog';
// import { Button } from '@material-ui/core/Button';
// import { TextField } from '@material-ui/core/TextField';
// import { Grid } from '@material-ui/core/Grid';
// import { makeStyles, createStyles } from '@material-ui/core/styles';

// 修改后
import { DialogTitle } from '@mui/material';
import { Dialog } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            textAlign: 'center',
        },
        inputBox: {
            width: '100%',
        },
        sendButton: {
            width: '100%',
        },
    }),
);

interface WriteMailModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    sendClick: (content: string) => void;
}

export const WriteMailModal: React.FC<WriteMailModalProps> = (props: WriteMailModalProps) => {
    const [content, setContent] = useState('');
    const { modalOpen, modalClose, sendClick } = props;

    const classes = useStyles({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendClick(content);
    };

    return (
        <Dialog
            onClose={(): void => {
                modalClose();
            }}
            aria-labelledby="simple-dialog-title"
            open={modalOpen}
        >
            <Grid container>
                <Grid item xs={12}>
                    <DialogTitle id="simple-dialog-title" className={classes.title}>
                        SendMail
                    </DialogTitle>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <Grid item xs={12}>
                            <TextField
                                className={classes.inputBox}
                                id="standard-basic"
                                label="message"
                                multiline
                                rows={4}
                                onChange={(e): void => {
                                    setContent(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" className={classes.sendButton}>
                                post
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
};
