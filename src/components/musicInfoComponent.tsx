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
    currentTime: number;
    likeClick: () => void;
    dislikeClick: () => void;
    commentClick: () => void;
}

const useStyles = makeStyles({
    card: {
        height: 350,
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
        animationPlayState: 'running',
    },
    likeIcon: {
        color: 'red',
    },
});

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
    const classes = useStyles({});
    const { music, likeClick, dislikeClick, currentTime, commentClick } = props;
    const [lyricLine, setLyricLine] = useState('');
    const [lines, setLines] = useState<LyricLine[]>([]);

    const history = useHistory();

    useEffect(() => {
        if (lines && lines.length > 0) {
            setLyricLine(getLine(currentTime, lines));
        }
    }, [currentTime]);

    useEffect(() => {
        getLyric(
            music.id,
            strLyric => {
                const lines = parseLyric(strLyric);
                setLines(lines);
            },
            console.log,
        );
    }, [music.id]);

    const artistClick = (artistId: number): void => {
        history.push(`/main/artist/` + artistId);
    };

    const albumClick = (albumId: number): void => {
        history.push(`/main/album/` + albumId);
    };

    return (
        <Card raised={true} className={classes.card}>
            <h4>
                {music.name}--
                <span
                    onClick={(e): void => {
                        e.stopPropagation();
                        artistClick(music.artistId);
                    }}
                >
                    <Link>{music.artist}</Link>
                </span>
                --
                <span
                    onClick={(e): void => {
                        e.stopPropagation();
                        albumClick(music.albumId);
                    }}
                >
                    <Link>{music.album}</Link>
                </span>
                --
                {/* {currentTime}-- */}
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
        </Card>
    );
};

MusicInfoComponent.defaultProps = {
    music: dummyMusic,
};
