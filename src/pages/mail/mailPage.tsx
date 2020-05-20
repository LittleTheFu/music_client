import React, { useEffect, useState } from 'react';
import { getUserMails, deleteMail } from '../../common/service';
import { Mail } from '../../common/interface';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { openHint, decUnreadMailCnt } from '../../globals';
import { useDispatch, useGlobal } from 'reactn';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ContentCard } from '../../sharedComponents/musicsComponent/contentCard';

// const useStyles = makeStyles(() =>
//     createStyles({
//         mailIcon: {
//             paddingLeft: 8,
//             paddingRight: 8,
//         },
//         boldText: {
//             fontWeight: 'bold',
//         },
//         normalText: {
//             fontWeight: 'normal',
//         },
//         fromName: {
//             color: 'blue',
//         },
//     }),
// );

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const openTheHint = useDispatch(openHint);
    const _decUnreadMailCnt = useDispatch(decUnreadMailCnt);
    const [refreshMailPage] = useGlobal('refreshMailPage');
    // const classes = useStyles({});

    const history = useHistory();

    const getFixedMail = (m: Mail): Mail => {
        let r = new Mail();
        r = { ...m, date: new Date(m.date) };
        return r;
    };

    useEffect(() => {
        getUserMails(fetchedMails => {
            const fixedMails = fetchedMails.map(m => {
                return getFixedMail(m);
            });
            setMails(fixedMails);

            console.log(fetchedMails);
        }, console.log);
    }, [refreshMailPage]);

    const mailClick = (id: number): void => {
        const m = mails.find(mail => {
            return mail.id === id;
        });
        console.log('mail click');
        console.log(mails);
        console.log(m);
        console.log(id);
        if (m.read === false) {
            _decUnreadMailCnt();
        }

        history.push(`/main/mail_detail/` + id);
    };

    const mailClickWrapper = (id: number) => {
        return (): void => {
            mailClick(id);
        };
    };

    // const getShortContentStr = (content: string): string => {
    //     const MAX_LEN = 10;
    //     const len = content.length;

    //     if (len <= MAX_LEN) {
    //         return content;
    //     }

    //     return content.substr(0, MAX_LEN) + '...';
    // };

    const deleteCLick = (mail: Mail): void => {
        deleteMail(
            mail.id,
            o => {
                openTheHint(o.msg);
                setMails(
                    mails.filter(m => {
                        return m.id !== mail.id;
                    }),
                );
                if (mail.read === false) {
                    _decUnreadMailCnt();
                }
            },
            console.log,
        );
    };

    const deleteClickWrapper = (mail: Mail) => {
        return (id: number): void => {
            deleteCLick(mail);
        };
    };

    const mailElements = mails.map((m: Mail, index: number) => {
        return (
            <ListItem divider button key={index}>
                <ContentCard
                    cardClick={mailClickWrapper(m.id)}
                    deleteClick={deleteClickWrapper(m)}
                    id={m.id}
                    avatar={m.fromAvatar}
                    content={m.content}
                    canBeDeleted={true}
                    userId={m.fromId}
                    username={m.fromName}
                    date={m.date}
                    boldText={!m.read}
                ></ContentCard>
            </ListItem>
        );
    });

    return (
        <List component="nav">
            {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
        </List>
    );
};
