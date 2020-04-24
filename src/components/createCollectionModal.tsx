import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createCollection } from '../service';
import { MusicCollection } from '../dataInterfaces/music';

interface CreateCollectionModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    addToCollections: (collection: MusicCollection) => void;
    // sendClick: (content: string) => void;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = (props: CreateCollectionModalProps) => {
    const [content, setContent] = useState('');

    const { modalOpen, modalClose, addToCollections } = props;

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
            <DialogTitle id="simple-dialog-title">Create Collection</DialogTitle>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="name"
                    onChange={(e): void => {
                        setContent(e.target.value);
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    create
                </Button>
            </form>
        </Dialog>
    );
};
