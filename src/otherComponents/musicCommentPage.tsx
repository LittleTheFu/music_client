import React, { useEffect, useState } from 'react';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { getMusicComments, postMusicComments } from '../service';
import { MusicComment } from '../dataInterfaces/music';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { useGlobal, useDispatch } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            // width: 300,
            // height: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        userAvatar: {
            height: 40,
            width: 40,
        },
        card: {
            width: '98%',
            marginLeft: 10,
            // marginRight: 'auto',
        },
        date: {
            color: 'grey',
        },
        inputBox: {
            width: '80%',
        },
        postForm: {
            marginLeft: 10,
        },
    }),
);

export const MusicCommentPage: React.FC = () => {
    const [comments, setComments] = useState<MusicComment[]>([]);
    const [content, setContent] = useState('');
    const [currentClickUserId, setCurrentClickUserId] = useGlobal('currentClickUserId');

    const history = useHistory();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getMusicComments(
            intId,
            retComments => {
                setComments(retComments);
                console.log(retComments);
            },
            console.log,
        );
    }, []);

    const detailClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    const infoElements = comments.map((comment: MusicComment, index: number) => {
        return (
            <div key={index}>
                <ListItem>
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item xs={1}>
                                <Avatar
                                    className={classes.userAvatar}
                                    src={comment.avatar}
                                    onClick={(): void => {
                                        // setUserCardModalOpen(true);
                                        // setCurrentClickUserId(comment.userId);
                                        detailClick(comment.userId);
                                    }}
                                ></Avatar>
                            </Grid>
                            <Grid container item xs={11}>
                                {comment.username}: {comment.content}
                                <Grid item xs={12} className={classes.date}>
                                    {comment.date.toString()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </ListItem>
                <Divider />
            </div>
        );
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log('post');

        postMusicComments(
            intId,
            content,
            comments => {
                setComments(comments);
                // console.log('AFTER POST');
                // console.log(comments);
            },
            console.log,
        );
    }

    return (
        <div>
            {' '}
            <div className={classes.postForm}>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        className={classes.inputBox}
                        id="standard-basic"
                        label="comment"
                        onChange={(e): void => setContent(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        post
                    </Button>
                </form>
            </div>
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>
        </div>
    );
};
