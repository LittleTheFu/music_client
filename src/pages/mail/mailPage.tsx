// import React, { useEffect, useState, useCallback } from 'react';
// import { getUserMails, deleteMail } from '../../common/service';
// import { Mail, RetMsgObj } from '../../common/interface';
// import { useNavigate } from 'react-router-dom';
// import { ContentCard } from '../../sharedComponents/basicComponents/contentCard';
// import { wrapFunc1, wrapName } from '../../common/common';
// import { useIsMount } from '../../common/isMount';
// import { List, ListItem } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
// import { getMailDetailUrl } from '../../common/routeName';
// import { useDispatch, useSelector } from 'react-redux';
// import { openHint, decreaseUnreadMailCount } from 'reducer/system/functions';
// import { SystemActionTypes } from 'reducer/system/types';
// import { Dispatch } from 'redux';
// import { selectMailRefresher } from 'reducer/rootReducer';

// const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
// const isMount = useIsMount();

// const MailPage: React.FC = () => {
//     const dispatch = useDispatch(); // 正确：在函数组件主体内部调用钩子
//     const [mails, setMails] = useState<Mail[]>([]);
//     const refreshMailPage = useSelector(selectMailRefresher);
//     const [showAlert, setShowAlert] = useState(false);

//     const navigate = useNavigate();

//     const getFixedMail = (m: Mail): Mail => {
//         return { ...m, date: new Date(m.date) };
//     };

//     const getFixedMails = useCallback((ms: Mail[]): Mail[] => {
//         return ms.map(getFixedMail);
//     }, []);

//     const fetchMails = async () => {
//         try {
//             const fetchedMails = await new Promise<Mail[]>((resolve, reject) => {
//                 getUserMails(
//                     (data: Mail[]) => {
//                         resolve(data);
//                     },
//                     (error: object) => {
//                         reject(error);
//                     }
//                 );
//             });
//             setMails(getFixedMails(fetchedMails));
//         } catch (error) {
//             // 处理错误
//             console.error('Failed to fetch mails:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMails();
//     }, [getFixedMails]);

//     useEffect(() => {
//         if (isMount) {
//             console.log('First Render');
//         } else {
//             setShowAlert(true);
//             console.log('Subsequent Render');
//         }
//     }, [refreshMailPage]);

//     const mailClick = (id: number): void => {
//         const m = mails.find(mail => mail.id === id);
//         if (m && !m.read) {
//             decreaseUnreadMailCount(dispatch);
//         }
//         navigate(getMailDetailUrl(id));
//     };

//     const alertClick = (): void => {
//         setShowAlert(false);
//         fetchMails();
//     };

//     const deleteCLick = (mail: Mail): void => {
//         deleteMail(mail.id, (data: RetMsgObj) => {
//             if (data && data.error) { // 检查是否存在错误
//                 console.error('Failed to delete mail:', data.error);
//             } else {
//                 openHint(dispatch, data.msg);
//                 setMails(mails.filter(m => m.id !== mail.id));
//                 if (!mail.read) {
//                     decreaseUnreadMailCount(dispatch);
//                 }
//             }
//         });
//     };

//     const mailElements = mails.map((m: Mail) => {
//         return (
//             <ListItem divider button key={m.id}>
//                 <ContentCard
//                     cardClick={wrapFunc1(mailClick, m.id)}
//                     deleteClick={wrapFunc1(deleteCLick, m)}
//                     avatar={m.fromAvatar}
//                     content={m.content}
//                     canBeDeleted={true}
//                     username={wrapName(m.fromId, m.fromName)}
//                     date={m.date}
//                     boldText={!m.read}
//                 />
//             </ListItem>
//         );
//     });

//     return (
//         <div>
//             {showAlert ? (
//                 <MuiAlert severity="info" elevation={6} variant="filled" onClick={alertClick}>
//                     click me to get new mail.
//                 </MuiAlert>
//             ) : (
//                 <div></div>
//             )}
//             <List component="nav">
//                 {mails.length > 0 ? <React.Fragment>{mailElements}</React.Fragment> : <div></div>}
//             </List>
//         </div>
//     );
// };
