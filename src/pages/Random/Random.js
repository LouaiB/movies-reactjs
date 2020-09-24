import React, { useState, useEffect } from 'react';
import MovieCardTwo from '../../components/cards/MovieCardTwo/MovieCardTwo';
import MoviesService from '../../services/movies.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import './Random.sass';

export default function Random() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getRandom();
    }, []);

    const getRandom = () => {
        MoviesService.getRandom(20).then(response => {
            setMovies(response.data.movies);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
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
            <div class="random-movies">
                {movies && movies.map(m => (
                    <MovieCardTwo key={m._id} movie={m} />
                ))}
            </div>
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
