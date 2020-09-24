import React, { useEffect, useState } from 'react';
import MovieCardOne from '../../../components/cards/MovieCardOne/MovieCardOne';
import SimplePagination from '../../../components/controls/SimplePagination/SimplePagination';
import './RecentUploadsSnip.sass';
import SnipsService from '../../../services/snips.service';

export default function RecentUploadsSnip() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchRecentUploads();
    }, []);

    const fetchRecentUploads = () => {
        SnipsService.getRecentUploads().then(response => {
            setMovies(response.data.movies);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
    }

    return (
        <div className="recent-uploads-snip">
            <SimplePagination title={'Recent Uploads'} subtitle={'5 hours ago'} fullLink={'/recent'}>
                {movies.map(movie => (
                    <MovieCardOne key={movie._id} movie={movie} />
                ))}
            </SimplePagination>
        </div>
    )
}
