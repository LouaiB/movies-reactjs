import React from 'react';
import './PreFooter.sass';
import bgImage from '../../../assets/prefooter.png';

export default function PreFooter() {

    return (
        <div className="prefooter" style={{backgroundImage: `url(${bgImage})`}}>
            <p>In movies.tv you will find an entertainment haven for the latest movies. We offer the best movie collection in the highest possible quality at 1080p from Blu-Ray rips. Many videos are licensed direct downloads from the original animators, producers, or publishing source company. Our movie website is built for mobile devices, and serves the best movies available on the web. Connected to many leaks, movies.tv is where you can watch movies with just one click. Including movies, where is the latest movies are archived and curated here. Here is the place where you can find the best movies online 24/7. Enjoy action movies, comedy movies, and also many more movies for free! This site is the best place for viewed entertainment, and includes many movie categories like: action, comedy, adventure, thriller, horror, romance, and much more!</p>
        </div>
    )
}
