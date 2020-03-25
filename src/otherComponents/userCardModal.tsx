import React, { useState } from 'react';
import { useGlobal, useDispatch } from 'reactn';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { sendMail } from '../service';
import { useHistory, Link, useRouteMatch } from 'react-router-dom';

export const UserCardModal: React.FC = () => {
    const [userCardModalOpen, setUserCardModalOpen] = useGlobal('userCardModalOpen');
    const [currentClickUserId] = useGlobal('currentClickUserId');
    const [content, setContent] = useState('');
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const detailClick = (): void => {
        history.push(`${url}/userdetail`);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('post');

        sendMail(
            currentClickUserId,
            content,
            o => {
                console.log(o);
                setUserCardModalOpen(false);
            },
            console.log,
        );
    }

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={userCardModalOpen}
            onClose={(): void => {
                setUserCardModalOpen(false);
            }}
        >
            <DialogTitle id="simple-dialog-title">send mail</DialogTitle>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField id="standard-basic" label="comment" onChange={(e): void => setContent(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    send
                </Button>
            </form>
            <Button onClick={detailClick} variant="contained" color="primary">
                detail
            </Button>
        </Dialog>
    );
};
