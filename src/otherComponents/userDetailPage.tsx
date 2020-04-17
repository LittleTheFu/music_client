import React, { useState, useEffect } from 'react';
import { useGlobal, useDispatch } from 'reactn';
import { getDetail, sendMail } from 'service';
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
import { useHistory, useRouteMatch } from 'react-router-dom';
import { WriteMailModal } from '../mailComponents/writeMailModal';

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
    const [meId] = useGlobal('meId');
    const [detail, setDetail] = useState<UserDetail>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const history = useHistory();
    const { path, url } = useRouteMatch();
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

    const mailClick = (): void => {
        console.log('mail click');
        setMailModalOpen(true);
    };

    const sendMailClick = (content: string): void => {
        console.log('send mail click');
        console.log(content);

        sendMail(
            currentClickUserId,
            content,
            o => {
                console.log(o);
                setMailModalOpen(false);
            },
            console.log,
        );
    };

    const followerClick = (): void => {
        console.log('followerClick');
        history.push(`/main/followers`);
    };

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

    const editClick = (): void => {
        console.log('edit click');
        history.push(`/main/profile`);
    };

    return (
        <div>
            <WriteMailModal
                sendClick={sendMailClick}
                modalOpen={mailModalOpen}
                modalClose={(): void => setMailModalOpen(false)}
            ></WriteMailModal>
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
                                <IconButton onClick={mailClick}>
                                    <MailOutlinedIcon />
                                    mail
                                </IconButton>

                                <IconButton onClick={followerClick}>
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
                                {currentClickUserId === meId ? (
                                    <IconButton onClick={editClick}>
                                        <PeopleIcon />
                                        edit
                                    </IconButton>
                                ) : (
                                    <div></div>
                                )}
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