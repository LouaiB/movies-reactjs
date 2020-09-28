import React, { useEffect, useState } from 'react';
import MovieCardOne from '../../../components/cards/MovieCardOne/MovieCardOne';
import SimplePagination from '../../../components/controls/SimplePagination/SimplePagination';
import './TrendingSnip.sass';
import SnipsService from '../../../services/snips.service';

export default function TrendingSnip() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = () => {
        SnipsService.getTrending().then(response => {
            setMovies(response.data.movies);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
    }

    return (
        <div className="trending-snip">
            <SimplePagination title={'Trending'} subtitle={'Past 30 days'} fullLink={'/trending'}>
                {movies.map(movie => (
                    <MovieCardOne key={movie._id} movie={movie} />
                ))}
            </SimplePagination>
        </div>
    )
}
