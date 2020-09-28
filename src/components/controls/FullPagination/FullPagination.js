import React, { useState, useEffect } from 'react';
import './FullPagination.sass';
import MovieCardOne from '../../cards/MovieCardOne/MovieCardOne';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import MovieCardTwo from '../../cards/MovieCardTwo/MovieCardTwo';
import MovieCardThree from '../../cards/MovieCardThree/MovieCardThree';
import ErrorBoundary from '../../../utils/ErrorBoundary/errorBoundary';

export default function FullPagination({getPage, movies, pages, pageNum, setPageNum, pageSize, movieCard = 1, isLoading = false}) {

    const [pageBtns, setPageBtns] = useState([]);

    useEffect(() => {
        getPage(pageNum, pageSize);
    }, [pageNum]);

    useEffect(() => {
        let btns = [];

        if(pages <= 5) { 
            for(let i = 1; i <= pages; i++) btns = [...btns, i];
        } else {
            if(pageNum <= 1) {
                btns = [1, 2, 3, -1, pages];
            } else if(pageNum >= pages-2){
                btns = [1, -1, pages-2, pages-1, pages];
            } else {
                btns = [1, -1, pageNum, pageNum+1, pageNum+2 ,-1, pages];
            }
        }

        setPageBtns(btns);
    }, [pages, pageNum]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const nextPage = () => {
        setPageNum(prev => prev + 1);
        scrollToTop();
    }

    const prevPage = () => {
        setPageNum(prev => prev - 1);
        scrollToTop();
    }

    const choosePage = (num) => {
        setPageNum(num);
        scrollToTop();
    }

    const Controls = ({isLoading}) => (
        <div className="controls">
            <button 
                className={`btn btn-sm ${isLoading ? 'shift-left' : ''}`}
                disabled={pageNum <= 0}
                onClick={prevPage}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {pageBtns && pageBtns.map((btn, index) => {
                if(btn != -1) return(
                    <button 
                        key={index}
                        className={`btn btn-md ${pageNum == btn-1 ? 'active' : ''}`}
                        onClick={() => choosePage(btn-1)}
                        >
                            {btn}
                    </button>
                )
                else return (
                    <span key={index} className="elip">...</span>
                )
            })}
            

            <button 
                className={`btn btn-sm ${isLoading ? 'shift-right' : ''}`}
                disabled={pageNum >= pages-1}
                onClick={nextPage}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
            </button>
            
        </div>
    )

    return (
        <div className="full-paginator">
            {movies && movies.length > 0 && (<>
                <Controls isLoading={isLoading} />
                <div className="items">
                    { movies && movieCard == 1 && movies.map(m => (<ErrorBoundary key={m._id}><MovieCardOne movie={m} /></ErrorBoundary>)) }
                    { movies && movieCard == 2 && movies.map(m => (<ErrorBoundary key={m._id}><MovieCardTwo movie={m} /></ErrorBoundary>)) }
                    { movies && movieCard == 3 && movies.map(m => (<ErrorBoundary key={m._id}><MovieCardThree movie={m} /></ErrorBoundary>)) }
                </div>
                <Controls isLoading={isLoading} />
            </>)}
            {movies && movies.length == 0 && <>
                <div className="empty">
                    <h1>No Movies Found</h1>
                </div>
            </>}
        </div>
    )
}
