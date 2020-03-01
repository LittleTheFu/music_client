import { Music } from './dataInterfaces/music';

const getOption = {
    method: 'GET',
};

const musicUrl = 'http://localhost:9999/music/nextmusic';
const musicListUrl = 'http://localhost:9999/music/musiclist';
const musicsUrl = 'http://localhost:9999/music/musics';

async function api<T>(url: string, info: object): Promise<T> {
    const response = await fetch(url, info);
    if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as T;
}

export const fetchNextMusic = (
    resolve: (arg0: string, arg1: string, arg2: string, arg3: string, arg4: string) => void,
    reject: (arg0: object) => void,
): void => {
    api<{ address: string; cover: string; name: string; artist: string; album: string }>(musicUrl, getOption)
        .then(({ address, cover, name, artist, album }) => resolve(address, cover, name, artist, album))
        .catch(e => reject(e));
};

export const fetchMusicList = (resolve: (arg0: object) => void, reject: (arg0: object) => void): void => {
    api<{ musicList: Music[] }>(musicListUrl, getOption)
        .then(musicList => {
            resolve(musicList);
        })
        .catch(e => reject(e));
};

export const fetchMusics = (resolve: (arg0: object) => void, reject: (arg0: object) => void): void => {
    api<{ musicList: Array<Music> }>(musicsUrl, getOption)
        .then(musicList => {
            resolve(musicList);
        })
        .catch(e => reject(e));
};

const rawObjectPost = (url: string, data: object, resolve: (data: any) => void): Promise<object> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .then(data => resolve(data))
        .catch(err => err);
};

const loginUrl = 'http://localhost:9999/auth/login';
export const postLogin = (username: string, password: string, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(loginUrl, { username: username, password: password }, resolve);
};

const likeMusicUrl = 'http://localhost:9999/music/like';
export const postLikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(likeMusicUrl, { musicId: musicId }, resolve);
};

const dislikeMusicUrl = 'http://localhost:9999/music/dislike';
export const postDislikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(dislikeMusicUrl, { musicId: musicId }, resolve);
};
