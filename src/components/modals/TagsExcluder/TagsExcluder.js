import React, { useState, useEffect, useContext } from 'react';
import './TagsExcluder.sass';
import MoviesService from '../../../services/movies.service';
import { ModalsContext } from '../../../context/modals.context';
import { FiltersContext } from '../../../context/filters.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function TagsExcluder() {

    const { modal, modals, openModal, closeModal } = useContext(ModalsContext);
    const { filters, setExcludedTags, resetExcludedTags } = useContext(FiltersContext);
    
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState(filters.excludedTags);

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

    useEffect(() => {
        setSelectedTags(filters.excludedTags);
    }, [modal]);

    const onTagClicked = (tag) => {
        if(selectedTags.some(t => t._id == tag._id)) setSelectedTags(prev => prev.filter(t => t._id != tag._id))
        else setSelectedTags(prev => [...prev, tag]);
    }

    const close = () => {
        setSelectedTags(filters.excludedTags);
        closeModal();
    }

    const apply = () => {
        setExcludedTags(selectedTags);
        close();
        
    }

    const reset = () => {
        resetExcludedTags();
        close();
    }

    return (
        <div className="tags-excluder">
            <div className="head">
                <button className="close-btn" onClick={close}><FontAwesomeIcon icon={faTimes} /></button>
                <span className="title">Tags</span>
                <button className="reset-btn" onClick={reset}>RESET</button>
            </div>
            <div className="body">
                <div className="tags">
                    <div className="name">Blacklist</div>
                    <div className="description">Exclude videos in search results that has any of the selected tags below:</div>
                    <div className="tags-list">
                        {tags && tags.map(t => (
                            <button 
                                key={t._id}
                                className={`tag ${selectedTags.some(st => st._id == t._id) ? 'tag-selected' : ''}`}
                                onClick={() => onTagClicked(t)}
                            >{t.name}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom">
                <button className="cancel-btn" onClick={close}>CANCEL</button>
                <button className="apply-btn" onClick={apply}>APPLY</button>
            </div>
        </div>
    )
}
