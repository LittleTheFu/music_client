import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { getDetail, sendMail, fetchMusicsByCollectionId } from 'service';
import { UserDetail, Music } from '../dataInterfaces/music';
import { followUser, unfollowUser } from '../service';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory, useParams } from 'react-router-dom';
import { WriteMailModal } from '../mailComponents/writeMailModal';
import { getMeId } from '../globals';
import { BackButton } from '../otherComponents/backButton';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useDispatch } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: 80,
            width: 80,
        },
        card: {
            width: 600,
        },
    }),
);

export const UserDetailPage: React.FC = () => {
    const [currentClickUserId] = useGlobal('currentClickUserId');
    // const [meId] = useGlobal('meId');
    const [detail, setDetail] = useState<UserDetail>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const history = useHistory();
    // const { path, url } = useRouteMatch();
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);

    const { id } = useParams();
    const intId = parseInt(id);

    const classes = useStyles({});

    useEffect(() => {
        getDetail(
            intId,
            o => {
                setDetail(o);
            },
            console.log,
        );
    }, []);

    const mailClick = (): void => {
        setMailModalOpen(true);
    };

    const sendMailClick = (content: string): void => {
        sendMail(
            intId,
            content,
            o => {
                setMailModalOpen(false);
            },
            console.log,
        );
    };

    const followerClick = (): void => {
        history.push(`/main/followers/` + id);
    };

    const followClick = (): void => {
        followUser(
            intId,
            (o): void => {
                setDetail({ ...detail, isFollowed: true });
            },
            console.log,
        );
    };

    const unfollowClick = (): void => {
        unfollowUser(
            currentClickUserId,
            (o): void => {
                setDetail({ ...detail, isFollowed: false });
            },
            console.log,
        );
    };

    const editClick = (): void => {
        history.push(`/main/profile`);
    };

    const clickCollectionCover = (name: string, id: number): void => {
        fetchMusicsByCollectionId(
            id,
            fetchedMusics => {
                const musics = fetchedMusics as Music[];
                if (musics && musics.length > 0) {
                    updatePlayingMusics(musics);
                    updateTheCurrentMusic(musics[0]);
                }
            },
            console.log,
        );
    };

    const bodyClick = (name: string, id: number): void => {
        history.push(`/main/collection_detail/` + id);
    };

    return (
        <div>
            <WriteMailModal
                sendClick={sendMailClick}
                modalOpen={mailModalOpen}
                modalClose={(): void => setMailModalOpen(false)}
            ></WriteMailModal>
            <BackButton></BackButton>
            {detail ? (
                <Grid container>
                    <Card className={classes.card}>
                        <Grid item xs={2}>
                            <img src={detail.avatarUrl} alt="avatar" className={classes.avatar} />
                        </Grid>
                        <Grid container item xs={10}>
                            <Grid item xs={12}>
                                {detail.name}
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton onClick={mailClick}>
                                    <MailOutlinedIcon />
                                    mail
                                </IconButton>

                                <IconButton onClick={followerClick}>
                                    <PeopleIcon />
                                    follower
                                </IconButton>
                                {detail.isFollowed ? (
                                    <IconButton onClick={unfollowClick}>
                                        <RemoveCircleOutlineIcon />
                                        unfollow
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={followClick}>
                                        <AddCircleOutlineIcon />
                                        follow
                                    </IconButton>
                                )}
                                {intId === getMeId() ? (
                                    <IconButton onClick={editClick}>
                                        <PeopleIcon />
                                        edit
                                    </IconButton>
                                ) : (
                                    <div></div>
                                )}
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid item xs={12}>
                        <MusicCollectionsComponent
                            coverClick={clickCollectionCover}
                            collections={detail.collections}
                            bodyClick={bodyClick}
                        ></MusicCollectionsComponent>
                    </Grid>
                </Grid>
            ) : (
                <div></div>
            )}
        </div>
    );
};
