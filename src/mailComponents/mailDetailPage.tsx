import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail } from '../dataInterfaces/music';
import { getMailDetail, deleteMail, sendMail } from '../service';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BackButton } from '../otherComponents/backButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            width: '100%',
        },
        reply: {
            width: '100%',
        },
    }),
);

export const MailDetailPage: React.FC = () => {
    const { id } = useParams();
    const [mail, setMail] = useState<Mail>(null);
    const [content, setContent] = useState('');

    const classes = useStyles({});

    const intId = parseInt(id);
    const history = useHistory();

    useEffect(() => {
        getMailDetail(
            intId,
            (m): void => {
                setMail(m);
            },
            console.log,
        );
    }, []);

    const deleteClick = (): void => {
        deleteMail(
            intId,
            mails => {
                console.log(mails);
                history.push(`/main/mail/`);
                // console.log(mails);
            },
            console.log,
        );
    };

    const backClick = (): void => {
        // history.push(`/main/mail/`);
        history.goBack();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendMail(mail.fromId, content, console.log, console.log);
    };

    return (
        <div>
            {mail != null ? (
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <IconButton
                                onClick={(): void => {
                                    deleteClick();
                                }}
                            >
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                            <BackButton></BackButton>
                        </Grid>

                        <Grid item xs={12}>
                            <h1>{mail.toName} : </h1>
                            <h1>{mail.content}</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <TextField
                                    className={classes.content}
                                    id="outlined-multiline-static"
                                    label="content"
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
