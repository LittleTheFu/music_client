import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { resetPassword } from '../../common/service';
import { RetMsgObj } from '../../common/interface';
// 修改前
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// 修改后
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
// 新增导入 createStyles
import { createStyles } from '@mui/styles';

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
