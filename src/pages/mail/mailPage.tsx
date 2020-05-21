import React, { useEffect, useState } from 'react';
import { getUserMails, deleteMail } from '../../common/service';
import { Mail } from '../../common/interface';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { openHint, decUnreadMailCnt } from '../../globals';
import { useDispatch, useGlobal } from 'reactn';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ContentCard } from '../../sharedComponents/basicComponents/contentCard';
import { wrapFunc1 } from '../../common/common';
import { useIsMount } from '../../common/isMount';
import MuiAlert from '@material-ui/lab/Alert';

// const useStyles = makeStyles(() =>
//     createStyles({
//     }),
// );

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const openTheHint = useDispatch(openHint);
    const _decUnreadMailCnt = useDispatch(decUnreadMailCnt);
    const [refreshMailPage] = useGlobal('refreshMailPage');
    const [showAlert, setShowAlert] = useState(false);
    // const classes = useStyles({});
    const isMount = useIsMount();

    const history = useHistory();

    const getFixedMail = (m: Mail): Mail => {
        let r = new Mail();
        r = { ...m, date: new Date(m.date) };
        return r;
    };

    const getFixedMails = (ms: Mail[]): Mail[] => {
        return ms.map(m => {
            return getFixedMail(m);
        });
    };

    useEffect(() => {
        getUserMails(fetchedMails => {
            setMails(getFixedMails(fetchedMails));
        }, console.log);
    }, []);

    useEffect(() => {
        if (isMount) {
            console.log('First Render');
        } else {
            setShowAlert(true);
            console.log('Subsequent Render');
        }
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

    const alertClick = (): void => {
        setShowAlert(false);

        getUserMails(fetchedMails => {
            setMails(getFixedMails(fetchedMails));
        }, console.log);
    };

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

    const mailElements = mails.map((m: Mail, index: number) => {
        return (
            <ListItem divider button key={index}>
                <ContentCard
                    cardClick={mailClickWrapper(m.id)}
                    deleteClick={wrapFunc1(deleteCLick, m)}
                    avatar={m.fromAvatar}
                    content={m.content}
                    canBeDeleted={true}
                    username={m.fromName}
                    date={m.date}
                    boldText={!m.read}
                ></ContentCard>
            </ListItem>
        );
    });

    return (
        <div>
            {showAlert ? (
                <MuiAlert severity="info" elevation={6} variant="filled" onClick={alertClick}>
                    here comes new mails, click me to refresh.
                </MuiAlert>
            ) : (
                <div></div>
            )}

            <List component="nav">
                {mails && mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
            </List>
        </div>
    );
};
