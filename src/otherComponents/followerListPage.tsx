import React, { useState, useEffect } from 'react';
import { getUserFollowers, followUser, unfollowUser } from '../service';
import { Follower } from '../dataInterfaces/music';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory, useParams } from 'react-router-dom';
import { BackButton } from '../otherComponents/backButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() =>
    createStyles({
        avatarContainer: {
            display: 'tableCell',
            verticalAlign: 'middle',
        },
        avatar: {
            height: 40,
            width: 40,
            // display: 'block',
            // margin: 'auto',
        },
        card: {
            height: '80%',
            width: '80%',
        },
        name: {
            textAlign: 'center',
        },
        button: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }),
);

export const FollowerListPage: React.FC = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    const history = useHistory();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

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
        history.push(`/main/userdetail/` + userId);
    };

    const followerElements = followers.map((f: Follower, index: number) => {
        return (
            <Grid item xs={6} sm={4} md={3} key={index}>
                <Card className={classes.card}>
                    <Grid container>
                        <Grid item xs={2} className={classes.avatarContainer}>
                            <Avatar
                                className={classes.avatar}
                                src={f.avatarUrl}
                                onClick={(): void => {
                                    avatarClick(f.id);
                                }}
                            ></Avatar>
                        </Grid>
                        <Grid container item xs={10}>
                            <Grid item xs={12}>
                                <div className={classes.name}> {f.name}</div>
                            </Grid>
                            <Grid item xs={12}>
                                {f.isFollowed ? (
                                    <IconButton
                                        className={classes.button}
                                        onClick={(): void => {
                                            unfollowClick(f.id);
                                        }}
                                    >
                                        <RemoveCircleOutlineIcon />
                                        unfollow
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        className={classes.button}
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
