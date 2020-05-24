import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { editPassword } from '../../common/service';
import { RetMsgObj } from '../../common/interface';
import { useDispatch } from 'reactn';
import { isValidPassowrd, getPassowrdHelpText } from '../../common/common';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            paddingTop: 50,
        },
        text: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 200,
            paddingBottom: 30,
        },
        btnRoot: {
            // width: 200,
            // display: 'block',
            // marginLeft: 'auto',
            // marginRight: 'auto',
        },
        btn: {
            // width: 200,
            display: 'block',

            marginLeft: 'auto',
            marginRight: 'auto',
            width: 200,
        },
    }),
);

export const ChangePasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const openTheHint = useDispatch('openHint');

    const classes = useStyles({});

    const resolve = (r: RetMsgObj): void => {
        openTheHint(r.msg);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!isValidPassowrd(password)) {
            openTheHint('invalid length!');
            return;
        }

        editPassword(password, resolve);
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    error={!isValidPassowrd(password)}
                    helperText={getPassowrdHelpText()}
                    className={classes.text}
                    autoComplete="on"
                    id="pswd"
                    label="password"
                    type="password"
                    onChange={(e): void => setPassword(e.target.value)}
                />

                <Button type="submit" variant="contained" color="primary" className={classes.btn}>
                    Submit
                </Button>
            </form>
        </div>
    );
};
