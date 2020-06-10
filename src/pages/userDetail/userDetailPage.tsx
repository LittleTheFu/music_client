import React, { useState, useEffect } from 'react';
import { getDetail, sendMail, fetchMusicsByCollectionId } from 'common/service';
import { UserDetail } from '../../common/interface';
import { followUser, unfollowUser } from '../../common/service';
import Grid from '@material-ui/core/Grid';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { WriteMailModal } from './writeMailModal';
import { getMeId } from '../../globals';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { updateMusics, updateCurrentMusic } from '../../globals';
import { useDispatch } from 'reactn';
import { UserInfoCard } from './userInfoCard';
import { wrapName } from '../../common/common';

// const useStyles = makeStyles(() => createStyles({}));

export const UserDetailPage: React.FC = () => {
    const [detail, setDetail] = useState<UserDetail>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const history = useHistory();
    const updatePlayingMusics = useDispatch(updateMusics);
    const updateTheCurrentMusic = useDispatch(updateCurrentMusic);
    const openTheHint = useDispatch('openHint');

    const { id } = useParams();
    const intId = parseInt(id);

    // const classes = useStyles({});

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
            intId,
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

    const clickCollectionCover = (id: number): void => {
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
                            name={wrapName(intId, detail.name)}
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
