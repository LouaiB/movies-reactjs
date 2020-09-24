import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './SimplePagination.sass';
import { Link } from 'react-router-dom';

export default function SimplePagination({children, title, subtitle, fullLink, fullLinkText='ALL'}) {

    const itemsRef = useRef(null);
    const [shift, setShift] = useState(0);

    const goLeft = () => {
        if(shift >= 0) return;
        const move = window.innerWidth * 0.8;
        setShift(prev => prev += move);
    }

    const goRight = () => {
        if(shift <= -itemsRef.current.outerWidth) return;
        const move = window.innerWidth * 0.8;
        setShift(prev => prev -= move);
    }

    return (
        <div className="simple-pagination">
            <div className="head">
                <div className="info">
                    <h1 className="title">{title}</h1>
                    <span className="subtitle">{subtitle}</span>
                </div>
                <div className="controls">
                    <Link to={fullLink} className="btn-1" style={{marginRight: '15px'}}>{fullLinkText}</Link>
                    <button className="btn-1" onClick={goLeft} disabled={shift >= 0}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button className="btn-1" onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
            <div className="items-wrapper">
                <div className="items" ref={itemsRef} style={{transform: `translate3d(${shift}px, 0px, 0px)`}}>
                    {children}
                </div>
            </div>
        </div>
    )
}
