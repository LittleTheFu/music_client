import React, { useState, useEffect } from 'react';
import { useGlobal, useDispatch } from 'reactn';
import { getDetail } from 'service';
import { UserDetail } from '../dataInterfaces/music';
import Button from '@material-ui/core/Button';
import { followUser, unfollowUser } from '../service';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleIcon from '@material-ui/icons/People';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: 80,
            width: 80,
        },
        card: {
            width: 600,
        },
    }),
);

export const UserDetailPage: React.FC = () => {
    const [currentClickUserId] = useGlobal('currentClickUserId');
    const [detail, setDetail] = useState<UserDetail>(null);

    const classes = useStyles({});

    useEffect(() => {
        console.log(detail);
        getDetail(
            currentClickUserId,
            o => {
                setDetail(o);
                console.log(o);
            },
            console.log,
        );
    }, []);

    const followClick = (): void => {
        followUser(
            currentClickUserId,
            (o): void => {
                // const d = detail;
                // d.isFollowed = true;
                // setDetail(d);
                setDetail({ ...detail, isFollowed: true });
                console.log('fl');
            },
            console.log,
        );
    };

    const unfollowClick = (): void => {
        unfollowUser(
            currentClickUserId,
            (o): void => {
                // const d = detail;
                // d.isFollowed = false;
                setDetail({ ...detail, isFollowed: false });
                console.log('unfl');
            },
            console.log,
        );
    };

    return (
        <div>
            {detail ? (
                <Card className={classes.card}>
                    <Grid container>
                        <Grid item xs={2}>
                            <img src={detail.avatarUrl} alt="avatar" className={classes.avatar} />
                        </Grid>
                        <Grid container item xs={10}>
                            <Grid item xs={12}>
                                {detail.name}
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <IconButton>
                                        <MailOutlinedIcon />
                                        mail
                                    </IconButton>

                                    <IconButton>
                                        <PeopleIcon />
                                        follower
                                    </IconButton>
                                    {detail.isFollowed ? (
                                        <IconButton onClick={unfollowClick}>
                                            <RemoveCircleOutlineIcon />
                                            unfollow
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={followClick}>
                                            <AddCircleOutlineIcon />
                                            follow
                                        </IconButton>
                                    )}
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <div></div>
            )}
        </div>
    );
};
