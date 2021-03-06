import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../common/service';
import { RetMsgObj } from '../../common/interface';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        msg: {
            textAlign: 'center',
        },
        btn: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 200,
        },
        btnMsg: {
            textAlign: 'center',
        },
    }),
);

export const ResetPasswordPage: React.FC = () => {
    const [message, setMessage] = useState('');
    const { id } = useParams();

    const classes = useStyles({});

    const resolve = (r: RetMsgObj): void => {
        setMessage(r.msg);
    };

    const reject = (e: Error): void => {
        setMessage(e.message);
    };

    useEffect(() => {
        resetPassword(id, resolve, reject);
    }, [id]);

    return (
        <div>
            <h1 className={classes.msg}>{message}</h1>
            <Button
                component={Link}
                to="/login"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}
            >
                <div className={classes.btnMsg}>go to login page</div>
            </Button>
        </div>
    );
};
