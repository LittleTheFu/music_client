import React, { useEffect, useState, useCallback } from 'react';
import { getUserMails, deleteMail } from '../../common/service';
import { Mail } from '../../common/interface';
import { useNavigate } from 'react-router-dom';
import { ContentCard } from '../../sharedComponents/basicComponents/contentCard';
import { wrapFunc1, wrapName } from '../../common/common';
import { useIsMount } from '../../common/isMount';
// 移除未使用的导入
// import { Alert } from '@mui/material';

// 添加缺失的导入
import { List, ListItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getMailDetailUrl } from '../../common/routeName';
import { useDispatch, useSelector } from 'react-redux';
import { openHint, decreaseUnreadMailCount } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { selectMailRefresher } from 'reducer/rootReducer';

const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
const isMount = useIsMount();

// 将组件定义和导出移到顶层
export const MailPage: React.FC = () => {
    const [mails, setMails] = useState<Mail[]>([]);
    const refreshMailPage = useSelector(selectMailRefresher);
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

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
        // 修改跳转方式
        // history.push(getMailDetailUrl(id));
        navigate(getMailDetailUrl(id));
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
