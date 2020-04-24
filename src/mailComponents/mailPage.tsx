import React, { useEffect, useState } from 'react';
import { getUserMails, deleteMail } from '../service';
import { Mail } from '../dataInterfaces/music';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);

    const history = useHistory();

    useEffect(() => {
        getUserMails(m => {
            setMails(m);
        }, console.log);
    }, []);

    const mailClick = (id: number): void => {
        history.push(`/main/mail_detail/` + id);
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
                from {m.fromName} : {m.content}
                <IconButton
                    onClick={(e): void => {
                        e.stopPropagation();

                        deleteMail(
                            m.id,
                            mails => {
                                setMails(mails);
                            },
                            console.log,
                        );
                    }}
                >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </ListItem>
        );
    });

    return (
        <List component="nav">
            {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
        </List>
    );
};
