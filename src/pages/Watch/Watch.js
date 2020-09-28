import React, { useEffect, useState } from 'react';
import './Watch.sass';
import { useParams } from 'react-router-dom';
import MoviesService from '../../services/movies.service';
import loaderGif from '../../assets/loader.gif';

import Video from './Video/Video';
import VideoInfo from './VideoInfo/VideoInfo';
import VideoMeta from './VideoMeta/VideoMeta';
import VideoRecomendations from './VideoRecomendations/VideoRecomendations';
import VideoComments from './VideoComments/VideoComments';
import ErrorBoundary from '../../utils/ErrorBoundary/errorBoundary';

export default function Watch() {

    const { id } = useParams(null);

    const [movie, setMovie] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    const fetchMovie = (movieId) => {
        setNotFound(false);
        setIsLoading(true);
        MoviesService.getMovie(movieId).then(response => {
            console.log(response);
            setMovie({
                ...response.data.movie, 
                tags: response.data.tags, 
                recomendations: response.data.recomendations
            });
        }).catch(e => {
            console.error(e);
            setNotFound(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
        {movie && 
            (<div className="watch-page">
                <div className="video-area">
                    <Video movie={movie} />
                </div>
                <div className="summary-area">
                    <ErrorBoundary>
                        <VideoInfo movie={movie} setMovie={setMovie} />
                    </ErrorBoundary>
                </div>
                <div className="description-area">
                    <ErrorBoundary>
                        <VideoMeta movie={movie} />
                    </ErrorBoundary>
                </div>
                <div className="recomendations-area">
                    <ErrorBoundary>
                        <VideoRecomendations movie={movie} />
                    </ErrorBoundary>
                </div>
                <div className="comments-area">
                    <ErrorBoundary>
                        <VideoComments movie={movie} />
                    </ErrorBoundary>
                </div>
            </div>
        )}
        {notFound && 
        <>
            <div className="movie-not-found">
                <h1>404</h1>
                <span>requested movie not found</span>
            </div>
        </>}
        {isLoading && 
            <div className="watch-loader">
                <img src={loaderGif} />
            </div>
        }
        </>
    )
}
