import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../service';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';
import { RetMsgObj } from '../dataInterfaces/interface';

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

    const MIN_LEN = 4;
    const MAX_LEN = 6;

    const history = useHistory();
    const classes = useStyles({});

    const resolveData = (data: RetMsgObj): void => {
        openTheHint(data.msg);
        history.push('/login');
    };

    const failedRegister = (e: Error): void => {
        openTheHint(e.message);
    };

    function isCorrectTextLength(text: string): boolean {
        const len = text.length;

        if (len > MAX_LEN) return false;
        if (len < MIN_LEN) return false;

        return true;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (user.length < MIN_LEN) {
            openTheHint('user name is too short!');
            return;
        }

        if (user.length > MAX_LEN) {
            openTheHint('user name is too long!');
            return;
        }

        if (password.length < MIN_LEN) {
            openTheHint('password is too short!');
            return;
        }

        if (password.length > MAX_LEN) {
            openTheHint('password is too long!');
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
                        id="name"
                        error={!isCorrectTextLength(user)}
                        label="user"
                        onChange={(e): void => setUser(e.target.value)}
                        helperText={'(' + MIN_LEN + ' - ' + MAX_LEN + ') characters'}
                    />
                    <TextField
                        autoComplete="on"
                        error={!isCorrectTextLength(password)}
                        id="pswd"
                        label="password"
                        type="password"
                        onChange={(e): void => setPassword(e.target.value)}
                        helperText={'(' + MIN_LEN + ' - ' + MAX_LEN + ') characters'}
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
