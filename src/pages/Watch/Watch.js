import React, { useEffect, useState } from 'react';
import './Watch.sass';
import { useParams } from 'react-router-dom';
import MoviesService from '../../services/movies.service';

import Video from './Video/Video';
import VideoInfo from './VideoInfo/VideoInfo';
import VideoMeta from './VideoMeta/VideoMeta';
import VideoRecomendations from './VideoRecomendations/VideoRecomendations';
import VideoComments from './VideoComments/VideoComments';

export default function Watch() {

    const { id } = useParams(null);

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    const fetchMovie = (movieId) => {
        MoviesService.getMovie(movieId).then(response => {
            console.log(response);
            setMovie({
                ...response.data.movie, 
                tags: response.data.tags, 
                recomendations: response.data.recomendations
            });
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        })
    }

    return (
        <div className="watch-page">
            {movie && 
            <>
                <div className="video-area">
                    <Video movie={movie} />
                </div>
                <div className="summary-area">
                    <VideoInfo movie={movie} />
                </div>
                <div className="description-area">
                    <VideoMeta movie={movie} />
                </div>
                <div className="recomendations-area">
                    <VideoRecomendations movie={movie} />
                </div>
                <div className="comments-area">
                    <VideoComments movie={movie} />
                </div>
            </>}
        </div>
    )
}
