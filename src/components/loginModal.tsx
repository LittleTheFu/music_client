import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createObjectPost } from '../service';
import Snackbar from '@material-ui/core/Snackbar';
import { setUserName, setToken } from '../globals';
import { useGlobal } from 'reactn';

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

// interface LoginModalProps {
//     modalOpen: boolean;
//     handleClose: () => void;
// }

export const LoginModal: React.FC = () => {
    const [isLogin, setIsLogin] = useGlobal('isLogin');
    const [loginModalOpen, setLoginModalOpen] = useGlobal('loginModalOpen');

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('snackbar-msg');
    const classes = useStyles({});

    const resolveData = (data: any): void => {
        if ('error' in data) {
            setSnackbarMsg(data.error);
            setSnackbarOpen(true);
            console.log('error : ' + data.error);
        } else if ('accessToken' in data) {
            setToken(data.accessToken);
            setUserName(user);
            console.log('accessToken : ' + data.accessToken);
            setSnackbarMsg('success!');
            setSnackbarOpen(true);
            setIsLogin(true);
            // handleClose();
            setLoginModalOpen(false);
        }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('username: ', user, 'password: ', password);
        console.log('submit');
        createObjectPost({ username: user, password: password }, resolveData);
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={loginModalOpen}
                onClose={(): void => {
                    setLoginModalOpen(false);
                }}
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(): void => {
                                setLoginModalOpen(false);
                            }}
                        >
                            close
                        </Button>
                    </form>
                </div>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                message={snackbarMsg}
                onClose={(): void => {
                    setSnackbarOpen(false);
                }}
            />
        </div>
    );
};
