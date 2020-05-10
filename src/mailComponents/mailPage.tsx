import React, { useEffect, useState } from 'react';
import { getUserMails, deleteMail } from '../service';
import { Mail } from '../dataInterfaces/interface';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';
import { DeleteButton } from '../otherComponents/deleteButton';

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const openTheHint = useDispatch(openHint);

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
                <DeleteButton
                    clickDelete={(): void => {
                        deleteMail(
                            m.id,
                            o => {
                                openTheHint(o.msg);
                                setMails(
                                    mails.filter(mail => {
                                        return mail.id !== m.id;
                                    }),
                                );
                            },
                            console.log,
                        );
                    }}
                ></DeleteButton>
                message from {m.fromName} : {m.content}
            </ListItem>
        );
    });

    return (
        <List component="nav">
            {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
        </List>
    );
};
