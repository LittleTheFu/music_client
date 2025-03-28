import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles'; // 从 @mui/material/styles 导入 Theme
import { postLogin, getMe } from '../../common/service';
import { setToken, setMeId, setMeName } from '../../helpers';
// 修改前
// import { useHistory, Link } from 'react-router-dom';
// 修改后
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { setLoginFlag, setMeAvatar } from '../../helpers';
import { AccessData } from '../../common/interface';
import { emitLoginSocketMsg } from '../../common/socket';
import { getLobbyUrl } from '../../common/routeName';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { updateUnreadMailCount } from 'reducer/system/functions';

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
    })
);

export const LoginComponent: React.FC = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

    const classes = useStyles({});

    const loadAvatarAndId = (): void => {
        getMe(
            (info) => {
                setMeAvatar(info.avatarUrl);
                setMeName(info.name);
                setMeId(info.id);
                updateUnreadMailCount(dispatch, info.unreadMailNum);
                // setMeUnreadMailNum(info.unreadMailNum);
                emitLoginSocketMsg(info.id);
            },
            (e) => {
                console.log(e);
            }
        );
    };

    const resolveData = (data: AccessData): void => {
        // if ('error' in data) {
        //     console.log('error : ' + data.error);
        // } else if ('accessToken' in data) {
        setToken(data.accessToken);

        setLoginFlag(true);
        loadAvatarAndId();

        // 修改前
        // history.push(getLobbyUrl());
        // 修改后
        navigate(getLobbyUrl());
        // }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        postLogin(username, password, resolveData);
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField id="name" label="user" onChange={(e): void => setUser(e.target.value)} />
                    <TextField
                        autoComplete="on"
                        id="pswd"
                        label="password"
                        type="password"
                        onChange={(e): void => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        login
                    </Button>
                    <Button component={Link} to="/register" type="submit" variant="contained" color="primary">
                        go register page
                    </Button>
                    <Button component={Link} to="/forget_password" type="submit" variant="contained" color="secondary">
                        I forgot password
                    </Button>
                </form>
            </div>
        </Container>
    );
};
