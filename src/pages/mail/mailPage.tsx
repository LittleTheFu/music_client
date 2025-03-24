import React, { useEffect, useState, useCallback } from 'react';
import { getUserMails, deleteMail } from '../../common/service';
import { Mail } from '../../common/interface';
// 修改前
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Alert from '@material-ui/lab/Alert';
// 修改后
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/lab/Alert';

import { useHistory } from 'react-router-dom';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ContentCard } from '../../sharedComponents/basicComponents/contentCard';
import { wrapFunc1, wrapName } from '../../common/common';
import { useIsMount } from '../../common/isMount';
import MuiAlert from '@material-ui/lab/Alert';
import { getMailDetailUrl } from '../../common/routeName';
import { useDispatch, useSelector } from 'react-redux';
import { openHint, decreaseUnreadMailCount } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { selectMailRefresher } from 'reducer/rootReducer';

// const useStyles = makeStyles(() =>
//     createStyles({
//     }),
// );

export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const refreshMailPage = useSelector(selectMailRefresher);
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    // const classes = useStyles({});
    const isMount = useIsMount();

    const history = useHistory();

    const getFixedMail = (m: Mail): Mail => {
        let r = new Mail();
        r = { ...m, date: new Date(m.date) };
        return r;
    };

    const getFixedMails = useCallback((ms: Mail[]): Mail[] => {
        return ms.map(m => {
            return getFixedMail(m);
        });
    }, []);

    useEffect(() => {
        getUserMails(fetchedMails => {
            setMails(getFixedMails(fetchedMails));
        });
    }, [getFixedMails]);

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
        if (m.read === false) {
            decreaseUnreadMailCount(dispatch);
        }

        history.push(getMailDetailUrl(id));
    };

    const alertClick = (): void => {
        setShowAlert(false);

        getUserMails(fetchedMails => {
            setMails(getFixedMails(fetchedMails));
        });
    };

    const deleteCLick = (mail: Mail): void => {
        deleteMail(mail.id, o => {
            openHint(dispatch, o.msg);
            setMails(
                mails.filter(m => {
                    return m.id !== mail.id;
                }),
            );
            if (mail.read === false) {
                decreaseUnreadMailCount(dispatch);
            }
        });
    };

    const mailElements = mails.map((m: Mail, index: number) => {
        return (
            <ListItem divider button key={index}>
                <ContentCard
                    cardClick={wrapFunc1(mailClick, m.id)}
                    deleteClick={wrapFunc1(deleteCLick, m)}
                    avatar={m.fromAvatar}
                    content={m.content}
                    canBeDeleted={true}
                    username={wrapName(m.fromId, m.fromName)}
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
                    click me to get new mail.
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
