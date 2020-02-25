import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createBlogPost } from '../service';

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
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

interface LoginModalProps {
    modalOpen: boolean;
    handleClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles({});
    const { modalOpen, handleClose } = props;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('username: ', user, 'password: ', password);
        console.log('submit');
        createBlogPost({ username: user, password: password });
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalOpen}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="user" onChange={(e): void => setUser(e.target.value)} />
                        <TextField
                            id="standard-basic"
                            label="password"
                            onChange={(e): void => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            login
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            close
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
