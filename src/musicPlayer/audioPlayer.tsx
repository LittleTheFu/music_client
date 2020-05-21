let audioElement: HTMLAudioElement = null;

export const getAudioPlayer = (): HTMLAudioElement => {
    if (audioElement === null) {
        // audioElement = new Audio();
        audioElement = document.getElementById('audio_player') as HTMLAudioElement;
    }

    return audioElement;
};
