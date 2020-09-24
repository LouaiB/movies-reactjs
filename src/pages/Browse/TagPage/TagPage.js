import React, { useEffect, useState, useContext } from 'react';
import './TagPage.sass';
import MoviesService from '../../..//services/movies.service';
import FullPagination from '../../../components/controls/FullPagination/FullPagination';
import { useParams } from 'react-router-dom';
import * as sortModes from '../../../json/sort-modes.json';
import { ModalsContext } from '../../../context/modals.context';
import { FiltersContext } from '../../../context/filters.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

export default function TagPage() {

    let { tag } = useParams();

    const { openModal, setModal, modals } = useContext(ModalsContext);
    const { filters } = useContext(FiltersContext);

    const [movies, setMovies] = useState();
    const [pages, setPages] = useState();
    const [pageNum, setPageNum] = useState(0);
    const pageSize = 24;

    useEffect(() => {
        setPageNum(0);
        getPage(pageNum, pageSize);
        console.log('Filter change in TAG PAGE');
    }, [filters]);

    const getPage = (pageNum, pageSize) => {
        const searchFilters = { includedTags: [tag], sortMode: filters.sortMode }
        MoviesService.search(searchFilters, pageNum, pageSize).then(response => {
            setMovies(response.data.movies);
            setPages(response.data.pages);
            console.log(response);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
    }

    const openSearchSortModal = () => {
        setModal(modals.SEARCH_SORT);
        openModal();
    }

    return (
        <div className="tag-page">
            <div className="filters">
                <button 
                    className="filter-btn" 
                    onClick={openSearchSortModal}
                >
                    <FontAwesomeIcon icon={faSort} className="filter-icon" />
                    <span className="btn-text">Sort</span>
                </button>
            </div>
            <FullPagination 
                className="paginator"
                getPage={getPage}
                movies={movies}
                pages={pages}
                pageNum={pageNum}
                setPageNum={setPageNum}
                pageSize={pageSize}
                movieCard={2}  />
        </div>
    )
}
