import { Music, MusicCollection } from './dataInterfaces/music';
import { getToken } from './globals';

const getOption = {
    method: 'GET',
};

const musicUrl = 'http://localhost:9999/music/nextmusic';
const musicListUrl = 'http://localhost:9999/music/musiclist';
const musicsUrl = 'http://localhost:9999/music/musics';

async function api<T>(url: string, headers: object, headersContent: object = {}): Promise<T> {
    console.log({ ...headers, ...headersContent });
    const response = await fetch(url, { ...headers, ...headersContent });
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
    api<{ musicList: Music[] }>(musicListUrl, getOption, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    })
        .then(musicList => {
            resolve(musicList);
        })
        .catch(e => reject(e));
};

export const fetchMusics = (resolve: (arg0: object) => void, reject: (arg0: object) => void): void => {
    api<{ musicList: Array<Music> }>(musicsUrl, getOption, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    })
        .then(musicList => {
            resolve(musicList);
        })
        .catch(e => reject(e));
};

const rawObjectPost = (
    url: string,
    data: object,
    resolve: (data: any) => void,
    headerContent: object = {},
): Promise<object> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            ...headerContent,
        },
    })
        .then(response => {
            return response.json();
        })
        .then(data => resolve(data))
        .catch(err => err);
};

const registerUrl = 'http://localhost:9999/users/register';
export const postRegister = (username: string, password: string, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(registerUrl, { username: username, password: password }, resolve);
};

const loginUrl = 'http://localhost:9999/auth/login';
export const postLogin = (username: string, password: string, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(loginUrl, { username: username, password: password }, resolve);
};

const likeMusicUrl = 'http://localhost:9999/music/like';
export const postLikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(likeMusicUrl, { musicId: musicId }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const dislikeMusicUrl = 'http://localhost:9999/music/dislike';
export const postDislikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(dislikeMusicUrl, { musicId: musicId }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const profileUrl = 'http://localhost:9999/profile';
export const postShowProfile = (resolve: (data: any) => void): Promise<object> => {
    console.log(getToken());
    return rawObjectPost(profileUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const collectionsUrl = 'http://localhost:9999/music/collections';
export const getMusicCollections = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(collectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const musicsByCollectionUrl = 'http://localhost:9999/music/GetMusicsByCollectionName';
export const fetchMusicsByCollectionName = (
    name: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(musicsByCollectionUrl, { name: name }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const musicsByKeyWord = 'http://localhost:9999/music/GetMusicsByKeyWord';
export const fetchMusicsByKeyword = (
    keyword: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(musicsByKeyWord, { keyword: keyword }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const addMusicToPersonalListUrl = 'http://localhost:9999/music/AddMusicToMyList';
export const addMusicToPersonalList = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(addMusicToPersonalListUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};
