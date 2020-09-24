import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import './TagCardOne.sass';
import { Link } from 'react-router-dom';
import * as config from '../../../config.json';

export default function TagCardOne({tag}) {
    return (
        <Link className="link" to={`/browse/${tag.name}`}>
            <div className="tag-card-one">
                <div className="tag-top" style={{backgroundImage: `url(${config.apiUrl}/${tag.thumbnail})`}}>
                    <img src={`${config.apiUrl}/${tag.thumbnail}`} className="thumbnail" />
                    <span className="name">{tag.name}</span>
                </div>
                <div className="tag-bottom">
                    <span className="description">{tag.description}</span>
                    <span className="movie-count"><FontAwesomeIcon icon={faVideo} className="icon" /> {tag.movieCount}</span>
                </div>
            </div>
        </Link>
    )
}
