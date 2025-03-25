import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { postRegister } from '../../common/service';
// 修改前
// import { useHistory, Link } from 'react-router-dom';
// 修改后
import { useNavigate, Link } from 'react-router-dom';
import { RetMsgObj } from '../../common/interface';
import { validate } from 'email-validator';
import {
    isValidPassowrd,
    isValidUserName,
    getPassowrdHelpText,
    getUsernameHelpText,
    isValidEmail,
    getEmailHelpText,
} from '../../common/common';
import { getLoginUrl } from '../../common/routeName';
import { useDispatch } from 'react-redux';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { openHint } from 'reducer/system/functions';
import { Theme } from '@mui/material/styles'; // 新增导入语句
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: 250,
            alignItems: 'center',
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

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const MAX_EMAIL_LEN = 30;

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();
    const classes = useStyles({});

    const resolveData = (data: RetMsgObj): void => {
        openHint(dispatch, data.msg);
        // 修改前
        // history.push(getLoginUrl());
        // 修改后
        navigate(getLoginUrl());
    };

    function isCorrectEmail(email: string): boolean {
        if (email.length > MAX_EMAIL_LEN) return false;

        return validate(email);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!isValidUserName(user)) {
            openHint(dispatch, 'invalid user name!');
            return;
        }

        if (!isValidPassowrd(password)) {
            openHint(dispatch, 'invalid password!');
            return;
        }

        if (!isCorrectEmail(email)) {
            openHint(dispatch, 'please check your email!');
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
                        error={!isValidEmail(email)}
                        id="email"
                        label="email"
                        type="email"
                        onChange={(e): void => setEmail(e.target.value)}
                        helperText={getEmailHelpText()}
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
