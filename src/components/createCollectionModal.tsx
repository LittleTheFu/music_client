import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface CreateCollectionModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    // sendClick: (content: string) => void;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = (props: CreateCollectionModalProps) => {
    const { modalOpen, modalClose } = props;

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            onClose={(): void => {
                modalClose();
                console.log('close');
            }}
            open={modalOpen}
        >
            <DialogTitle id="simple-dialog-title">Create Collection</DialogTitle>
        </Dialog>
    );
};
