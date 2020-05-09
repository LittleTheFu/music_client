import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { Follower } from '../dataInterfaces/music';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarContainer: {
            display: 'tableCell',
            verticalAlign: 'middle',
        },
        avatar: {
            height: 40,
            width: 40,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        card: {
            padding: theme.spacing(1),
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

interface FollowerCardProps {
    follower: Follower;

    followClick: (userId: number) => void;
    unfollowClick: (userId: number) => void;
    avatarClick: (userId: number) => void;
}

export const FollowerCard: React.FC<FollowerCardProps> = (props: FollowerCardProps) => {
    const classes = useStyles({});

    const { follower, followClick, unfollowClick, avatarClick } = props;
    const { avatarUrl, id, name, isFollowed } = follower;

    return (
        <Card>
            <Grid container>
                <Grid item xs={2} className={classes.avatarContainer}>
                    <Avatar
                        className={classes.avatar}
                        src={avatarUrl}
                        onClick={(): void => {
                            avatarClick(id);
                        }}
                    ></Avatar>
                    <div className={classes.name}>
                        <Link
                            onClick={(): void => {
                                avatarClick(id);
                            }}
                        >
                            {name}
                        </Link>
                    </div>
                </Grid>
                <Grid container item xs={10}>
                    <Grid item xs={12}>
                        {isFollowed ? (
                            <IconButton
                                className={classes.button}
                                onClick={(): void => {
                                    unfollowClick(id);
                                }}
                            >
                                <RemoveCircleOutlineIcon />
                                unfollow
                            </IconButton>
                        ) : (
                            <IconButton
                                className={classes.button}
                                onClick={(): void => {
                                    followClick(id);
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
    );
};
