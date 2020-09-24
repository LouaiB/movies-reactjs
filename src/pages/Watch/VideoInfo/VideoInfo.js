import React from 'react';
import './VideoInfo.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function VideoInfo({movie}) {
    return (
        <>
            <span className="title">{movie.title}</span>
            <span className="views">{movie.views} views</span>
            <div className="controls">
                <button className="heart-btn">
                    <FontAwesomeIcon className="icon" icon={faHeart} />
                    <span className="text">{movie.likes.length}</span>
                </button>
                <button className="heart-btn">
                    <FontAwesomeIcon className="icon" icon={faHeartBroken} />
                    <span className="text">{movie.dislikes.length}</span>
                </button>
            </div>
        </>
    )
}
