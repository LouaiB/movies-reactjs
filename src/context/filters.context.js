import React, { Component } from 'react';
import * as sortModes from '../json/sort-modes.json';

const FiltersContext = React.createContext();

class FiltersProvider extends Component {

    // Context state
    defaultFilters = {
        query: '',
        includedTags: [],
        excludedTags: [],
        strictInclusion: true,
        sortMode: sortModes[0]
    }

    state = {
        filters: this.defaultFilters
    }

    // Methods to update state
    resetFilters = () => {
        this.setState(prev => ({filters: {...this.defaultFilters, query: prev.filters.query}}));
    }

    setQuery = (query) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, query: query }}));
    }
    resetQuery = (query) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, query: this.defaultFilters.query }}));
    }

    setIncludedTags = (tags) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, includedTags: tags }}));
    }
    resetIncludedTags = () => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, includedTags: this.defaultFilters.includedTags }}));
    }

    setExcludedTags = (tags) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, excludedTags: tags }}));
    }
    resetExcludedTags = () => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, excludedTags: this.defaultFilters.excludedTags }}));
    }

    setStrictInclusion = (isStrictInclusion) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, strictInclusion: isStrictInclusion }}));
    }
    resetStrictInclusion = () => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, strictInclusion: this.defaultFilters.strictInclusion }}));
    }

    setSortMode = (sortMode) => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, sortMode: sortMode }}));
    }
    resetSortMode = () => {
        this.setState((prevState) => ({ ...prevState, filters: { ...prevState.filters, sortMode: this.defaultFilters.sortMode }}));
    }

    render() {
        const { children } = this.props;
        const { filters } = this.state;
        const { 
            resetFilters,
            setQuery,
            resetQuery,
            setIncludedTags,
            resetIncludedTags,
            setExcludedTags,
            resetExcludedTags,
            setStrictInclusion,
            resetStrictInclusion,
            setSortMode,
            resetSortMode
        } = this;

        return (
            <FiltersContext.Provider
                value={{
                    filters,
                    resetFilters,
                    setQuery,
                    resetQuery,
                    setIncludedTags,
                    resetIncludedTags,
                    setExcludedTags,
                    resetExcludedTags,
                    setStrictInclusion,
                    resetStrictInclusion,
                    setSortMode,
                    resetSortMode,
                    sortModes
                }}
            >
                {children}
            </FiltersContext.Provider>
        )
    }
}

export { FiltersProvider, FiltersContext };