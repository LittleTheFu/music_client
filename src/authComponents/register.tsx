import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../service';
import { useHistory } from 'react-router-dom';

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

export const RegisterComponent: React.FC = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const classes = useStyles({});

    const resolveData = (data: any): void => {
        console.log('RESOLVE DATA');

        history.push('/login');
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
        <div className={classes.paper}>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="user" onChange={(e): void => setUser(e.target.value)} />
                <TextField id="standard-basic" label="password" onChange={(e): void => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    register
                </Button>
            </form>
        </div>
    );
};
