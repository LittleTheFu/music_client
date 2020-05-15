import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useGlobal } from 'reactn';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getMeId, setLoginFlag, getMeAvatar, getMeName } from '../globals';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { NavListIconButton } from '../otherComponents/NavListIconButton';
import AlbumIcon from '@material-ui/icons/Album';
import PeopleIcon from '@material-ui/icons/People';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() =>
    createStyles({
        avatar: {
            borderRadius: '50%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 80,
            width: 80,
        },
        name: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
    }),
);

export const TemporaryDrawer: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');

    const classes = useStyles({});
    const history = useHistory();

    const logoutClick = (): void => {
        setLoginFlag(false);
        history.push('/login');
    };

    const peopleClick = (): void => {
        history.push(`/main/all_users`);
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

    const projectClick = (): void => {
        history.push(`/main/source_code`);
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
                    <img onClick={meClick} src={getMeAvatar()} alt="avatar " className={classes.avatar} />
                    <div className={classes.name}>{getMeName()}</div>
                    <Divider></Divider>
                    <NavListIconButton msg={'music'} iconClick={musicClick}>
                        <MusicNoteIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'mail'} iconClick={mailClick}>
                        <MailIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'collections'} iconClick={collectionsClick}>
                        <AlbumIcon />
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

                    <NavListIconButton msg={'community'} iconClick={peopleClick}>
                        <PeopleIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'source code'} iconClick={projectClick}>
                        <GitHubIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'logout'} iconClick={logoutClick}>
                        <ExitToAppIcon />
                    </NavListIconButton>
                </List>
            </Drawer>
        </div>
    );
};
