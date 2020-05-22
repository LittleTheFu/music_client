import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail } from '../../common/interface';
import { getMailDetail, deleteMail, sendMail } from '../../common/service';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
// import { openHint } from '../../globals';
import { useDispatch } from 'reactn';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';

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

export const MailDetailPage: React.FC = () => {
    const { id } = useParams();
    const openTheHint = useDispatch('openHint');

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
                openTheHint(o.msg);
                history.push(`/main/mail/`);
            },
            console.log,
        );
    };

    const fromNameClick = (fromId: number): void => {
        history.push(`/main/userdetail/` + fromId);
    };

    const avatarClickWrapper = (id: number) => {
        return (): void => {
            fromNameClick(id);
        };
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendMail(
            mail.fromId,
            content,
            o => {
                openTheHint(o.msg);
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
                                userName={mail.fromName}
                                avatarClick={avatarClickWrapper(mail.fromId)}
                                nameClick={avatarClickWrapper(mail.fromId)}
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
