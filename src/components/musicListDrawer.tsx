import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Music } from '../dataInterfaces/music';
import { MusicListComponent } from './musicListComponent';

// const useStyles = makeStyles({
//     list: {
//         width: 250,
//     },
//     fullList: {
//         width: 'auto',
//     },
// });

interface MusicListDrawerProps {
    open: boolean;
    closeClick: () => void;

    musics: Music[];
    currentMusic: Music;
    clickMusic: (music: Music, index: number) => void;
    likeClick: (id: number) => void;
    dislikeClick: (id: number) => void;
    addMusicClick: (id: number) => void;
    removeMusicClick: (id: number) => void;
    commentClick: (id: number) => void;
}

export const MusicListDrawer: React.FC<MusicListDrawerProps> = (props: MusicListDrawerProps) => {
    const {
        open,
        closeClick,
        musics,
        currentMusic,
        clickMusic,
        likeClick,
        dislikeClick,
        addMusicClick,
        removeMusicClick,
        commentClick,
    } = props;

    return (
        <div>
            <Drawer
                anchor="right"
                open={open}
                onClose={(): void => {
                    closeClick();
                    // setDrawerOpen(false);
                    // console.log('close');
                }}
            >
                <MusicListComponent
                    musics={musics}
                    currentMusic={currentMusic}
                    clickMusic={clickMusic}
                    likeClick={likeClick}
                    dislikeClick={dislikeClick}
                    addMusicClick={addMusicClick}
                    removeMusicClick={removeMusicClick}
                    commentClick={commentClick}
                />
            </Drawer>
        </div>
    );
};
