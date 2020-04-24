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

            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        name: {
            textAlign: 'center',
        },
        card: {
            width: '100%',
        },
        item: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }),
);

export const UserDetailPage: React.FC = () => {
    const [currentClickUserId] = useGlobal('currentClickUserId');
    const [detail, setDetail] = useState<UserDetail>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const history = useHistory();
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
                    <Grid container item xs={12}>
                        <Card className={classes.card}>
                            <Grid container item xs={12}>
                                <Grid container item xs={3}>
                                    <Grid item xs={12}>
                                        <img src={detail.avatarUrl} alt="avatar" className={classes.avatar} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.name}>{detail.name}</div>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={9}>
                                    <Grid item sm={3} xs={6}>
                                        <IconButton onClick={mailClick} className={classes.item}>
                                            <MailOutlinedIcon />
                                            mail
                                        </IconButton>
                                    </Grid>
                                    <Grid item sm={3} xs={6}>
                                        <IconButton onClick={followerClick} className={classes.item}>
                                            <PeopleIcon />
                                            follower
                                        </IconButton>
                                    </Grid>
                                    <Grid item sm={3} xs={6}>
                                        {detail.isFollowed ? (
                                            <IconButton onClick={unfollowClick} className={classes.item}>
                                                <RemoveCircleOutlineIcon />
                                                unfollow
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={followClick} className={classes.item}>
                                                <AddCircleOutlineIcon />
                                                follow
                                            </IconButton>
                                        )}
                                    </Grid>
                                    <Grid item sm={3} xs={6}>
                                        {intId === getMeId() ? (
                                            <IconButton onClick={editClick} className={classes.item}>
                                                <PeopleIcon />
                                                edit
                                            </IconButton>
                                        ) : (
                                            <div></div>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
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
