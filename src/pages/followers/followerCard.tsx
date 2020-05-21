import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Follower } from '../../common/interface';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';
import { wrapName } from '../../common/common';

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

    followClick: () => void;
    unfollowClick: () => void;
    avatarClick: () => void;
}

export const FollowerCard: React.FC<FollowerCardProps> = (props: FollowerCardProps) => {
    const classes = useStyles({});

    const { follower, followClick, unfollowClick, avatarClick } = props;
    const { avatarUrl, id, name, isFollowed } = follower;

    return (
        <Card>
            <Grid container>
                <Grid item xs={2} className={classes.avatarContainer}>
                    <UserHead
                        padding={5}
                        size={80}
                        avatar={avatarUrl}
                        userName={wrapName(id, name)}
                        avatarClick={avatarClick}
                        nameClick={avatarClick}
                    ></UserHead>
                </Grid>
                <Grid container item xs={10}>
                    <Grid item xs={12}>
                        {isFollowed ? (
                            <IconButton className={classes.button} onClick={unfollowClick}>
                                <RemoveCircleOutlineIcon />
                                unfollow
                            </IconButton>
                        ) : (
                            <IconButton className={classes.button} onClick={followClick}>
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
