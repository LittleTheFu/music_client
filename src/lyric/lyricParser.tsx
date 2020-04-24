export const testLyric = `[00:00.30]記憶のカケラこの手に集え
[00:04.52]純粋たる願いは
[00:08.16]時を越えて輝きだし この胸を焦がすよ
[00:15.54]
[00:21.75]幼い頃みた夢は まだ心の奥底に
[00:29.76]思い出の一ページは いつまでも色褪せない
[00:36.84]
[00:36.91]年を重ねるたびに 夢は遠くへ
[00:43.63]もう一度だけ開いてみよう 記憶の扉を
[00:50.77]
[00:50.83]何かに追われ振り回されて
[00:54.76]忘れていたあの日々
[00:58.18]穢れ知らぬ熱き想い いま取り戻すから
[01:05.37]記憶のカケラこの手に集え
[01:09.10]純粋たる願いは
[01:12.48]時を越えて輝きだし この胸を焦がすよ
[01:19.94]
[01:27.05]離れ離れになっても まだ忘れられずにいる
[01:34.19]絆が結ぶ仲間は 今どこで何している
[01:41.19]
[01:41.27]遠く離れるたびに 過去は彼方へ
[01:48.17]だけど逢えば分かり合える 破れぬ絆を
[01:55.42]
[01:55.49]萃まる想いこの手に集え 共に追ったあの夢
[02:02.62]重ねてきた熱き日々は まだ続いてるから
[02:09.50]
[02:09.56]何年先もその先までも 絆だけは消せない
[02:16.97]終わり知らぬあの想いが この胸を叩くよ
[02:24.44]
[02:53.23]年を重ねるたびに 夢は遠くへ
[02:59.89]もう一度だけ開いてみよう 記憶の扉を
[03:06.60]
[03:08.08]何かに追われ振り回されて
[03:11.73]忘れていたあの日々
[03:15.06]穢れ知らぬ熱き想い いま取り戻すから
[03:22.21]
[03:22.27]記憶のカケラこの手に集え
[03:26.07]純粋たる願いは
[03:29.46]時を越えて輝きだし この胸を焦がすよ
[03:36.98]`;

export interface LyricLine {
    time: number;
    lyric: string;
}

const lyric: LyricLine[] = [];

enum ParseState {
    NullState = 1,
    ParseTimeState,
    ParseWordState,
}

const strToTime = (strTime: string): number => {
    const min = strTime.substr(0, 2);
    const sec = strTime.substr(3, strTime.length - 3);

    const m = parseInt(min);
    const s = parseFloat(sec);
    if (m === NaN || s === NaN) {
        return 0;
    }

    return m * 60 + s;
};

export const getLine = (time: number, lines: LyricLine[]): string => {
    const num = lines.length;

    for (let i = 1; i < num; i++) {
        if (lines[i].time > time) {
            return lines[i - 1].lyric;
        }
    }

    return '';
};

export const parseLyric = (lyricStr: string): LyricLine[] => {
    const lines: LyricLine[] = [];
    let pos = 0;
    const length = lyricStr.length;
    let timeStr = '';
    let words = '';
    let state = ParseState.NullState;
    const largeSec = 1000000;

    while (pos < length) {
        const c = lyricStr[pos];

        switch (c) {
            case '[':
                if (timeStr.length > 0) {
                    lines.push({ time: strToTime(timeStr), lyric: words });
                    timeStr = '';
                    words = '';
                }
                state = ParseState.ParseTimeState;
                break;
            case ']':
                state = ParseState.ParseWordState;
                break;
            default:
                if (state === ParseState.ParseTimeState) {
                    timeStr += c;
                } else if (state === ParseState.ParseWordState) {
                    words += c;
                }
                break;
        }
        pos++;
    }

    lines.push({ time: largeSec, lyric: 'end' });

    return lines;
};
