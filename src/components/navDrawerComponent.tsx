import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useGlobal } from 'reactn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getMeId, setLoginFlag } from '../globals';
import AlbumIcon from '@material-ui/icons/Album';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

export const TemporaryDrawer: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');

    const history = useHistory();
    const { path, url } = useRouteMatch();
    // const [userId, setUserId] = useGlobal('userId');

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
                        }}
                    >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={'mail'} />
                    </ListItem>

                    <ListItem
                        button
                        key={8}
                        onClick={(): void => {
                            history.push(`${url}/collections`);
                        }}
                    >
                        <ListItemIcon>
                            <AlbumIcon />
                        </ListItemIcon>
                        <ListItemText primary={'collections'} />
                    </ListItem>

                    <ListItem
                        button
                        key={12}
                        onClick={(): void => {
                            history.push(`${url}/search`);
                        }}
                    >
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={'search'} />
                    </ListItem>

                    <ListItem
                        button
                        key={3}
                        onClick={(): void => {
                            history.push(`${url}/profile`);
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary={'edit'} />
                    </ListItem>

                    <ListItem
                        button
                        key={5}
                        onClick={(): void => {
                            history.push(`/main/userdetail/` + getMeId());
                        }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'me'} />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={(): void => {
                            setLoginFlag(false);
                            // setUserId('guest');

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
