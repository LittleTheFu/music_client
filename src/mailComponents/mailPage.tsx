import React, { useEffect, useState } from 'react';
import { getUserMails } from '../service';
import { Mail } from '../dataInterfaces/music';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);

    useEffect(() => {
        getUserMails(m => {
            setMails(m);
            console.log(m);
        }, console.log);
    }, []);

    const mailElements = mails.map((m: Mail, index: number) => {
        return (
            <ListItem button key={index}>
                {m.fromName}--{m.toName}--{m.content}
            </ListItem>
        );
    });

    return (
        <List component="nav">
            {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
        </List>
    );
};
