import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../service';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';
import { RetMsgObj } from '../dataInterfaces/music';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: 250,
        },
        paper: {
            width: 230,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #000',
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
    const openTheHint = useDispatch(openHint);

    const MIN_LEN = 6;

    const history = useHistory();
    const classes = useStyles({});

    const resolveData = (data: RetMsgObj): void => {
        openTheHint(data.msg);
        history.push('/login');
    };

    const failedRegister = (e: Error): void => {
        openTheHint(e.message);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (user.length < MIN_LEN) {
            openTheHint('user name is too short!');
            return;
        }

        if (password.length < MIN_LEN) {
            openTheHint('password is too short!');
            return;
        }

        // event.preventDefault();
        postRegister(user, password, resolveData, failedRegister);
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        error={user.length < MIN_LEN}
                        label="user"
                        onChange={(e): void => setUser(e.target.value)}
                        helperText={'at least ' + MIN_LEN + 'characters'}
                    />
                    <TextField
                        error={password.length < MIN_LEN}
                        id="standard-basic"
                        label="password"
                        type="password"
                        onChange={(e): void => setPassword(e.target.value)}
                        helperText={'at least ' + MIN_LEN + 'characters'}
                    />
                    <Button type="submit" variant="contained" color="secondary">
                        register
                    </Button>
                    <Button component={Link} to="/login" type="submit" variant="contained" color="primary">
                        go login page
                    </Button>
                </form>
            </div>
        </Container>
    );
};
