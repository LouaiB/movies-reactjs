import * as config from '../config.json';

const TokenStorageHelper = {
    setAccessToken: accessToken => {
        localStorage.setItem(config.tokenStorageKey, accessToken);
    },

    setRefreshToken: refreshToken => {
        localStorage.setItem(config.refreshTokenStorageKey, refreshToken);
    },

    getAccessToken: () => {
        return localStorage.getItem(config.tokenStorageKey);
    },

    getRefreshToken: () => {
        return localStorage.getItem(config.refreshTokenStorageKey);
    },

    clear: () => {
        localStorage.removeItem(config.tokenStorageKey);
        localStorage.removeItem(config.refreshTokenStorageKey);
    }
}

export default TokenStorageHelper;