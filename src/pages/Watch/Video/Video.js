import React from 'react';
import './Video.sass';
import * as config from '../../../config.json';

export default function Watch({movie}) {

    return (
        <div className="video">
            <video src={`${config.apiUrl}/${movie.mediapath}`} controls></video>
        </div>
    )
}
