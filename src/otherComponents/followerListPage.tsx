import React, { useState, useEffect } from 'react';
import { getUserFollowers, followUser, unfollowUser } from '../service';
import { Follower } from '../dataInterfaces/music';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { BackButton } from '../otherComponents/backButton';
import Grid from '@material-ui/core/Grid';
import { openHint } from '../globals';
import { useDispatch } from 'reactn';
import { FollowerCard } from '../otherComponents/followerCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(1),
        },
    }),
);

export const FollowerListPage: React.FC = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    const history = useHistory();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    const openTheHint = useDispatch(openHint);

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
                openTheHint(o.msg);
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
                openTheHint(o.msg);
            },
            console.log,
        );
    };

    const avatarClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    const followerElements = followers.map((f: Follower, index: number) => {
        return (
            <Grid item xs={12} sm={4} md={3} key={index} className={classes.card}>
                <FollowerCard
                    followClick={followClick}
                    unfollowClick={unfollowClick}
                    avatarClick={avatarClick}
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
