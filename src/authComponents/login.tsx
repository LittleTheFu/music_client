import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { postLogin, fetchPlayListMusicList, getMusicCollections } from '../service';
import { setToken, updatePlayListMusics, updateMusics } from '../globals';
import { useGlobal, useDispatch } from 'reactn';
import { Music, MusicCollection } from '../dataInterfaces/music';
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

export const LoginComponent: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLogin, setIsLogin] = useGlobal('isLogin');
    const [loginModalOpen, setLoginModalOpen] = useGlobal('loginModalOpen');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userId, setUserId] = useGlobal('userId');
    const [musicCollections, setMusicCollections] = useGlobal('Collections');
    const updateUserAddedMusics = useDispatch(updatePlayListMusics);
    const updateTheMusics = useDispatch(updateMusics);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const classes = useStyles({});

    const loadMusic = (): void => {
        fetchPlayListMusicList(
            musicList => {
                updateUserAddedMusics(musicList as Music[]);
                updateTheMusics(musicList as Music[]);
                console.log(musicList);
            },
            e => console.log(e),
        );
    };

    const loadCollections = (): void => {
        getMusicCollections(
            collections => {
                console.log(collections);
                setMusicCollections(collections as MusicCollection[]);
            },
            e => console.log(e),
        );
        console.log('load collections');
    };

    const resolveData = (data: any): void => {
        if ('error' in data) {
            console.log('error : ' + data.error);
        } else if ('accessToken' in data) {
            setToken(data.accessToken);
            setUserId(user);
            console.log('accessToken : ' + data.accessToken);
            setIsLogin(true);
            setLoginModalOpen(false);

            loadMusic();
            loadCollections();

            history.push('/users');
        }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('username: ', user, 'password: ', password);
        console.log('submit');
        postLogin(user, password, resolveData);
        // You should see email and password in console.
        // ..code to submit form to backend here...
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="user" onChange={(e): void => setUser(e.target.value)} />
                <TextField id="standard-basic" label="password" onChange={(e): void => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    login
                </Button>
            </form>
        </div>
    );
};
