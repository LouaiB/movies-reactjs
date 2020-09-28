import React, { useEffect, useState } from 'react';
import TrendingTimespanPicker from '../../components/controls/TrendingTimespanPicker/TrendingTimespanPicker';
import './Trending.sass';
import MoviesService from '../../services/movies.service';
import FullPagination from '../../components/controls/FullPagination/FullPagination';
import ErrorBoundary from '../../utils/ErrorBoundary/errorBoundary';
import loaderGif from '../../assets/loader.gif';

export default function Trending() {

    const [span, setSpan] = useState(30);
    const [movies, setMovies] = useState();
    const [pages, setPages] = useState();
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 24;

    useEffect(() => {
        setPageNum(0);
        getPage(pageNum, pageSize);
    }, [span]);

    const getPage = (pageNum, pageSize) => {
        setMovies();
        setIsLoading(true);
        MoviesService.getTrending(span, pageNum, pageSize).then(response => {
            setMovies(response.data.movies);
            setPages(response.data.pages);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="trending-page">
            <ErrorBoundary>
                <TrendingTimespanPicker setSpan={setSpan} />
            </ErrorBoundary>
            <FullPagination 
                className="paginator"
                getPage={getPage}
                movies={movies}
                pages={pages}
                pageNum={pageNum}
                setPageNum={setPageNum}
                pageSize={pageSize}  />
            {isLoading && 
                <div className="loader">
                    <img src={loaderGif} />
                </div>
            }
        </div>
    )
}
