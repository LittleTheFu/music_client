import React, { useState, useEffect } from 'react';
// 修改前
// import CardMedia from '@material-ui/core/CardMedia';
// 修改后
import CardMedia from '@mui/material/CardMedia';
// 修改前
// import Card from '@material-ui/core/Card';
// 修改后
import Card from '@mui/material/Card';
// 修改前
// import { makeStyles } from '@material-ui/core/styles';
// 修改后
import { dummyMusic } from '../common/interface';
// 修改前
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// 修改后
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// 修改前
// import FavoriteIcon from '@material-ui/icons/Favorite';
// 修改后
import FavoriteIcon from '@mui/icons-material/Favorite';
// 修改前
// import { IconButton } from '@material-ui/core';
// 修改后
import { IconButton } from '@mui/material';
import { getLyric } from '../common/service';
import { parseLyric, getLine, LyricLine } from '../common/lyricParser';
// 修改前
// import CommentIcon from '@material-ui/icons/Comment';
// 修改后
import CommentIcon from '@mui/icons-material/Comment';
// 修改前
// import { useHistory } from 'react-router-dom';
// 修改后
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
    const [cssProps, setCssProps] = useState({ playState: 'paused' });
    const classes = useStyles(cssProps);
    const { music, likeClick, dislikeClick, currentTime, commentClick, musicId } = props;
    const [lyricLine, setLyricLine] = useState('');
    const [lines, setLines] = useState<LyricLine[]>([]);

    // 修改前
    // const history = useHistory();
    // 修改后
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isPlaying) {
            setCssProps({ playState: 'running' });
        } else {
            setCssProps({ playState: 'paused' });
        }
    }, [props.isPlaying]);

    useEffect(() => {
        if (musicId > 0) {
            if (lines && lines.length > 0) {
                setLyricLine(getLine(currentTime, lines));
            }
        }
    }, [currentTime, musicId, lines]);

    useEffect(() => {
        if (musicId > 0) {
            getLyric(
                musicId,
                strLyric => {
                    const lines = parseLyric(strLyric);
                    setLines(lines);
                },
                console.log,
            );
        }
    }, [musicId]);

    const artistClick = (artistId: number): void => {
        // 修改前
        // history.push(getArtistUrl(artistId));
        // 修改后
        navigate(getArtistUrl(artistId));
    };

    const albumClick = (albumId: number): void => {
        // 修改前
        // history.push(getAlbumUrl(albumId));
        // 修改后
        navigate(getAlbumUrl(albumId));
    };

    return (
        <Card raised={true} className={classes.card}>
            {music ? (
                <div className={classes.root}>
                    <h4 className={classes.infoText}>
                        <div className={classes.text}>{music.name}</div>
                        <div
                            className={classes.text}
                            onClick={(): void => {
                                artistClick(music.artistId);
                            }}
                        >
                            artist : <Link>{music.artist}</Link>
                        </div>
                        <div
                            className={classes.text}
                            onClick={(): void => {
                                albumClick(music.albumId);
                            }}
                        >
                            album : <Link>{music.album}</Link>
                        </div>
                    </h4>
                    <h4 className={classes.lyricText}>{lyricLine}</h4>

                    <div className={classes.btnGroup}>
                        {music.like}
                        {music.likedByCurrentUser ? (
                            <IconButton className={classes.likeIcon} onClick={dislikeClick}>
                                <FavoriteIcon></FavoriteIcon>
                            </IconButton>
                        ) : (
                            <IconButton className={classes.likeIcon} onClick={likeClick}>
                                <FavoriteBorderIcon></FavoriteBorderIcon>
                            </IconButton>
                        )}
                        <IconButton className={classes.likeIcon} onClick={commentClick}>
                            <CommentIcon></CommentIcon>
                        </IconButton>
                        {/* --- */}
                    </div>
                    <CardMedia image={music.cover} className={classes.cover}></CardMedia>
                </div>
            ) : (
                <div></div>
            )}
        </Card>
    );
};

MusicInfoComponent.defaultProps = {
    music: dummyMusic,
};
