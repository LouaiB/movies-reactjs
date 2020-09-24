import React from 'react';
import './VideoRecomendations.sass';
import { useHistory } from 'react-router-dom';
import * as config from '../../../config.json';

export default function VideoRecomendations({movie}) {

    const history = useHistory();

    return (
        <>
            <span className="area-title">Other Movies</span>
            {movie.recomendations && movie.recomendations.map(rec => (
                <div className="rec" onClick={() => history.push(`/movie/${rec._id}`)}>
                    <div className="thumbnail">
                        <img src={`${config.apiUrl}/${rec.thumbnail}`} />
                    </div>
                    <div className="info">
                        <span className="title">{rec.title}</span>
                        <span className="views">{rec.views} views</span>
                    </div>
                </div>
            ))}
        </>
    )
}
