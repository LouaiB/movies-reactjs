import axios from 'axios';
import * as config from '../config.json';
import TokenStorageHelper from '../storage/token.storage';
import moviePlaceholder from '../assets/pirates.jpg';
import userPlaceholder from '../assets/tag.jpg';
import * as sortModes from '../json/sort-modes.json';

const MoviesService = {
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
        const sampleMovies = [];

        for (let i = 1; i <= 25; i++){
            sampleMovies.push({
                _id: i,
                title: `Movie ${i}`,
                description: 'abcd 1234',
                views: (Math.random() * 5000000).toFixed(0),
                thumbnail: moviePlaceholder
            });
        }

        return sampleMovies;
    },

    // getTrending: (span, pageNum, pageSize) => {
    //     const sampleMovies = [];

    //     for (let i = 1; i <= 24; i++){
    //         sampleMovies.push({
    //             _id: i,
    //             title: `Movie ${pageNum}:${i} [span: ${span}]`,
    //             description: 'abcd 1234',
    //             views: (Math.random() * 5000000).toFixed(0),
    //             thumbnail: moviePlaceholder
    //         });
    //     }

    //     return { movies: sampleMovies, pages: 108 };
    // },

    getTrending: (span, pageNum, pageSize) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(`${config.apiUrl}/api/movies/getTrending`, { span, pageNum, pageSize }, { headers });
    },

    // getRandom: () => {
    //     const sampleMovies = [];

    //     for (let i = 1; i <= 15; i++){
    //         sampleMovies.push({
    //             _id: i,
    //             title: `Movie ${i}`,
    //             description: 'abcd 1234',
    //             views: (Math.random() * 5000000).toFixed(0),
    //             likes: (Math.random() * 10000).toFixed(0),
    //             dislikes: (Math.random() * 10000).toFixed(0),
    //             createdOn: new Date(new Date().getMilliseconds() - (Math.random() * 1000*60*60*24*365*30).toFixed(0)),
    //             thumbnail: moviePlaceholder
    //         });
    //     }

    //     return sampleMovies;
    // },

    getRandom: (amount) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(`${config.apiUrl}/api/movies/getRandom/${amount}`, { headers });
    },

    // search: ({ query = '', sortMode = sortModes[0], includedTags = [], excludedTags = [], strictInclusion = true }, pageNum, pageSize) => {
    //     const sampleMovies = [];

    //     for (let i = 1; i <= 24; i++){
    //         sampleMovies.push({
    //             _id: i,
    //             title: `Movie ${pageNum}:${i} [${query}/${strictInclusion}] (${sortMode.text})`,
    //             description: 'abcd 1234',
    //             views: (Math.random() * 5000000).toFixed(0),
    //             likes: (Math.random() * 10000).toFixed(0),
    //             dislikes: (Math.random() * 10000).toFixed(0),
    //             createdOn: new Date(new Date().getMilliseconds() - (Math.random() * 1000*60*60*24*365*30).toFixed(0)),
    //             thumbnail: moviePlaceholder
    //         });
    //     }

    //     return { movies: sampleMovies, pages: 108 };
    // },

    // getMovie: (movieId) => {
    //     const sampleMovie = {
    //         _id: movieId,
    //         title: `Some Movie`,
    //         description: 'Pariatur exercitation id enim consequat voluptate. Ipsum anim Lorem in tempor velit adipisicing eu magna exercitation. Amet incididunt commodo dolor pariatur ex eu et fugiat in adipisicing sit ea. Labore voluptate pariatur nostrud velit ex. Consequat dolor in occaecat sit cupidatat pariatur labore ex aute culpa do do officia. Qui aliquip pariatur consequat fugiat reprehenderit est reprehenderit officia fugiat anim cupidatat est. Magna mollit enim excepteur veniam aliqua exercitation eu reprehenderit.',
    //         views: (Math.random() * 5000000).toFixed(0),
    //         likes: (Math.random() * 10000).toFixed(0),
    //         dislikes: (Math.random() * 10000).toFixed(0),
    //         createdOn: new Date(new Date().getMilliseconds() - (Math.random() * 1000*60*60*24*365*30).toFixed(0)),
    //         releasedOn: new Date(new Date().getMilliseconds() - (Math.random() * 1000*60*60*24*365*30).toFixed(0)),
    //         thumbnail: moviePlaceholder,
    //         mediapath: '',
    //         alternativeTitles: ['That Movie', 'With That Guy'],
    //         tags: [
    //             {_id: 1, name: 'action', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)},
    //             {_id: 3, name: 'comedy', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)},
    //             {_id: 5, name: 'drama', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)},
    //             {_id: 7, name: 'slice of life', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)}
    //         ],
    //         recomendations: [
    //             {_id: 1, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 2, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 3, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 4, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 5, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 6, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //             {_id: 7, title: 'Some rec', thumbnail: moviePlaceholder, views: (Math.random() * 5000000).toFixed(0)},
    //         ]
    //     }

    //     return sampleMovie;
    // },

    search: ({ query = '', sortMode = sortModes[0], includedTags = [], excludedTags = [], strictInclusion = true }, pageNum, pageSize) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(`${config.apiUrl}/api/movies/searchMovies`, 
            { 
                filters: {
                    query,
                    sortMode,
                    includedTags: includedTags.some(t => !!t.name) ? includedTags.map(t => t.name) : includedTags,
                    excludedTags: excludedTags.some(t => !!t.name) ? excludedTags.map(t => t.name) : excludedTags,
                    strictInclusion
                }, 
                pageNum, 
                pageSize 
            }, { headers });
    },

    getMovie: (movieId) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(`${config.apiUrl}/api/movies/getMovie/${movieId}`, { headers });
    },

    getMovies: () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(`${config.apiUrl}/api/movies/getMovies`, { headers });
    },

    getComments: (movieId) => {
        const sampleComments = [];
        const sampleContent = [
            'Tempor laboris exercitation sint tempor aliquip officia. Officia do nostrud duis eiusmod excepteur enim cillum nulla enim. Eiusmod officia dolor veniam exercitation cillum.',
            'In officia magna sint dolore. Esse reprehenderit magna et pariatur in minim nostrud aliquip dolor aute cupidatat proident nulla irure. Adipisicing labore reprehenderit do duis. Irure aliquip veniam adipisicing ut ea ex do ea voluptate laborum in sint non.',
            'Ea eu et aute do proident magna mollit. Enim eu occaecat elit labore laborum Lorem consequat. Consequat id veniam irure quis in aute non et. Anim id enim ad consectetur aute voluptate consectetur duis aute ea aute. Dolore cillum exercitation non ex ipsum ipsum qui commodo occaecat sint enim occaecat. Aliquip officia deserunt sunt proident minim minim anim id sunt mollit qui sit et.',
            'Laborum aliquip incididunt voluptate ea elit ut. Laborum irure esse ut cupidatat minim. Esse ullamco incididunt qui anim dolore. Reprehenderit aliquip officia ipsum aliquip sunt excepteur ullamco ea occaecat.',
            'Ea cupidatat elit irure cillum. Laboris in officia veniam eiusmod non. Amet ea magna ex aute amet exercitation eu ut laboris aute non ipsum laboris. Magna minim aliqua laboris magna nostrud eiusmod ex excepteur consectetur magna velit elit cupidatat.',
            'Amet laboris adipisicing minim amet minim sunt ea occaecat esse et mollit Lorem. Culpa duis ipsum aute irure ad exercitation ex ea. Excepteur ut magna adipisicing Lorem quis ex reprehenderit quis reprehenderit do. Sit id aliqua consequat nulla dolore. Do dolor cillum adipisicing exercitation ex duis adipisicing nulla mollit dolore Lorem nostrud.',
            'Consequat laborum amet cillum voluptate officia aliquip amet laborum nulla nostrud. Ad ut mollit non magna ex. Tempor laboris eiusmod aute incididunt ex duis Lorem nulla reprehenderit labore nulla excepteur.',
            'Occaecat in laborum excepteur officia est dolor irure incididunt commodo. Occaecat et Lorem amet consequat tempor et sit labore consequat. Excepteur excepteur do irure occaecat commodo aute eu reprehenderit est nostrud labore.',
            'Id duis culpa voluptate est cillum aute anim.',
            'Non ex pariatur aliquip nisi nulla.',
            'Excepteur reprehenderit minim enim officia nulla tempor anim.',
            'Eiusmod mollit consequat ex fugiat deserunt occaecat eiusmod est dolor.',
            'Incididunt minim occaecat enim pariatur incididunt tempor est nulla aliquip dolore ad sit.',
            'Tempor ullamco ex nisi deserunt amet est incididunt anim.',
            'Ullamco incididunt exercitation minim elit consequat et est dolore dolore excepteur sint non.',
            'Excepteur eiusmod nisi veniam eu labore culpa nulla.',
            'Reprehenderit velit eiusmod dolor duis pariatur veniam elit dolore veniam voluptate dolore nulla cillum magna.',
            'Cupidatat tempor aliquip esse quis eu exercitation velit.',
            'Lorem enim quis nulla minim ipsum esse dolore. Minim ipsum dolore minim adipisicing Lorem occaecat labore ullamco ullamco est magna adipisicing est. Voluptate consequat reprehenderit non officia pariatur quis consectetur sit adipisicing veniam adipisicing non commodo. Cillum fugiat qui Lorem nostrud duis esse magna. Incididunt minim est excepteur laboris Lorem sit occaecat ex laboris proident.',
            'Velit excepteur Lorem ad in consequat adipisicing. Mollit cupidatat ex esse eu officia ad aliquip. Amet elit quis ad ad laborum. Sunt occaecat non excepteur ullamco est occaecat ea eiusmod ullamco.',
            'Ad aute commodo amet in mollit do eu quis fugiat voluptate pariatur duis ad deserunt. Labore ea tempor aliqua id ea commodo do aute duis. Deserunt proident ipsum non cillum nulla excepteur do.'
        ]

        for(let i = 1; i <= 30; i++){
            let userId = (Math.random() * 1000).toFixed(0);
            sampleComments.push({
                _id: i,
                content: sampleContent[(Math.random() * sampleContent.length).toFixed(0)],
                createdOn: new Date(new Date().getMilliseconds() - (Math.random() * 1000*60*60*24*365*30).toFixed(0)),
                poster: {
                    _id: userId,
                    username: `User ${userId}`,
                    avatar: userPlaceholder
                }
            })
        }

        return sampleComments;
    },

    // getTags: () => {
    //     const sampleTags = [];

    //     sampleTags.push({_id: 1, name: 'action', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 2, name: 'adventure', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 3, name: 'comedy', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 4, name: 'fantasy', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 5, name: 'drama', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 6, name: 'horror', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})
    //     sampleTags.push({_id: 7, name: 'slice of life', description: `a tag's description`, movieCount: (Math.random() * 1000).toFixed(0)})

    //     return sampleTags;
    // },
    getTags: () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(`${config.apiUrl}/api/movies/getTags`, { headers });
    },

    removeTag: (tagId) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            }
            return axios.delete(`${config.apiUrl}/api/movies/deleteTag/${tagId}`, { headers });
        } catch(e) {
            console.error(e);
        }
    },

    removeMovie: (movieId) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            }
            return axios.delete(`${config.apiUrl}/api/movies/deleteMovie/${movieId}`, { headers });
        } catch(e) {
            console.error(e);
        }
    },

    ///////////////////////// ADD ////////////////////////////////

    addTag: (name, description, thumbnail) => {
        try {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('thumbnail', thumbnail, `${name}_thumbnail_${thumbnail.name}`);

            return axios.post(`${config.apiUrl}/api/movies/addTag`, formData);
        } catch(e) {
            console.error(e);
        }
    },

    addMovie: (title, description, tags, releaseDate, altTitles, thumbnail, movieVideo) => {
        try {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('releaseDate', releaseDate);
            formData.append('alternativeTitles', altTitles);
            formData.append('thumbnail', thumbnail, `${title}_thumbnail_${thumbnail.name}`);
            formData.append('movieVideo', movieVideo, `${title}_video_${movieVideo.name}`);

            return axios.post(`${config.apiUrl}/api/movies/addMovie`, formData);
        } catch(e) {
            console.error(e);
        }
    },
}

export default MoviesService;