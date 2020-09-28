import React from 'react';
import './PageCards.sass';
import trendingCard from '../../../assets/trending-card.jpg';
import searchCard from '../../../assets/search-card.jpg';
import randomCard from '../../../assets/random-card.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faFire, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

export default function PageCards() {

    const history = useHistory();

    return (
        <div className="page-cards">
            <div className="page-card" style={{backgroundImage: `url(${trendingCard})`}} onClick={()=>history.push('/trending')}>
                <FontAwesomeIcon icon={faFire} className="icon" />
                <span className="title">TRENDING</span>
                <span className="subtitle">see what's popular</span>
            </div>
            <div className="page-card" style={{backgroundImage: `url(${searchCard})`}} onClick={()=>history.push('/search')}>
                <FontAwesomeIcon icon={faSearch} className="icon" />
                <span className="title">SEARCH</span>
                <span className="subtitle">find what you desire</span>
            </div>
            <div className="page-card" style={{backgroundImage: `url(${randomCard})`}} onClick={()=>history.push('/random')}>
                <FontAwesomeIcon icon={faRandom} className="icon" />
                <span className="title">RANDOM</span>
                <span className="subtitle">You feelin' lucky?</span>
            </div>
        </div>
    )
}
