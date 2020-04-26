import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { postLogin, getMe } from '../service';
import { setToken, setMeId, openHint } from '../globals';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { setLoginFlag, setMeAvatar } from '../globals';
import { useDispatch } from 'reactn';

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
    }),
);

export const LoginComponent: React.FC = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const openTheHint = useDispatch(openHint);

    const history = useHistory();

    const classes = useStyles({});

    const loadAvatarAndId = (): void => {
        getMe(
            info => {
                setMeAvatar(info.avatarUrl);
                setMeId(info.id);
            },
            e => {},
        );
    };

    const resolveData = (data: any): void => {
        if ('error' in data) {
            console.log('error : ' + data.error);
        } else if ('accessToken' in data) {
            setToken(data.accessToken);

            getMe(console.log, console.log);

            setLoginFlag(true);

            loadAvatarAndId();

            history.push('/main/lobby');
        }
    };

    const loginFailed = (e: any): void => {
        const err = e as Error;
        openTheHint(err.message);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        postLogin(username, password, resolveData, loginFailed);
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
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
                    <Button component={Link} to="/register" type="submit" variant="contained" color="primary">
                        go register page
                    </Button>
                </form>
            </div>
        </Container>
    );
};
