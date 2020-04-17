import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface WriteMailModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    sendClick: (content: string) => void;
}

export const WriteMailModal: React.FC<WriteMailModalProps> = (props: WriteMailModalProps) => {
    const [content, setContent] = useState('');

    const { modalOpen, modalClose, sendClick } = props;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendClick(content);
    };

    return (
        <Dialog
            onClose={(): void => {
                modalClose();
                console.log('close');
            }}
            aria-labelledby="simple-dialog-title"
            open={modalOpen}
        >
            <DialogTitle id="simple-dialog-title">SendMail</DialogTitle>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="message"
                    onChange={(e): void => {
                        setContent(e.target.value);
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    post
                </Button>
            </form>
        </Dialog>
    );
};
