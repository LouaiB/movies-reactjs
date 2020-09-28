import React from 'react';
import './Hero.sass';
import heroBG from '../../../assets/hero3.jpg';

export default function Hero() {


    return (
        <div className="hero" style={{backgroundImage: `url(${heroBG})`}}>
            <h1 className="title">Watch Free HD Movies</h1>
            <span className="subtitle">Enjoy your <span className="primary-color">unlimited</span> movie collection. We are the definitive source for the best curated 720p / 1080p HD movies, viewable by mobile phone and tablet, for free.</span>
        </div>
    )
}
