import axios from 'axios';
import { getToken } from './globals';
import {
    AccessData,
    RetSimpleUser,
    Music,
    CollectionDetail,
    MusicComment,
    Mail,
    Follower,
    Artist,
} from './dataInterfaces/music';

const hostPrefix = 'http://localhost:9999/';
const userPrefix = hostPrefix + 'users/';
const authPrefix = hostPrefix + 'auth/';
const musicPrefix = hostPrefix + 'music/';
const profilePrefix = hostPrefix + 'profile/';
const commentPrefix = hostPrefix + 'comment/';
const mailPrefix = hostPrefix + 'mail/';

function rawObjectPost<T>(
    url: string,
    data: object,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject?: (error: Error) => void,
): Promise<T> {
    return axios
        .post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('err.response');
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (reject) {
                    if ('error' in err.response.data) {
                        reject(new Error(err.response.data.error));
                    }
                }
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('err.request');
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            console.log(err.config);

            return err;
        });
}

const registerUrl = userPrefix + 'register';
export const postRegister = (
    username: string,
    password: string,
    resolve: (data: any) => void,
    reject: (data: Error) => void,
): Promise<object> => {
    return rawObjectPost(registerUrl, { username: username, password: password }, resolve, {}, reject);
};

const loginUrl = authPrefix + 'login';
export const postLogin = (
    username: string,
    password: string,
    resolve: (data: AccessData) => void,
    reject: (data: Error) => void,
): Promise<AccessData> => {
    return rawObjectPost(loginUrl, { username: username, password: password }, resolve, {}, reject);
};

const likeMusicUrl = musicPrefix + 'like';
export const postLikeMusic = (
    musicId: number,
    resolve: (data: any) => void,
    reject?: (data: Error) => void,
): Promise<object> => {
    return rawObjectPost(
        likeMusicUrl,
        { musicId: musicId },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const getAllUsersUrl = userPrefix + 'getAllUsers';
export const getAllUsers = (resolve: (data: RetSimpleUser[]) => void): Promise<RetSimpleUser[]> => {
    return rawObjectPost(getAllUsersUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const dislikeMusicUrl = musicPrefix + 'dislike';
export const postDislikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(dislikeMusicUrl, { musicId: musicId }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const getPrivateCollectionsUrl = musicPrefix + 'getPrivateMusicCollections';
export const getPrivateMusicCollections = (
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getPrivateCollectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() }, reject);
};

const addMusicToCollectionUrl = musicPrefix + 'addMusicToCollection';
export const addMusicToCollection = (
    collectionId: number,
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        addMusicToCollectionUrl,
        { collectionId: collectionId, musicId: musicId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const createCollectionUrl = musicPrefix + 'createCollection';
export const createCollection = (
    name: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        createCollectionUrl,
        { name: name },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const musicsByCollectionIdUrl = musicPrefix + 'GetMusicsByCollectionId';
export const fetchMusicsByCollectionId = (
    id: number,
    resolve: (data: Music[]) => void,
    reject: (arg0: object) => void,
): Promise<Music[]> => {
    return rawObjectPost(
        musicsByCollectionIdUrl,
        { id: id },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const deleteCollectionUrl = musicPrefix + 'deleteCollection';
export const deleteCollection = (
    id: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(deleteCollectionUrl, { id: id }, resolve, { Authorization: 'Bearer ' + getToken() }, reject);
};

const getCollectionDetailByIdUrl = musicPrefix + 'GetCollectionDetailById';
export const getCollectionDetailById = (
    id: number,
    resolve: (data: CollectionDetail) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        getCollectionDetailByIdUrl,
        { id: id },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const musicsByKeyWord = musicPrefix + 'GetMusicsByKeyWord';
export const fetchMusicsByKeyword = (
    keyword: string,
    resolve: (data: Music[]) => void,
    reject: (arg0: object) => void,
): Promise<Music[]> => {
    return rawObjectPost(
        musicsByKeyWord,
        { keyword: keyword },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const removeMusicFromCollectionUrl = musicPrefix + 'removeMusicFromCollection';
export const removeMusicFromCollection = (
    musicId: number,
    collectionId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        removeMusicFromCollectionUrl,
        { musicId: musicId, collectionId: collectionId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMusicCommentsUrl = commentPrefix + 'GetMusicComments';
export const getMusicComments = (
    musicId: number,
    resolve: (data: MusicComment[]) => void,
    reject: (arg0: object) => void,
): Promise<MusicComment[]> => {
    return rawObjectPost(getMusicCommentsUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const postMusicCommentsUrl = commentPrefix + 'PostMusicComments';
export const postMusicComments = (
    musicId: number,
    content: string,
    resolve: (data: MusicComment[]) => void,
    reject: (arg0: object) => void,
): Promise<MusicComment[]> => {
    return rawObjectPost(
        postMusicCommentsUrl,
        { musicId: musicId, content: content },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMeUrl = userPrefix + 'me';
export const getMe = (
    resolve: (data: RetSimpleUser) => void,
    reject: (arg0: object) => void,
): Promise<RetSimpleUser> => {
    return rawObjectPost(getMeUrl, {}, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMailUrl = mailPrefix + 'getMails';
export const getUserMails = (resolve: (data: Mail[]) => void, reject: (arg0: object) => void): Promise<Mail[]> => {
    return rawObjectPost(
        getMailUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMailDetailUrl = mailPrefix + 'getMail';
export const getMailDetail = (
    mailId: number,
    resolve: (data: Mail) => void,
    reject: (arg0: object) => void,
): Promise<Mail> => {
    return rawObjectPost(
        getMailDetailUrl,
        { mailId: mailId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const deleteMailUrl = mailPrefix + 'deleteMail';
export const deleteMail = (
    mailId: number,
    resolve: (data: Mail[]) => void,
    reject: (arg0: object) => void,
): Promise<Mail[]> => {
    return rawObjectPost(
        deleteMailUrl,
        { mailId: mailId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const sendMailUrl = mailPrefix + 'sendMail';
export const sendMail = (
    toId: number,
    content: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        sendMailUrl,
        { toId: toId, content: content },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const detailUrl = userPrefix + 'detail';
export const getDetail = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        detailUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const followUserUrl = userPrefix + 'follow';
export const followUser = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        followUserUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const unfollowUserUrl = userPrefix + 'unfollow';
export const unfollowUser = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        unfollowUserUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getUserFollowersUrl = userPrefix + 'getUserFollowers';
export const getUserFollowers = (
    userId: number,
    resolve: (data: Follower[]) => void,
    reject: (arg0: object) => void,
): Promise<Follower[]> => {
    return rawObjectPost(
        getUserFollowersUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getAlbumsUrl = musicPrefix + 'getAlbums';
export const getAlbums = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(
        getAlbumsUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getAlbumDetailUrl = musicPrefix + 'getAlbumDetail';
export const getAlbumDetail = (
    albumId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        getAlbumDetailUrl,
        { albumId: albumId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getArtistInfoUrl = musicPrefix + 'getArtistInfo';
export const getArtistInfo = (
    artistId: number,
    resolve: (data: Artist) => void,
    reject: (arg0: object) => void,
): Promise<Artist> => {
    return rawObjectPost(
        getArtistInfoUrl,
        { artistId: artistId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

//------------------------------------------------------------

const fileObjectPost = (
    url: string,
    data: FormData,
    resolve: (data: any) => void,
    headerContent: object = {},
): Promise<object> => {
    return axios
        .post(url, data, {
            headers: {
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            return data;
        })
        .catch(err => {
            return err;
        });
};

const uploadAvatarUrl = profilePrefix + 'upload';
export const uploadAvatar = (
    data: FormData,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return fileObjectPost(uploadAvatarUrl, data, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMusicLyricUrl = musicPrefix + 'getLyric';
export const getLyric = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(
        getMusicLyricUrl,
        { musicId: musicId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};
