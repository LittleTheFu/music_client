import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postRegister } from '../service';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

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
