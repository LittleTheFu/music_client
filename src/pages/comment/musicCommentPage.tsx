import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMusicComments, postMusicComments, deleteMusicComment } from '../../common/service';
import { MusicComment } from '../../common/interface';
// 修改前
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Pagination from '@material-ui/lab/Pagination';
// 修改后
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/lab/Pagination';
import { BackButton } from '../../sharedComponents/basicComponents/backButton';
import { ContentCard } from '../../sharedComponents/basicComponents/contentCard';
import { wrapFunc1, wrapName } from '../../common/common';
import { getMusicCommentUrl, getUserDetailUrl } from '../../common/routeName';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { SystemActionTypes } from 'reducer/system/types';
import { openHint } from 'reducer/system/functions';
import { selectCurrentMusicId } from 'reducer/rootReducer';

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
    const currentTheMusicId = useSelector(selectCurrentMusicId);

    const [comments, setComments] = useState<MusicComment[]>([]);
    const [content, setContent] = useState('');

    const [pageNum, setPageNum] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [refresher, setRefresher] = useState(false);

    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

    const textInput = useRef(null);

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

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
            // 修改前
            // history.push(getMusicCommentUrl(currentTheMusicId));
            // 修改后
            navigate(getMusicCommentUrl(currentTheMusicId));
        }
    }, [currentTheMusicId, navigate]);

    const triggerRefresher = (): void => {
        setRefresher(!refresher);
    };

    const detailClick = (userId: number): void => {
        // 修改前
        // history.push(getUserDetailUrl(userId));
        // 修改后
        navigate(getUserDetailUrl(userId));
    };

    const deleteClick = (commentId: number): void => {
        deleteMusicComment(
            commentId,
            o => {
                openHint(dispatch, o.msg);
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
                    <ContentCard
                        deleteClick={wrapFunc1(deleteClick, comment.id)}
                        detailClick={wrapFunc1(detailClick, comment.userId)}
                        avatar={comment.avatar}
                        content={comment.content}
                        canBeDeleted={comment.canBeDeleted}
                        username={wrapName(comment.userId, comment.username)}
                        date={comment.date}
                    ></ContentCard>
                </ListItem>
                <Divider />
            </div>
        );
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (content.length < 5) {
            openHint(dispatch, 'need more words!!!!');
            return;
        }

        postMusicComments(
            intId,
            content,
            o => {
                setContent('');
                textInput.current.value = '';
                openHint(dispatch, o.msg);
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
