import * as config from '../config.json';
import MoviesService from './movies.service';
import * as sortModes from '../json/sort-modes.json';

const SnipsService = {
    // getRecentUploads: () => {
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     }
    //     return axios.get(`${config.apiUrl}/api/movies/recentUploads/${config.recentUploadsSnipSize}`, { headers });
    // },

    // getTrending: () => {
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     }
    //     return axios.get(`${config.apiUrl}/api/movies/trending/${config.trendingSnipSize}`, { headers });
    // },

    // getRandom: () => {
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     }
    //     return axios.get(`${config.apiUrl}/api/movies/random/${config.randomSnipSize}`, { headers });
    // },

    getRecentUploads: () => {
        return MoviesService.search({sortMode: sortModes[0]}, 0, config.recentUploadsSnipSize);
    },

    getTrending: () => {
        return MoviesService.getTrending(30, 0, config.trendingSnipSize);
    },

    getRandom: () => {
        return MoviesService.getRandom(config.randomSnipSize);
    },
}

export default SnipsService;