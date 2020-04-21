import React, { useState, useEffect } from 'react';
import { getUserFollowers, followUser, unfollowUser } from '../service';
import { Follower } from '../dataInterfaces/music';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useGlobal } from 'reactn';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: 40,
            width: 40,
        },
        card: {
            width: 500,
            height: 80,
        },
    }),
);

export const FollowerListPage: React.FC = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    // const [currentClickUserId, setCurrentClickUserId] = useGlobal('currentClickUserId');
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getUserFollowers(
            intId,
            (o): void => {
                console.log(o);
                setFollowers(o);
            },
            console.log,
        );
    }, []);

    // const getFollower = (): void => {
    //     console.log('get followers');
    //     getUserFollowers(2, console.log, console.log);
    // };

    const followClick = (userId: number): void => {
        console.log('unfollowerClick');
        followUser(
            userId,
            (): void => {
                const thatFollowers = followers;
                const retFollowers = thatFollowers.map(f => {
                    if (f.id === userId) {
                        f.isFollowed = true;
                    }
                    return f;
                });
                setFollowers(retFollowers);
            },
            console.log,
        );
    };

    const unfollowClick = (userId: number): void => {
        console.log('followerClick');
        unfollowUser(
            userId,
            (): void => {
                const thatFollowers = followers;
                const retFollowers = thatFollowers.map(f => {
                    if (f.id === userId) {
                        f.isFollowed = false;
                    }
                    return f;
                });
                setFollowers(retFollowers);
            },
            console.log,
        );
    };

    const avatarClick = (userId: number): void => {
        console.log('avatar click');
        // setCurrentClickUserId(userId).then(() => {
        //     history.push(`/main/userdetail`);
        // });
        history.push(`/main/userdetail/` + userId);
    };

    const followerElements = followers.map((f: Follower, index: number) => {
        return (
            <div key={index}>
                <Card className={classes.card}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Avatar
                                className={classes.avatar}
                                src={f.avatarUrl}
                                onClick={(): void => {
                                    avatarClick(f.id);
                                }}
                            ></Avatar>
                        </Grid>
                        <Grid container item xs={10}>
                            <Grid item xs={2}>
                                {f.name}
                            </Grid>
                            <Grid item xs={10}>
                                {f.isFollowed ? (
                                    <IconButton
                                        onClick={(): void => {
                                            unfollowClick(f.id);
                                        }}
                                    >
                                        <RemoveCircleOutlineIcon />
                                        unfollow
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={(): void => {
                                            followClick(f.id);
                                        }}
                                    >
                                        <AddCircleOutlineIcon />
                                        follow
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    });

    return (
        <div>
            {followers && followers.length > 0 ? <React.Fragment>{followerElements}</React.Fragment> : <div></div>}
        </div>
    );
};
