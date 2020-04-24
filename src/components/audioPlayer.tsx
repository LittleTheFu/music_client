let audioElement: HTMLAudioElement = null;

export const getAudioPlayer = (): HTMLAudioElement => {
    if (audioElement === null) {
        audioElement = new Audio();
    }

    return audioElement;
};
