import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createCollection } from '../service';
import { MusicCollection } from '../dataInterfaces/interface';
import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        inputBox: {
            width: '100%',
        },
        createButton: {
            width: '100%',
        },
    }),
);
interface CreateCollectionModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    addToCollections: (collection: MusicCollection) => void;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = (props: CreateCollectionModalProps) => {
    const [content, setContent] = useState('');
    const { modalOpen, modalClose, addToCollections } = props;

    const classes = useStyles({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        createCollection(
            content,
            o => {
                addToCollections(o);
            },
            console.log,
        );
        modalClose();
    };

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            onClose={(): void => {
                modalClose();
            }}
            open={modalOpen}
        >
            <Grid container>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            className={classes.inputBox}
                            id="standard-basic"
                            label="name"
                            onChange={(e): void => {
                                setContent(e.target.value);
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.createButton}>
                            create
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
};
