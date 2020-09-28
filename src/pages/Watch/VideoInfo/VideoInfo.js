import React, { useContext } from 'react';
import './VideoInfo.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/user.context';
import MoviesService from '../../../services/movies.service';

export default function VideoInfo({movie, setMovie}) {

    const { user } = useContext(UserContext);

    const onLikeClick = () => {
        if(user && user.userId){
            if(!movie.likes.includes(user.userId)){
                MoviesService.addLike(movie._id).then(response => {
                    setMovie(prev => ({...prev, likes: response.data.movie.likes}));
                    setMovie(prev => ({...prev, dislikes: response.data.movie.dislikes}));
                }).catch(err => {
                    console.error(err);
                    alert(err.error.message);
                });
            } else {
                MoviesService.removeLike(movie._id).then(response => {
                    setMovie(prev => ({...prev, likes: response.data.movie.likes}));
                    setMovie(prev => ({...prev, dislikes: response.data.movie.dislikes}));
                }).catch(err => {
                    console.error(err);
                    alert(err.error.message);
                });
            }
        }
    }

    const onDislikeClick = () => {
        if(user && user.userId){
            if(!movie.dislikes.includes(user.userId)){
                MoviesService.addDislike(movie._id).then(response => {
                    setMovie(prev => ({...prev, likes: response.data.movie.likes}));
                    setMovie(prev => ({...prev, dislikes: response.data.movie.dislikes}));
                }).catch(err => {
                    console.error(err);
                    alert(err.error.message);
                });
            } else {
                MoviesService.removeDislike(movie._id).then(response => {
                    setMovie(prev => ({...prev, likes: response.data.movie.likes}));
                    setMovie(prev => ({...prev, dislikes: response.data.movie.dislikes}));
                }).catch(err => {
                    console.error(err);
                    alert(err.error.message);
                });
            }
        }
    }

    return (
        <>
            <span className="title">{movie.title}</span>
            <span className="views">{movie.views} views</span>
            <div className="controls">
                <button 
                    className={`heart-btn ${user && user.userId && movie.likes.includes(user.userId) ? 'active' : ''}`} 
                    onClick={onLikeClick}
                >
                    <FontAwesomeIcon className="icon" icon={faHeart} />
                    <span className="text">{movie.likes.length}</span>
                </button>
                <button 
                    className={`heart-btn ${user && user.userId && movie.dislikes.includes(user.userId) ? 'active' : ''}`}
                    onClick={onDislikeClick}
                >
                    <FontAwesomeIcon className="icon" icon={faHeartBroken} />
                    <span className="text">{movie.dislikes.length}</span>
                </button>
            </div>
        </>
    )
}
