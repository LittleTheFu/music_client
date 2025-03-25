import React, { useState, useEffect } from 'react';
import { getDetail, sendMail, fetchMusicsByCollectionId } from 'common/service';
import { UserDetail } from '../../common/interface';
import { followUser, unfollowUser } from '../../common/service';
import { Grid } from '@mui/material';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// 移除未使用的 useNavigate 导入
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { WriteMailModal } from './writeMailModal';
import { getMeId } from '../../helpers';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import { MusicCollectionsComponent } from '../../sharedComponents/musicsComponent/musicCollectionsComponent';
import { UserInfoCard } from './userInfoCard';
import { wrapName } from '../../common/common';
import { getProfileUrl, getFollowersUrl, getCollectionDetailUrl } from '../../common/routeName';

import { useDispatch } from 'react-redux';
import { openHint, updateMusics, updateCurrentMusic } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';

// const useStyles = makeStyles(() => createStyles({}));

export const UserDetailPage: React.FC = () => {
    const [detail, setDetail] = useState<UserDetail>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    // 移除未使用的 navigate 变量声明和赋值
    // const navigate = useNavigate();

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

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
                openHint(dispatch, o.msg);
                setMailModalOpen(false);
            },
            console.log,
        );
    };

    const followerClick = (): void => {
        history.push(getFollowersUrl(id));
    };

    const followClick = (): void => {
        followUser(
            intId,
            (o): void => {
                openHint(dispatch, o.msg);
                setDetail({ ...detail, isFollowed: true });
            },
            console.log,
        );
    };

    const unfollowClick = (): void => {
        unfollowUser(
            intId,
            (o): void => {
                openHint(dispatch, o.msg);
                setDetail({ ...detail, isFollowed: false });
            },
            console.log,
        );
    };

    const editClick = (): void => {
        history.push(getProfileUrl());
    };

    const clickCollectionCover = (id: number): void => {
        fetchMusicsByCollectionId(
            id,
            musics => {
                if (musics && musics.length > 0) {
                    updateMusics(dispatch, musics);
                    updateCurrentMusic(dispatch, musics[0]);
                }
            },
            console.log,
        );
    };

    const bodyClick = (id: number): void => {
        history.push(getCollectionDetailUrl(id));
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
