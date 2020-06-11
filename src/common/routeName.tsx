const mainProfix = '/main/';

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
