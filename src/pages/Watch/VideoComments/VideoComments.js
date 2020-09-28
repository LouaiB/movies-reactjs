import React, { useEffect, useState } from 'react';
import './VideoComments.sass';
import MoviesService from '../../../services/movies.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function VideoComments({movie}) {

    const [comments, setComments] = useState([]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const sampleComments = MoviesService.getComments(movie._id);
        if(sampleComments.length > 0) {
            let firstComment = sampleComments.reduce((p, v) => p.createdOn < v.createdOn ? p : v);
            setWinner(firstComment);
        }
        setComments(sampleComments);
    }, []);

    return (
        <>
            <span className="comments-count">{comments.length} Comments</span>
            <div className="comments">
                {comments && comments.map(comment => (
                    <div className="comment" key={comment._id}>
                        <div className="left">
                            <img src={comment.poster.avatar} />
                            <div className="line"></div>
                            {winner && winner.poster._id == comment.poster._id && (
                                <>
                                    <div className="winner">
                                        <FontAwesomeIcon className="icon" icon={faTrophy} />
                                        <span>FIRST</span>
                                    </div>
                                    <div className="line"></div>
                                </>
                            )}
                        </div>
                        <div className="right">
                            <span className="username">{comment.poster.username}</span>
                            <span className="created-on">commented on {comment.createdOn.toLocaleDateString()}</span>
                            <span className="content">{comment.content}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
