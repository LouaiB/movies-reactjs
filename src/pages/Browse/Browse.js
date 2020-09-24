import React, { useState, useEffect } from 'react';
import './Browse.sass';
import PageCards from './PageCards/PageCards';
import { Link } from 'react-router-dom';
import MoviesService from '../../services/movies.service';
import TagCardOne from '../../components/cards/TagCardOne/TagCardOne';

export default function Browse() {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = () => {
        MoviesService.getTags().then(response => {
            setTags(response.data.tags);
        }).catch(e => {
            alert(e.error.message);
        });
    }

    return (
        <div className="browse-page">
            <PageCards />
            <div className="tags-section">
                <div className="heading">
                    <div className="left">
                        <span>CATEGORIES</span>
                        <span>TAGS</span>
                    </div>
                    <div className="right">
                        <span>Want to search with multiple tags? Use our <Link to="/search" className="primary-color link">Search page</Link>!</span>
                    </div>
                </div>
                <div className="tags">
                    {tags && tags.map(t => (
                        <TagCardOne key={t._id} tag={t} />
                    ))}
                </div>
            </div>
        </div>
    )
}
