import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMusicComments, postMusicComments, deleteMusicComment } from '../../common/service';
import { MusicComment } from '../../common/interface';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import { openHint } from '../../globals';
import { useDispatch } from 'reactn';
import { CommentCard } from './commentCard';
import Pagination from '@material-ui/lab/Pagination';
import { useGlobal } from 'reactn';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
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
        pages: {
            paddingTop: 5,
            paddingBottom: 5,
        },
    }),
);

export const MusicCommentPage: React.FC = () => {
    const [currentTheMusicId] = useGlobal('currentMusicId');

    const [comments, setComments] = useState<MusicComment[]>([]);
    const [content, setContent] = useState('');

    const [pageNum, setPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [refresher, setRefresher] = useState(false);

    const textInput = useRef(null);

    const openTheHint = useDispatch(openHint);
    const history = useHistory();

    const classes = useStyles({});

    const { id } = useParams();
    const intId = parseInt(id);

    useEffect(() => {
        getMusicComments(
            intId,
            currentPage,
            ret => {
                setComments(ret.comments);
                setPageNum(ret.pageNum);
            },
            console.log,
        );
    }, [intId, currentPage, refresher]);

    useEffect(() => {
        if (currentTheMusicId > 0) {
            history.push(`/main/music_comment/` + currentTheMusicId);
        }
    }, [currentTheMusicId, history]);

    const triggerRefresher = (): void => {
        setRefresher(!refresher);
    };

    const detailClick = (userId: number): void => {
        history.push(`/main/userdetail/` + userId);
    };

    const deleteClick = (commentId: number): void => {
        deleteMusicComment(
            commentId,
            o => {
                openTheHint(o.msg);
                const newComments = comments.map(c => {
                    if (c.id === commentId) {
                        c.content = '[removed]';
                        c.canBeDeleted = false;
                    }

                    return c;
                });
                setComments(newComments);
            },
            console.log,
        );
    };

    const infoElements = comments.map((comment: MusicComment, index: number) => {
        return (
            <div key={index}>
                <ListItem>
                    <CommentCard deleteClick={deleteClick} detailClick={detailClick} comment={comment}></CommentCard>
                </ListItem>
                <Divider />
            </div>
        );
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (content.length < 5) {
            openTheHint('need more words!!!!');
            return;
        }

        postMusicComments(
            intId,
            content,
            o => {
                setContent('');
                textInput.current.value = '';
                openTheHint(o.msg);
                if (currentPage === 1) {
                    triggerRefresher();
                }
            },
            console.log,
        );
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <BackButton></BackButton>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        inputRef={textInput}
                        multiline={true}
                        className={classes.inputBox}
                        id="standard-basic"
                        label="comment"
                        variant="outlined"
                        onChange={(e): void => setContent(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.postButton}>
                        post
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Pagination
                    className={classes.pages}
                    count={pageNum}
                    onChange={(e, page): void => {
                        setCurrentPage(page);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <List>
                    <React.Fragment>{infoElements}</React.Fragment>
                </List>
            </Grid>
        </Grid>
    );
};
