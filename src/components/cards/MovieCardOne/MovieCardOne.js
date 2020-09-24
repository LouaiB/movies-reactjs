import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCardOne.sass';
import { Link } from 'react-router-dom';
import * as config from '../../../config.json';

export default function MovieCardOne({movie}) {
    return (
        <Link className="link" to={`/movie/${movie._id}`}>
            <div className="movie-card-one">
                <img className="thumbnail" src={`${config.apiUrl}/${movie.thumbnail}`} />
                <div className="body">
                    <span className="title">{movie.title}</span>
                    <span className="views"><FontAwesomeIcon icon={faEye} /> {movie.views}</span>
                </div>
            </div>
        </Link>
    )
}
