import React from 'react';
import { MusicComponent } from './musicComponent';
import { getAudioPlayer } from './audioPlayer';

const audioElement = getAudioPlayer();

export const MusicApp: React.FC = () => {
    return (
        <div>
            <MusicComponent audioElement={audioElement}></MusicComponent>
        </div>
    );
};
