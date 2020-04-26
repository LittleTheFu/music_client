import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useGlobal } from 'reactn';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getMeId, setLoginFlag } from '../globals';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { NavListIconButton } from '../otherComponents/NavListIconButton';

export const TemporaryDrawer: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');

    const history = useHistory();

    const logoutClick = (): void => {
        setLoginFlag(false);
        history.push('/login');
    };

    const meClick = (): void => {
        history.push(`/main/userdetail/` + getMeId());
    };

    const editClick = (): void => {
        history.push(`/main/profile`);
    };

    const searchClick = (): void => {
        history.push(`/main/search`);
    };

    const collectionsClick = (): void => {
        history.push(`/main/collections`);
    };

    const mailClick = (): void => {
        history.push(`/main/mail`);
    };

    const musicClick = (): void => {
        history.push(`/main/lobby`);
    };

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
                    <NavListIconButton msg={'music'} iconClick={musicClick}>
                        <MusicNoteIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'mail'} iconClick={mailClick}>
                        <MailIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'collections'} iconClick={collectionsClick}>
                        <SearchIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'search'} iconClick={searchClick}>
                        <SearchIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'edit'} iconClick={editClick}>
                        <EditIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'me'} iconClick={meClick}>
                        <PersonIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'logout'} iconClick={logoutClick}>
                        <ExitToAppIcon />
                    </NavListIconButton>
                </List>
            </Drawer>
        </div>
    );
};
