import React, { useState, useEffect, useContext } from 'react';
import './TagsSelector.sass';
import MoviesService from '../../../services/movies.service';
import { ModalsContext } from '../../../context/modals.context';
import { FiltersContext } from '../../../context/filters.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from '../../controls/ToggleSwitch/ToggleSwitch';

export default function TagsSelector() {

    const { modal, modals, openModal, closeModal } = useContext(ModalsContext);
    const { filters, setIncludedTags, resetIncludedTags, setStrictInclusion, resetStrictInclusion } = useContext(FiltersContext);
    
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState(filters.includedTags);
    const [isStrictInclusion, setIsStrictInclusion] = useState(filters.strictInclusion);

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
        setSelectedTags(filters.includedTags);
        setIsStrictInclusion(filters.strictInclusion);
    }, [modal]);

    const onTagClicked = (tag) => {
        if(selectedTags.some(t => t._id == tag._id)) setSelectedTags(prev => prev.filter(t => t._id != tag._id))
        else setSelectedTags(prev => [...prev, tag]);
    }

    const onBroadToggled = () => {
        setIsStrictInclusion(prev => !prev);
    }

    const close = () => {
        setSelectedTags(filters.includedTags);
        setIsStrictInclusion(filters.strictInclusion);
        closeModal();
    }

    const apply = () => {
        setIncludedTags(selectedTags);
        setStrictInclusion(isStrictInclusion);
        close();
    }

    const reset = () => {
        resetIncludedTags();
        resetStrictInclusion();
        close();
    }

    return (
        <div className="tags-selector">
            <div className="head">
                <button className="close-btn" onClick={close}><FontAwesomeIcon icon={faTimes} /></button>
                <span className="title">Tags</span>
                <button className="reset-btn" onClick={reset}>RESET</button>
            </div>
            <div className="body">
                <div className="broad">
                    <div className="control">
                        <span className="name">Broad Matches</span>
                        <ToggleSwitch onToggle={onBroadToggled} isOn={!isStrictInclusion} />
                    </div>
                    <span className="description">More results, but less accurate. Videos will match if they contain any selected tag rather than all selected tags.</span>
                </div>
                <div className="tags">
                    <div className="name">Include Tags</div>
                    <div className="description">
                        { isStrictInclusion 
                            ? 'Find videos that has all selected tags below:' 
                            : 'Find videos that has any of the selected tags below:'
                        }
                    </div>
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
