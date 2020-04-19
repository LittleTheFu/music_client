import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { postLogin, fetchPlayListMusicList, getMusicCollections, getUserAvatar, getMe } from '../service';
import { setToken, updatePlayListMusics, updateMusics, updateCollections, updateAvatar } from '../globals';
import { useGlobal, useDispatch } from 'reactn';
import { Music, MusicCollection } from '../dataInterfaces/music';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: 200,
        },
        paper: {
            width: 230,
            height: 260,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLogin, setIsLogin] = useGlobal('isLogin');
    const [loginModalOpen, setLoginModalOpen] = useGlobal('loginModalOpen');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userId, setUserId] = useGlobal('userId');
    const [meId, setMeId] = useGlobal('meId');
    const [musicCollections, setMusicCollections] = useGlobal('Collections');
    const updateUserAddedMusics = useDispatch(updatePlayListMusics);
    const updateTheMusics = useDispatch(updateMusics);
    const updateTheCollections = useDispatch(updateCollections);
    const updateTheAvatar = useDispatch(updateAvatar);

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const classes = useStyles({});

    const loadAvatarAndId = (): void => {
        console.log('BEGIN LOAD AVATAR AND ID');
        getMe(
            info => {
                updateTheAvatar(info.avatarUrl);
                setMeId(info.id);
                setUserId(info.name);
            },
            e => {
                console.log('ERRRRRRR');
                console.log(e);
            },
        );
    };

    // const loadMusic = (): void => {
    //     fetchPlayListMusicList(
    //         musicList => {
    //             updateUserAddedMusics(musicList as Music[]);
    //             updateTheMusics(musicList as Music[]);
    //             console.log(musicList);
    //         },
    //         e => console.log(e),
    //     );
    // };

    // const loadCollections = (): void => {
    //     getMusicCollections(
    //         collections => {
    //             console.log(collections);
    //             updateTheCollections(collections as MusicCollection[]);
    //         },
    //         e => console.log(e),
    //     );
    //     console.log('load collections');
    // };

    const resolveData = (data: any): void => {
        console.log('POST LOGIN');
        console.log(data);
        if ('error' in data) {
            console.log('error : ' + data.error);
        } else if ('accessToken' in data) {
            setToken(data.accessToken);
            setUserId(username);

            console.log('accessToken : ' + data.accessToken);

            getMe(console.log, console.log);

            setIsLogin(true);
            setLoginModalOpen(false);

            loadAvatarAndId();

            // loadMusic();
            // loadCollections();

            history.push('/main/lobby');
        }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('username: ', username, 'password: ', password);
        console.log('submit');
        postLogin(username, password, resolveData);
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
