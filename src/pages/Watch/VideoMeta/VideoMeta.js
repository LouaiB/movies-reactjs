import React from 'react';
import './VideoMeta.sass';
import { useHistory } from 'react-router-dom';
import * as config from '../../../config.json';

export default function VideoMeta({movie}) {

    const history = useHistory();

    return (
        <>
            <div className="top">
                <div className="thumbnail">
                    <img src={`${config.apiUrl}/${movie.thumbnail}`} />
                </div>
                <div className="info">
                    <div className="snippet">
                        <span className="head">Release Date</span>
                        <span className="content">{new Date(movie.releasedOn).toLocaleDateString()}</span>
                    </div>
                    <div className="snippet">
                        <span className="head">Upload Date</span>
                        <span className="content">{new Date(movie.createdOn).toLocaleDateString()}</span>
                    </div>
                    <div className="snippet">
                        <span className="head">Alternative Titles</span>
                        <span className="content">
                            {movie.alternativeTitles && movie.alternativeTitles.length > 0 
                                ? movie.alternativeTitles.join(', ')
                                : 'No alternative titles'
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="tags">
                    {movie.tags && movie.tags.map(tag => (
                        <button key={tag._id} className="tag" onClick={() => history.push(`/browse/${tag.name}`)}>{tag.name}</button>
                    ))}
                </div>
                <p className="description-text">{movie.description}</p>
            </div>
        </>
    )
}
