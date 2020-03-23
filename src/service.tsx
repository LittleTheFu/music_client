import { Music } from './dataInterfaces/music';
import { getToken } from './globals';

const getOption = {
    method: 'GET',
};

const musicUrl = 'http://localhost:9999/music/nextmusic';
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

const playListMusicListUrl = 'http://localhost:9999/music/playlistmusiclist';
export const fetchPlayListMusicList = (resolve: (arg0: object) => void, reject: (arg0: object) => void): void => {
    api<{ musicList: Music[] }>(playListMusicListUrl, getOption, {
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

const removeMusicToPersonalListUrl = 'http://localhost:9999/music/RemoveMusicFromMyList';
export const removeMusicFromPersonalList = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(removeMusicToPersonalListUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMusicCommentsUrl = 'http://localhost:9999/comment/GetMusicComments';
export const getMusicComments = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getMusicCommentsUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const postMusicCommentsUrl = 'http://localhost:9999/comment/PostMusicComments';
export const postMusicComments = (
    musicId: number,
    content: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(postMusicCommentsUrl, { musicId: musicId, content: content }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getUserAvatarUrl = 'http://localhost:9999/profile/getUserAvatar';
export const getUserAvatar = (
    username: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getUserAvatarUrl, { username: username }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMailUrl = 'http://localhost:9999/mail/getMails';
export const getUserMails = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(getMailUrl, {}, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const deleteMailUrl = 'http://localhost:9999/mail/deleteMail';
export const deleteMail = (
    mailId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(deleteMailUrl, { mailId: mailId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const sendMailUrl = 'http://localhost:9999/mail/sendMail';
export const sendMail = (
    toId: number,
    content: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(sendMailUrl, { toId: toId, content: content }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

//------------------------------------------------------------

const fileObjectPost = (
    url: string,
    data: FormData,
    resolve: (data: any) => void,
    headerContent: object = {},
): Promise<object> => {
    const options = {
        method: 'POST',
        body: data,
        headers: {
            ...headerContent,
        },
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => resolve(data))
        .catch(err => err);
};

const uploadAvatarUrl = 'http://localhost:9999/profile/upload';
export const uploadAvatar = (
    data: FormData,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    console.log(data);
    return fileObjectPost(uploadAvatarUrl, data, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};
