import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail } from '../../common/interface';
import { getMailDetail, deleteMail, sendMail } from '../../common/service';
// 删除以下导入
// import { IconButton } from '@material-ui/core';
// 确保使用 @mui/material 中的 IconButton
import { IconButton } from '@mui/material';
// 移除未使用的导入
// import * as Mui from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';
import { wrapFunc1, wrapName } from '../../common/common';
import { getMailUrl, getUserDetailUrl } from '../../common/routeName';
import { openHint } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            width: '100%',
            textIndent: 30,
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20,
        },
        from: {
            fontSize: 20,
        },
        reply: {
            width: '100%',
        },
        avatar: {
            borderRadius: '50%',
            // display: 'block',
            // marginLeft: 'auto',
            // marginRight: 'auto',
            height: 120,
            width: 120,
        },
    }),
);

const MailDetailPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const [mail, setMail] = useState<Mail>(null);
    const [content, setContent] = useState('');

    const classes = useStyles({});

    const intId = parseInt(id);
    const history = useHistory();

    useEffect(() => {
        getMailDetail(
            intId,
            (m): void => {
                setMail({ ...m, date: new Date(m.date) });
            },
            console.log,
        );
    }, [intId]);

    const deleteClick = (): void => {
        deleteMail(
            intId,
            o => {
                openHint(dispatch, o.msg);
                history.push(getMailUrl());
            },
            console.log,
        );
    };

    const fromNameClick = (fromId: number): void => {
        history.push(getUserDetailUrl(fromId));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendMail(
            mail.fromId,
            content,
            o => {
                openHint(dispatch, o.msg);
            },
            console.log,
        );
    };

    return (
        <div>
            {mail != null ? (
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <BackButton></BackButton>
                            <IconButton
                                onClick={(): void => {
                                    deleteClick();
                                }}
                            >
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </Grid>

                        <Grid item xs={12}>
                            <UserHead
                                avatar={mail.fromAvatar}
                                userName={wrapName(mail.fromId, mail.fromName)}
                                avatarClick={wrapFunc1(fromNameClick, mail.fromId)}
                                nameClick={wrapFunc1(fromNameClick, mail.fromId)}
                                center={false}
                            ></UserHead>
                            <div className={classes.content}>{mail.content}</div>
                            <div className={classes.content}>{mail.date.toString()}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <TextField
                                    className={classes.content}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    onChange={(e): void => {
                                        setContent(e.target.value);
                                    }}
                                />
                                <Button type="submit" variant="contained" color="primary" className={classes.reply}>
                                    reply
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );

};

export default MailDetailPage;