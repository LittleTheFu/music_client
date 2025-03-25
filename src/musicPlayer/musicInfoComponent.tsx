import React, { useState, useEffect } from 'react';
import { CardMedia, Card, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, Comment as CommentIcon } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { getLyric } from '../common/service';
import { parseLyric, getLine, LyricLine } from '../common/lyricParser';
import { dummyMusic, Music } from '../common/interface';
import { makeStyles } from '@mui/styles'; // 导入 makeStyles
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getAlbumUrl, getArtistUrl } from 'common/routeName';

// 定义样式
const useStyles = makeStyles(() => ({
  card: {
    // 卡片样式
  },
  root: {
    // 根容器样式
  },
  infoText: {
    // 信息文本样式
  },
  text: {
    // 文本样式
  },
  lyricText: {
    // 歌词文本样式
  },
  btnGroup: {
    // 按钮组样式
  },
  likeIcon: {
    // 喜欢图标样式
  },
  cover: {
    // 封面样式
  },
}));

interface MusicInfoProps {
  music: Music;
  musicId: number;
  currentTime: number;
  likeClick: () => void;
  dislikeClick: () => void;
  commentClick: () => void;
  isPlaying: boolean;
}

export const MusicInfoComponent: React.FC<MusicInfoProps> = (props: MusicInfoProps) => {
  const [cssProps, setCssProps] = useState({ playState: 'paused' });
  const classes = useStyles(cssProps); // 使用 useStyles 函数
  const { music, likeClick, dislikeClick, currentTime, commentClick, musicId } = props;
  const [lyricLine, setLyricLine] = useState('');
  const [lines, setLines] = useState<LyricLine[]>([]);

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
    navigate(getArtistUrl(artistId));
  };

  const albumClick = (albumId: number): void => {
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
              onClick={() => {
                artistClick(music.artistId);
              }}
            >
              {/* 添加 to 属性 */}
              artist : <Link to={getArtistUrl(music.artistId)}>{music.artist}</Link>
            </div>
            <div
              className={classes.text}
              onClick={() => {
                albumClick(music.albumId);
              }}
            >
              {/* 同样为 album 的 Link 添加 to 属性 */}
              album : <Link to={getAlbumUrl(music.albumId)}>{music.album}</Link>
            </div>
          </h4>
          <h4 className={classes.lyricText}>{lyricLine}</h4>

          <div className={classes.btnGroup}>
            {music.like}
            {music.likedByCurrentUser ? (
              <IconButton className={classes.likeIcon} onClick={dislikeClick}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton className={classes.likeIcon} onClick={likeClick}>
                <FavoriteBorderIcon />
              </IconButton>
            )}
            <IconButton className={classes.likeIcon} onClick={commentClick}>
              <CommentIcon />
            </IconButton>
          </div>
          <CardMedia image={music.cover} className={classes.cover} />
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
