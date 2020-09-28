import React, { useEffect, useState, useContext } from 'react';
import './Search.sass';
import MoviesService from '../../services/movies.service';
import FullPagination from '../../components/controls/FullPagination/FullPagination';
import { ModalsContext } from '../../context/modals.context';
import { FiltersContext } from '../../context/filters.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faSort, faBan, faEraser } from '@fortawesome/free-solid-svg-icons';
import ErrorBoundary from '../../utils/ErrorBoundary/errorBoundary';
import loaderGif from '../../assets/loader.gif';

export default function Search() {

    const { openModal, setModal, modals } = useContext(ModalsContext);
    const { filters, resetFilters } = useContext(FiltersContext);

    const [movies, setMovies] = useState();
    const [pages, setPages] = useState();
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [timeoutRef, setTimeoutRef] = useState(null);
    const pageSize = 24;

    useEffect(() => {
        setPageNum(0);
        getPage(pageNum, pageSize);
        console.log('Filter change in SEARCH PAGE');
    }, [filters]);

    const getPage = (pageNum, pageSize) => {
        setIsLoading(true);
        if(timeoutRef) clearTimeout(timeoutRef);
        const tmr = setTimeout(() => {

            MoviesService.search(filters, pageNum, pageSize).then(response => {
                setMovies(response.data.movies);
                setPages(response.data.pages);
                console.log(response);
            }).catch(e => {
                alert(e.error.message);
                console.error(e);
            }).finally(() => {
                setIsLoading(false);
            });
        }, 3000)
        setTimeoutRef(tmr);
    }

    const openIncludedTagsModal = () => {
        setModal(modals.INCLUDE_TAGS);
        openModal();
    }

    const openExcludedTagsModal = () => {
        setModal(modals.EXCLUDE_TAGS);
        openModal();
    }

    const openSearchSortModal = () => {
        setModal(modals.SEARCH_SORT);
        openModal();
    }

    const resetAll = () => {
        resetFilters();
    }

    return (
        <div className="search-page">
            <ErrorBoundary>
                <div className="filters">
                    <div className="left">
                        <button 
                            className="filter-btn"
                            onClick={openIncludedTagsModal}
                        >
                            <FontAwesomeIcon icon={faTag} className="filter-icon" />
                            <span className="btn-text">Tags</span>
                            {filters.includedTags && filters.includedTags.length > 0 && <span className="filter-count">{filters.includedTags.length}</span>}
                        </button>
                        <button
                            className="filter-btn" 
                            onClick={openExcludedTagsModal}
                            >
                                <FontAwesomeIcon icon={faBan} className="filter-icon" />
                                <span className="btn-text">Blacklist</span>
                                {filters.excludedTags && filters.excludedTags.length > 0 && <span className="filter-count">{filters.excludedTags.length}</span>}
                            </button>
                    </div>
                    <div className="right">
                        <button 
                            className="filter-btn" 
                            onClick={resetAll}
                        >
                            <FontAwesomeIcon icon={faEraser} className="filter-icon" />
                            <span className="btn-text">Reset All</span>
                        </button>
                        <button 
                            className="filter-btn" 
                            onClick={openSearchSortModal}
                        >
                            <FontAwesomeIcon icon={faSort} className="filter-icon" />
                            <span className="btn-text">Sort</span>
                        </button>
                    </div>
                </div>
            </ErrorBoundary>
            <FullPagination 
                className="paginator"
                getPage={getPage}
                movies={movies}
                pages={pages}
                pageNum={pageNum}
                setPageNum={setPageNum}
                pageSize={pageSize}
                movieCard={3}
                isLoading={isLoading}  />
            {isLoading && movies == undefined &&
                <div className="loader">
                    <img src={loaderGif} />
                </div>
            }
        </div>
    )
}
