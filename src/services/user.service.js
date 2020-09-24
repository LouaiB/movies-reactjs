import axios from 'axios';
import * as config from '../config.json';
import TokenStorageHelper from '../storage/token.storage';

const UserService = {
    login: (username, password) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(`${config.apiUrl}/api/login`, { username, password }, { headers });
    },

    register: (username, email, password) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(`${config.apiUrl}/api/register`, { username, email, password }, { headers });
    },

    logout: () => {
        const refreshToken = TokenStorageHelper.getRefreshToken();
        if(!refreshToken) return Promise.reject();

        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(`${config.apiUrl}/api/logout`, { refreshToken }, { headers });
    },

    getUserData: () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(`${config.apiUrl}/api/userData`, { headers });
    }
}

export default UserService;