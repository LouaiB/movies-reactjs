import React, { useState, useEffect, useContext } from 'react';
import './SearchSort.sass';
import MoviesService from '../../../services/movies.service';
import { ModalsContext } from '../../../context/modals.context';
import { FiltersContext } from '../../../context/filters.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ToggleSwitch from '../../controls/ToggleSwitch/ToggleSwitch';

export default function SearchSort() {

    const { modal, modals, openModal, closeModal } = useContext(ModalsContext);
    const { filters, sortModes, setSortMode, resetSortMode } = useContext(FiltersContext);
    
    const [isStrictInclusion, setIsStrictInclusion] = useState(filters.strictInclusion);

    const onModeSelect = (mode) => {
        setSortMode(mode);
        closeModal();
    }

    return (
        <div className="search-sort">
            {sortModes && sortModes.default.map(sortMode => (
                <div 
                    className={`mode ${filters.sortMode.code == sortMode.code ? 'chosen' : ''}`} 
                    onClick={() => onModeSelect(sortMode)}
                >
                    {sortMode.text}
                </div>
            ))}
        </div>
    )
}
