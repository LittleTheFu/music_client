import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { isValidUserName, getUsernameHelpText, isValidEmail, getEmailHelpText } from '../../common/common';
import { postForgetPassword } from '../../common/service';
import { RetMsgObj } from '../../common/interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: 250,
            alignItems: 'center',
        },
        paper: {
            width: 230,
            verticalAlign: 'middle',
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
        msg: {
            textAlign: 'center',
        },
    }),
);

export const ForgetPasswordPage: React.FC = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('input your name and email');

    const classes = useStyles({});

    const resolve = (r: RetMsgObj): void => {
        // history.push('/main/lobby');
        setMessage(r.msg);
    };

    const reject = (e: Error): void => {
        setMessage(e.message);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        postForgetPassword(user, email, resolve, reject);
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
            <h1 className={classes.msg}>{message}</h1>
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        error={!isValidUserName(user)}
                        id="name"
                        label="user"
                        onChange={(e): void => setUser(e.target.value)}
                        helperText={getUsernameHelpText()}
                    />
                    <TextField
                        error={!isValidEmail(email)}
                        autoComplete="on"
                        id="email"
                        label="email"
                        type="email"
                        onChange={(e): void => setEmail(e.target.value)}
                        helperText={getEmailHelpText()}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        submit
                    </Button>
                    <Button component={Link} to="/login" type="submit" variant="contained" color="primary">
                        go to login page
                    </Button>
                </form>
            </div>
        </Container>
    );
};
