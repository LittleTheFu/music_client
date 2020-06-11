const mainProfix = '/main/';
const userDetailProfix = mainProfix + 'userdetail/';
const musicCommentProfix = mainProfix + 'music_comment/';
const mailDetailProfix = mainProfix + 'mail_detail/';
const collectionDetailProfix = mainProfix + 'collection_detail/';
const followerProfix = mainProfix + 'followers/';
const albumProfix = mainProfix + 'album/';
const artistProfix = mainProfix + 'artist/';

export const getArtistUrl = (id: number): string => {
    return artistProfix + id;
};

export const getAlbumUrl = (id: number): string => {
    return albumProfix + id;
};

export const getFollowersUrl = (id: number): string => {
    return followerProfix + id;
};

export const getCollectionDetailUrl = (id: number): string => {
    return collectionDetailProfix + id;
};

export const getMailDetailUrl = (id: number): string => {
    return mailDetailProfix + id;
};

export const getMusicCommentUrl = (id: number): string => {
    return musicCommentProfix + id;
};

export const getUserDetailUrl = (id: number): string => {
    return userDetailProfix + id;
};

export const getLobbyUrl = (): string => {
    return mainProfix + 'lobby';
};

export const getMailUrl = (): string => {
    return mainProfix + 'mail';
};

export const getCollectionsUrl = (): string => {
    return mainProfix + 'collections';
};

export const getSearchUrl = (): string => {
    return mainProfix + 'search';
};

export const getAllUsersUrl = (): string => {
    return mainProfix + 'all_users';
};

export const getLoginUrl = (): string => {
    return '/login';
};

export const getProfileUrl = (): string => {
    return mainProfix + 'profile';
};

export const getSourceCodeUrl = (): string => {
    return mainProfix + 'source_code';
};

export const getEditPasswordUrl = (): string => {
    return mainProfix + 'edit_password';
};
