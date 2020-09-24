import React from 'react';
import './PageCards.sass';
import trendingCard from '../../../assets/trending-card.jpg';
import seasonCard from '../../../assets/season-card.jpg';
import randomCard from '../../../assets/random-card.jpg';
import imagesCard from '../../../assets/images-card.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faFire } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

export default function PageCards() {

    const history = useHistory();

    return (
        <div className="page-cards">
            <div className="page-card" style={{backgroundImage: `url(${trendingCard})`}} onClick={()=>history.push('/trending')}>
                <FontAwesomeIcon icon={faFire} className="icon" />
                <span className="title">TRENDING</span>
                <span className="subtitle">popular movies we watch</span>
            </div>
            <div className="page-card" style={{backgroundImage: `url(${seasonCard})`}} onClick={()=>history.push('/trending')}>
                <FontAwesomeIcon icon={faFire} className="icon" />
                <span className="title">TRENDING</span>
                <span className="subtitle">popular movies we watch</span>
            </div>
            <div className="page-card" style={{backgroundImage: `url(${randomCard})`}} onClick={()=>history.push('/random')}>
                <FontAwesomeIcon icon={faRandom} className="icon" />
                <span className="title">RANDOM</span>
                <span className="subtitle">You feelin' lucky?</span>
            </div>
            <div className="page-card" style={{backgroundImage: `url(${imagesCard})`}} onClick={()=>history.push('/trending')}>
                <FontAwesomeIcon icon={faFire} className="icon" />
                <span className="title">TRENDING</span>
                <span className="subtitle">popular movies we watch</span>
            </div>
        </div>
    )
}
