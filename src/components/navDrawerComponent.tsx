import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useGlobal } from 'reactn';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// const useStyles = makeStyles({
//     list: {
//         width: 250,
//     },
//     fullList: {
//         width: 'auto',
//     },
// });

// interface DrawerProps {
//     drawerOpen: boolean;
//     closeDrawer: () => void;
// }

export const TemporaryDrawer: React.FC = () => {
    // const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');
    const [currentClickUserId, setCurrentClickUserId] = useGlobal('currentClickUserId');
    const [meId] = useGlobal('meId');

    const history = useHistory();
    const { path, url } = useRouteMatch();
    const [isLogin, setIsLogin] = useGlobal('isLogin');
    const [userId, setUserId] = useGlobal('userId');

    return (
        <div>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={(): void => {
                    setDrawerOpen(false);
                }}
            >
                <List>
                    <ListItem
                        button
                        key={1}
                        onClick={(): void => {
                            history.push(`${url}/lobby`);
                        }}
                    >
                        <ListItemIcon>
                            <MusicNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary={'music'} />
                    </ListItem>
                    <ListItem
                        button
                        key={2}
                        onClick={(): void => {
                            history.push(`${url}/mail`);
                            console.log('MAIL CLICK');
                        }}
                    >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={'mail'} />
                    </ListItem>
                    <ListItem
                        button
                        key={3}
                        onClick={(): void => {
                            history.push(`${url}/profile`);
                            console.log('AVATAR CLICK');
                        }}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={'edit'} />
                    </ListItem>

                    <ListItem
                        button
                        key={5}
                        onClick={(): void => {
                            setCurrentClickUserId(meId).then(() => {
                                history.push(`${url}/userdetail`);
                            });
                        }}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={'me'} />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={(): void => {
                            setIsLogin(false);
                            setUserId('guest');

                            history.push('/login');
                        }}
                    >
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={'logout'} />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};
