import React, { useState, useEffect } from 'react';
import MovieCardTwo from '../../components/cards/MovieCardTwo/MovieCardTwo';
import MoviesService from '../../services/movies.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import './Random.sass';
import ErrorBoundary from '../../utils/ErrorBoundary/errorBoundary';
import loaderGif from '../../assets/loader.gif';

export default function Random() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getRandom();
    }, []);

    const getRandom = () => {
        setIsLoading(true);
        setMovies([]);
        setTimeout(() => {

            MoviesService.getRandom(20).then(response => {
                setMovies(response.data.movies);
            }).catch(e => {
                alert(e.error.message);
                console.error(e);
            }).finally(() => {
                setIsLoading(false);
            });
        }, 1000)
    }

    return (
        <div className="random-page">
            <div className="randomizer">
                <button 
                    className="btn btn-lg active"
                    onClick={getRandom}
                    >
                        <FontAwesomeIcon icon={faRandom} /> RANDOMIZE
                    </button>
            </div>
            <div className="random-movies">
                {movies && movies.map(m => (
                    <ErrorBoundary key={m._id}>
                        <MovieCardTwo movie={m} />
                    </ErrorBoundary>
                ))}
            </div>
            {isLoading && 
                <div className="loader">
                    <img src={loaderGif} />
                </div>
            }
            <div className="randomizer marginalize">
                <button 
                    className="btn btn-lg active"
                    onClick={getRandom}
                    >
                        <FontAwesomeIcon icon={faRandom} /> RANDOMIZE
                    </button>
            </div>
        </div>
    )
}
