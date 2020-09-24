import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './GlobalSearchInput.sass';
import { FiltersContext } from '../../../context/filters.context';

export default function GlobalSearchInput() {

    const history = useHistory();

    const { filters, setQuery } = useContext(FiltersContext);

    const [focused, setFocused] = useState(false);
    const [localQuery, setLocalQuery] = useState(null);
    const timeout = useRef(null);

    const onFocusHandler = () => {
        setFocused(true);
        history.push('/search');
    }

    const onBlurHandler = () => {
        setFocused(false);
    }

    useEffect(() => {
        setQuery(localQuery);
    }, [localQuery]);

    return (
        <div id="global-search" className={`global-search ${focused ? 'global-search-focused' : ''}`}>
            <input 
                className="search-input"
                type="text"
                placeholder="Search"
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onInput={e => setLocalQuery(e.target.value)}
                />
        </div>
    )
}
