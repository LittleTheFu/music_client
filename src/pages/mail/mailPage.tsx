import React, { useEffect, useState } from 'react';
import { getUserMails, deleteMail } from '../../common/service';
import { Mail } from '../../common/interface';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { openHint, decUnreadMailCnt } from '../../globals';
import { useDispatch, useGlobal } from 'reactn';
import { DeleteButton } from '../../sharedComponents/basicComponents/deleteButton';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        mailIcon: {
            paddingLeft: 8,
            paddingRight: 8,
        },
        boldText: {
            fontWeight: 'bold',
        },
        normalText: {
            fontWeight: 'normal',
        },
        fromName: {
            color: 'blue',
        },
    }),
);

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const openTheHint = useDispatch(openHint);
    const _decUnreadMailCnt = useDispatch(decUnreadMailCnt);
    const [refreshMailPage] = useGlobal('refreshMailPage');
    const classes = useStyles({});

    const history = useHistory();

    useEffect(() => {
        getUserMails(m => {
            setMails(m);
        }, console.log);
    }, [refreshMailPage]);

    const mailClick = (id: number): void => {
        const m = mails.find(mail => {
            return mail.id === id;
        });
        if (m.read === false) {
            _decUnreadMailCnt();
        }

        history.push(`/main/mail_detail/` + id);
    };

    const getShortContentStr = (content: string): string => {
        const MAX_LEN = 10;
        const len = content.length;

        if (len <= MAX_LEN) {
            return content;
        }

        return content.substr(0, MAX_LEN) + '...';
    };

    const mailElements = mails.map((m: Mail, index: number) => {
        return (
            <ListItem
                divider
                button
                key={index}
                onClick={(): void => {
                    mailClick(m.id);
                }}
            >
                <MailOutlineIcon className={classes.mailIcon}></MailOutlineIcon>
                <span className={m.read ? classes.normalText : classes.boldText}>
                    message from <span className={classes.fromName}>{m.fromName}</span> :{' '}
                    {getShortContentStr(m.content)}
                </span>
                <DeleteButton
                    clickDelete={(e): void => {
                        e.stopPropagation();
                        deleteMail(
                            m.id,
                            o => {
                                openTheHint(o.msg);
                                setMails(
                                    mails.filter(mail => {
                                        return mail.id !== m.id;
                                    }),
                                );
                                if (m.read === false) {
                                    _decUnreadMailCnt();
                                }
                            },
                            console.log,
                        );
                    }}
                ></DeleteButton>
            </ListItem>
        );
    });

    return (
        <List component="nav">
            {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
        </List>
    );
};
