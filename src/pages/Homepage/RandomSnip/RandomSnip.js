import React, { useEffect, useState } from 'react';
import moviePlaceholder from '../../../assets/movie.png';
import MovieCardOne from '../../../components/cards/MovieCardOne/MovieCardOne';
import SimplePagination from '../../../components/controls/SimplePagination/SimplePagination';
import './RandomSnip.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import SnipsService from '../../../services/snips.service';

export default function RandomSnip() {
    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchRandom();
    }, []);

    const fetchRandom = () => {
        SnipsService.getRandom().then(response => {
            setMovies(response.data.movies);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
    }

    return (
        <div className="random-snip">
            <SimplePagination title={'Random'} fullLink={'/random'} fullLinkText={<FontAwesomeIcon icon={faRandom} />}>
                {movies.map(movie => (
                    <MovieCardOne key={movie._id} movie={movie} />
                ))}
            </SimplePagination>
        </div>
    )
}
