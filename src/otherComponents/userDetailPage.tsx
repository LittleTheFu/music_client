import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { getDetail, sendMail, fetchMusicsByCollectionId } from 'service';
import { UserDetail } from '../dataInterfaces/music';
import { followUser, unfollowUser } from '../service';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { WriteMailModal } from '../mailComponents/writeMailModal';
import { getMeId, openHint } from '../globals';
import { BackButton } from '../otherComponents/backButton';
import { MusicCollectionsComponent } from '../components/musicCollectionsComponent';
import { updateMusics, updateCurrentMusic } from '../globals';
import { useDispatch } from 'reactn';
import { UserInfoCard } from '../otherComponents/userInfoCard';

const useStyles = makeStyles(() =>
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
    const openTheHint = useDispatch(openHint);

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
    }, [intId]);

    const mailClick = (): void => {
        setMailModalOpen(true);
    };

    const sendMailClick = (content: string): void => {
        sendMail(
            intId,
            content,
            o => {
                openTheHint(o.msg);
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
                openTheHint(o.msg);
                setDetail({ ...detail, isFollowed: true });
            },
            console.log,
        );
    };

    const unfollowClick = (): void => {
        unfollowUser(
            currentClickUserId,
            (o): void => {
                openTheHint(o.msg);
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
            musics => {
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
                        <UserInfoCard
                            name={detail.name}
                            avatar={detail.avatarUrl}
                            isFollowed={detail.isFollowed}
                            mailClick={mailClick}
                            followerClick={followerClick}
                            followClick={followClick}
                            unfollowClick={unfollowClick}
                            editClick={getMeId() === intId ? editClick : null}
                        ></UserInfoCard>
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
