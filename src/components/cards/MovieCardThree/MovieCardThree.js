import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCardThree.sass';
import { Link } from 'react-router-dom';
import * as config from '../../../config.json';

export default function MovieCardThree({movie}) {
    return (
        <Link className="link" to={`/movie/${movie._id}`}>
            <div className="movie-card-three">
                <img className="thumbnail" src={`${config.apiUrl}/${movie.thumbnail}`} />
                <div className="body">
                    <span className="title">{movie.title}</span>
                </div>
            </div>
        </Link>
    )
}
