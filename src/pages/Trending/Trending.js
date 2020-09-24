import React, { useEffect, useState } from 'react';
import TrendingTimespanPicker from '../../components/controls/TrendingTimespanPicker/TrendingTimespanPicker';
import './Trending.sass';
import MoviesService from '../../services/movies.service';
import FullPagination from '../../components/controls/FullPagination/FullPagination';

export default function Trending() {

    const [span, setSpan] = useState(30);
    const [movies, setMovies] = useState();
    const [pages, setPages] = useState();
    const [pageNum, setPageNum] = useState(0);
    const pageSize = 24;

    useEffect(() => {
        setPageNum(0);
        getPage(pageNum, pageSize);
    }, [span]);

    const getPage = (pageNum, pageSize) => {
        MoviesService.getTrending(span, pageNum, pageSize).then(response => {
            setMovies(response.data.movies);
            setPages(response.data.pages);
        }).catch(e => {
            alert(e.error.message);
            console.error(e);
        });
    }

    return (
        <div className="trending-page">
            <TrendingTimespanPicker setSpan={setSpan} />
            <FullPagination 
                className="paginator"
                getPage={getPage}
                movies={movies}
                pages={pages}
                pageNum={pageNum}
                setPageNum={setPageNum}
                pageSize={pageSize}  />
        </div>
    )
}
