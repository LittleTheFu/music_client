import React from 'react';

const MusicComponent: React.FC = () => {
    return (
        <audio controls>
            <source src="http://localhost:9999/music" type="audio/mp3" />
        </audio>
    );
};

export default MusicComponent;
