import React, { useState, useEffect } from 'react';
import { getUserFollowers, followUser, unfollowUser } from '../../common/service';
import { Follower } from '../../common/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import Grid from '@mui/material/Grid';
import { FollowerCard } from './followerCard';
import { wrapFunc1 } from '../../common/common';
import { getUserDetailUrl } from '../../common/routeName';
import { openHint } from 'reducer/system/functions';
import { SystemActionTypes } from 'reducer/system/types';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
// 新增导入 Theme
import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(1),
        },
    }),
);

export const FollowerListPage: React.FC = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    useEffect(() => {
        getUserFollowers(
            intId,
            (o): void => {
                setFollowers(o);
            },
            console.log,
        );
    }, [intId]);

    const followClick = (userId: number): void => {
        followUser(
            userId,
            (o): void => {
                const thatFollowers = followers;
                const retFollowers = thatFollowers.map(f => {
                    if (f.id === userId) {
                        f.isFollowed = true;
                    }
                    return f;
                });
                setFollowers(retFollowers);
                openHint(dispatch, o.msg);
            },
            console.log,
        );
    };

    const unfollowClick = (userId: number): void => {
        unfollowUser(
            userId,
            (o): void => {
                const thatFollowers = followers;
                const retFollowers = thatFollowers.map(f => {
                    if (f.id === userId) {
                        f.isFollowed = false;
                    }
                    return f;
                });
                setFollowers(retFollowers);
                openHint(dispatch, o.msg);
            },
            console.log,
        );
    };

    const avatarClick = (userId: number): void => {
        // 修改前
        // history.push(getUserDetailUrl(userId));
        // 修改后
        navigate(getUserDetailUrl(userId));
    };

    const followerElements = followers.map((f: Follower, index: number) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} className={classes.card}>
                <FollowerCard
                    followClick={wrapFunc1(followClick, f.id)}
                    unfollowClick={wrapFunc1(unfollowClick, f.id)}
                    avatarClick={wrapFunc1(avatarClick, f.id)}
                    follower={f}
                ></FollowerCard>
            </Grid>
        );
    });

    return (
        <div>
            <BackButton></BackButton>
            <Grid container>
                {followers && followers.length > 0 ? <React.Fragment>{followerElements}</React.Fragment> : <div></div>}
            </Grid>
        </div>
    );
};
