import React from 'react';
// 修改前
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core/Grid';
// import { Card } from '@material-ui/core/Card';
// import { IconButton } from '@material-ui/core/IconButton';
// import MailOutlined from '@material-ui/icons/MailOutlined';
// import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
// import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
// import People from '@material-ui/icons/People';
// import Edit from '@material-ui/icons/Edit';

// 修改后
import { makeStyles, createStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { IconButton } from '@mui/material';
// 移除未使用的导入
// import MailOutlined from '@mui/icons-material/MailOutlined';
// import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
// import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
// import People from '@mui/icons-material/People';
// import Edit from '@mui/icons-material/Edit';

// 添加缺失的导入
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PeopleIcon from '@mui/icons-material/People';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { UserHead } from '../../sharedComponents/basicComponents/userHead';

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
                <Grid item xs={3}>
                    <UserHead avatar={avatar} userName={name} size={90}></UserHead>
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
