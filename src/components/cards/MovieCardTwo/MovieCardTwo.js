import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './MovieCardTwo.sass';
import * as config from '../../../config.json';

export default function MovieCardTwo({movie}) {

    return (
        <Link className="card-link" to={`/movie/${movie._id}`}>
            <div className="movie-card-two">
                <img className="thumbnail" src={`${config.apiUrl}/${movie.thumbnail}`} />
                <div className="body">
                    <div className="left">
                        <FontAwesomeIcon icon={faHeart} className="icon" />
                        <span className="rating">{movie.likes.length}</span>
                    </div>
                    <div className="right">
                        <span className="title">{movie.title}</span>
                        <div className="bottom">
                            <span className="created-on">{new Date(movie.releasedOn).toLocaleDateString()}</span>
                            <span className="views"><FontAwesomeIcon icon={faEye} /> {movie.views}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
