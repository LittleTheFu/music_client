import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../service';

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

export const RegModal: React.FC = () => {
    const [regModalOpen, setRegModalOpen] = useGlobal('regModalOpen');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles({});

    const resolveData = (): void => {
        setRegModalOpen(false);
        console.log('RESOLVE DATA');
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('username: ', user, 'password: ', password);
        console.log('submit');
        postRegister(user, password, resolveData);
        // postLogin(user, password, resolveData);
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={regModalOpen}
                onClose={(): void => {
                    setRegModalOpen(false);
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
                            register
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(): void => {
                                setRegModalOpen(false);
                            }}
                        >
                            close
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
