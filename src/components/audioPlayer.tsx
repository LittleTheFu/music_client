let audioElement: HTMLAudioElement = null;

export const getAudioPlayer = (): HTMLAudioElement => {
    if (audioElement === null) {
        audioElement = new Audio();
    }

    return audioElement;
};
// export const AudioComponent = (): HTMLAudioElement => {
//     return audioElement;
// };

// export class AudioPlayer {
//     private audioElement: HTMLAudioElement;

//     constructor() {
//         this.audioElement = new Audio();
//     }

//     public setUrl(url: string) {
//         this.audioElement.src = url;
//     }

//     public setAutoPlay(flag: boolean) {
//         this.audioElement.autoplay = flag;
//     }

//     public setVolume(volume: number) {
//         this.audioElement.volume = volume;
//     }

//     public setCurrentTime(currentTime: number) {
//         this.audioElement.currentTime = currentTime;
//         // this.audioElement.onloadedmetadata
//     }

//     public onLoadedMetaData(callbackFn: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
//         this.audioElement.onloadedmetadata(callbackFn);
//     }
// }
