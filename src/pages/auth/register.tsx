import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../../common/service';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'reactn';
import { RetMsgObj } from '../../common/interface';
import { validate } from 'email-validator';
import { isValidPassowrd, isValidUserName, getPassowrdHelpText, getUsernameHelpText } from '../../common/common';

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
    const [email, setEmail] = useState('');
    const openTheHint = useDispatch('openHint');

    const MIN_LEN = 4;
    const MAX_LEN = 6;

    const MAX_EMAIL_LEN = 30;

    const history = useHistory();
    const classes = useStyles({});

    const resolveData = (data: RetMsgObj): void => {
        openTheHint(data.msg);
        history.push('/login');
    };

    // const failedRegister = (e: Error): void => {
    //     openTheHint(e.message);
    // };

    function isCorrectTextLength(text: string): boolean {
        const len = text.length;

        if (len > MAX_LEN) return false;
        if (len < MIN_LEN) return false;

        return true;
    }

    function isCorrectEmail(email: string): boolean {
        if (email.length > MAX_EMAIL_LEN) return false;

        return validate(email);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!isValidUserName(user)) {
            openTheHint('invalid user name!');
            return;
        }

        if (!isValidPassowrd(password)) {
            openTheHint('invalid password!');
            return;
        }

        if (!isCorrectEmail(email)) {
            openTheHint('please check your email!');
            return;
        }

        postRegister(user, password, email, resolveData);
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="name"
                        error={!isValidUserName(user)}
                        label="user"
                        onChange={(e): void => setUser(e.target.value)}
                        helperText={getUsernameHelpText()}
                    />
                    <TextField
                        autoComplete="on"
                        error={!isValidPassowrd(password)}
                        id="pswd"
                        label="password"
                        type="password"
                        onChange={(e): void => setPassword(e.target.value)}
                        helperText={getPassowrdHelpText()}
                    />
                    <TextField
                        autoComplete="on"
                        error={!isCorrectEmail(email)}
                        id="email"
                        label="email"
                        type="email"
                        onChange={(e): void => setEmail(e.target.value)}
                        helperText={'at most ' + MAX_EMAIL_LEN + 'characters'}
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
