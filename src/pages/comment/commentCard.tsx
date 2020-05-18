import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { MusicComment } from '../../common/interface';
import { DeleteButton } from '../../sharedComponents/basicComponents/deleteButton';

const useStyles = makeStyles(() =>
    createStyles({
        userAvatar: {
            height: 80,
            width: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        userName: {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
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
        deleteBtn: {
            border: '2px solid grey',
            display: 'inline',
        },
    }),
);

interface CommentCardProps {
    comment: MusicComment;

    detailClick: (userId: number) => void;
    deleteClick: (commentId: number) => void;
}

export const CommentCard: React.FC<CommentCardProps> = (props: CommentCardProps) => {
    const classes = useStyles({});

    const { comment, detailClick, deleteClick } = props;
    const { avatar, userId, username, content, date, canBeDeleted, id } = comment;

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
                    <Link
                        className={classes.userName}
                        onClick={(): void => {
                            detailClick(userId);
                        }}
                    >
                        {username}
                    </Link>
                </Grid>
                <Grid container item xs={9} md={10} lg={11}>
                    <div>{content}</div>
                    <Grid item xs={12} className={classes.date}>
                        {localDate.toString()}
                        {canBeDeleted ? (
                            <DeleteButton
                                clickDelete={(): void => {
                                    deleteClick(id);
                                }}
                            ></DeleteButton>
                        ) : (
                            <div></div>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};