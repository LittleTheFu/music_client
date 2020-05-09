import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';

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

interface UserInfoCardProps {
    name: string;
    avatar: string;
    isFollowed: boolean;
    mailClick: () => void;
    followerClick: () => void;
    followClick: () => void;
    unfollowClick: () => void;
    editClick: () => void;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = (props: UserInfoCardProps) => {
    const classes = useStyles({});

    const { name, avatar, isFollowed, mailClick, followerClick, followClick, unfollowClick, editClick } = props;

    return (
        <Card className={classes.card}>
            <Grid container item xs={12}>
                <Grid container item xs={3}>
                    <Grid item xs={12}>
                        <img src={avatar} alt="avatar" className={classes.avatar} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.name}>{name}</div>
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
                        {isFollowed ? (
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
                        {editClick ? (
                            <IconButton onClick={editClick} className={classes.item}>
                                <EditIcon />
                                edit
                            </IconButton>
                        ) : (
                            <div></div>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};
