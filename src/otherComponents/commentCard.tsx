import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { MusicComment } from '../dataInterfaces/interface';

const useStyles = makeStyles(() =>
    createStyles({
        userAvatar: {
            height: 80,
            width: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        card: {
            width: '100%',
        },
        item: {
            width: '100%',
        },
        date: {
            color: 'grey',
        },
        inputBox: {
            width: '100%',
        },
        postButton: {
            width: '100%',
        },
    }),
);

interface CommentCardProps {
    comment: MusicComment;

    detailClick: (userId: number) => void;
}

export const CommentCard: React.FC<CommentCardProps> = (props: CommentCardProps) => {
    const classes = useStyles({});

    const { comment, detailClick } = props;
    const { avatar, userId, username, content, date } = comment;

    const localDate = new Date(date);

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={3} md={2} lg={1}>
                    <Avatar
                        className={classes.userAvatar}
                        src={avatar}
                        onClick={(): void => {
                            detailClick(userId);
                        }}
                    ></Avatar>
                </Grid>
                <Grid container item xs={9} md={10} lg={11}>
                    <Link
                        onClick={(): void => {
                            detailClick(userId);
                        }}
                    >
                        {username}
                    </Link>
                    : {content}
                    <Grid item xs={12} className={classes.date}>
                        {localDate.toString()}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};
