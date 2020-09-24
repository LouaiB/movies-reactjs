import React, { useState, useEffect } from 'react';
import './AdminPanel.sass';
import MoviesService from '../../services/movies.service';
import * as config from '../../config.json';
import { useHistory } from 'react-router-dom';

export default function AdminPanel() {

    const history = useHistory();

    const [tags, setTags] = useState([]);
    const [movies, setMovies] = useState([]);

    const [tagName, setTagName] = useState('');
    const [tagDescription, setTagDescription] = useState('');
    const [tagThumbnail, setTagThumbnail] = useState(null);

    const [movieTitle, setMovieTitle] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieTags, setMovieTags] = useState('');
    const [movieReleaseDate, setMovieReleaseDate] = useState(Date.now);
    const [movieAltTitles, setMovieAltTitles] = useState('');
    const [movieThumbnail, setMovieThumbnail] = useState(null);
    const [movieVideo, setMovieVideo] = useState(null);


    useEffect(() => {
        fetchTags();
        fetchMovies();
    }, []);

    const fetchTags = () => {
        MoviesService.getTags().then(response => {
            setTags(response.data.tags);
        }).catch(e => {
            alert(e.error.message);
        });
    }

    const removeTag = (tagId) => {
        if(!window.confirm(`Are you sure you want to delete this tag?`)) return;
        MoviesService.removeTag(tagId).then(response => {
            fetchTags();
        }).catch(e => {
            alert(e.error.message);
        });
    }

    const fetchMovies = () => {
        MoviesService.getMovies().then(response => {
            setMovies(response.data.movies);
        }).catch(e => {
            alert(e.error.message);
        });
    }

    const removeMovie = (movieId) => {
        if(!window.confirm(`Are you sure you want to delete this movie?`)) return;
        MoviesService.removeMovie(movieId).then(response => {
            fetchMovies();
        }).catch(e => {
            alert(e.error.message);
        });
    }

    const onAddTagClicked = () => {
        MoviesService.addTag(tagName, tagDescription, tagThumbnail).then(response => {
            alert(response.data.message);
            setTagName('');
            setTagDescription('');
            setTagThumbnail(null);
        }).catch(e => {
            alert(e.error.message);
            if(e.mustLogin) history.push('/login');
        });
    }

    const onAddMovieClicked = () => {
        MoviesService.addMovie(movieTitle, movieDescription, movieTags, movieReleaseDate, movieAltTitles, movieThumbnail, movieVideo).then(response => {
            alert(response.data.message);
            setMovieTitle('');
            setMovieDescription('');
            setMovieTags('');
            setMovieReleaseDate(Date.now);
            setMovieAltTitles('');
            setMovieThumbnail(null);
            setMovieVideo(null);
            console.log('MOVIE THAT HAS BEEN ADDED:');
            console.log(response.data);
        }).catch(e => {
            alert(e.error.message);
            if(e.mustLogin) history.push('/login');
        });
    }

    return (
        <div className="admin-panel">
            <div className="add-tag">
                <h1>Add Tag</h1>
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" value={tagName} onChange={e => setTagName(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" value={tagDescription} onChange={e => setTagDescription(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Thumbnail</td>
                        <td><input type="file" onChange={e => setTagThumbnail(e.target.files[0])} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={onAddTagClicked}>Add Tag</button>
                        </td>
                    </tr>
                </table>
            </div>
            <hr />
            <div className="tags">
                <h1>Tags</h1>
                <button onClick={fetchTags}>Refresh</button>
                <ul>
                    {tags && tags.map(t => (
                        <li key={t._id}>
                            <img src={`${config.apiUrl}/${t.thumbnail}`} />
                            <span><span className="primary-color">{t.name}</span> ({t.description})</span>
                            <button onClick={() => removeTag(t._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="add-movie">
                <h1>Add Movie</h1>
                <table>
                    <tr>
                        <td>Title</td>
                        <td><input type="text" value={movieTitle} onChange={e => setMovieTitle(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" value={movieDescription} onChange={e => setMovieDescription(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Tags [ separate by | ]</td>
                        <td><input type="text" value={movieTags} onChange={e => setMovieTags(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Release Date</td>
                        <td><input type="date" onChange={e => setMovieReleaseDate(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Alternative Titles [ separate by | ]</td>
                        <td><input type="text" value={movieAltTitles} onChange={e => setMovieAltTitles(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Thumbnail</td>
                        <td><input type="file" onChange={e => setMovieThumbnail(e.target.files[0])} /></td>
                    </tr>
                    <tr>
                        <td>Video File</td>
                        <td><input type="file" onChange={e => setMovieVideo(e.target.files[0])} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={onAddMovieClicked}>Add Movie</button>
                        </td>
                    </tr>
                </table>
            </div>
            <hr />
            <div className="movies">
                <h1>Movies</h1>
                <button onClick={fetchMovies}>Refresh</button>
                <div className="movies-list">
                    {movies && movies.map(m => (
                        <div className="movie" key={m._id}>
                            {/* <img src={`${config.apiUrl}/${m.thumbnail}`} /> */}
                            <span className="primary-color">{m.title}</span>
                            <button onClick={() => removeMovie(m._id)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
