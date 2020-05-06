import React, { useState, useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Music, dummyMusic } from '../dataInterfaces/music';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import { getLyric } from '../service';
import { parseLyric, getLine, LyricLine } from '../lyric/lyricParser';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';

interface MusicInfoProps {
    music: Music;
    musicId: number;
    currentTime: number;
    likeClick: () => void;
    dislikeClick: () => void;
    commentClick: () => void;
    isPlaying: boolean;
}

interface StyleProps {
    playState: string;
}

const useStyles = makeStyles({
    card: {
        height: 430,
    },
    line: {
        height: 20,
    },
    '@keyframes spin': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    cover: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        animationName: '$spin',
        animationDuration: '12000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationPlayState: (props: StyleProps): string => props.playState,
    },
    likeIcon: {
        color: 'red',
    },
    text: {
        padding: 5,
    },
});

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
    const [cssProps, setCssProps] = useState({ playState: 'paused' });
    const classes = useStyles(cssProps);
    const { music, likeClick, dislikeClick, currentTime, commentClick, musicId } = props;
    const [lyricLine, setLyricLine] = useState('');
    const [lines, setLines] = useState<LyricLine[]>([]);

    const history = useHistory();

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
    }, [currentTime]);

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
        history.push(`/main/artist/` + artistId);
    };

    const albumClick = (albumId: number): void => {
        history.push(`/main/album/` + albumId);
    };

    return (
        <Card raised={true} className={classes.card}>
            {music ? (
                <div>
                    <h4>
                        <div className={classes.text}>{music.name}</div>
                        <div
                            className={classes.text}
                            onClick={(e): void => {
                                artistClick(music.artistId);
                            }}
                        >
                            artist : <Link>{music.artist}</Link>
                        </div>
                        <div
                            className={classes.text}
                            onClick={(e): void => {
                                albumClick(music.albumId);
                            }}
                        >
                            album : <Link>{music.album}</Link>
                        </div>
                    </h4>
                    <h4 className={classes.line}>{lyricLine}</h4>
                    ---{music.like}{' '}
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
                    ---
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
