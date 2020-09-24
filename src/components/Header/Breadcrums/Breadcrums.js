import React, { useEffect, useState } from 'react';
import './Breadcrums.sass';
import { useHistory } from 'react-router-dom';

export default function Breadcrums() {

    const history = useHistory();

    const [crums, setCrums] = useState([]);

    useEffect(() => {
        const unregisterHistoryListener = history.listen((location, action) => {
            let paths = location.pathname.slice(1).split('/');
            if(paths.length > 1 && paths.includes('browse')) setCrums(paths);
            else setCrums([]);
        });

        return () => {
            unregisterHistoryListener();
        }
    }, []);

    return (
        <div className="breadcrums">
            { crums && crums.map((crum, index) => (
                    <div 
                        key={crum} 
                        className="crum"
                        onClick={() => history.push(`/${crums.filter((v,i) => i<=index).join('/')}`)}
                    >
                        <span className="crum-text">{crum}</span>
                    </div>
                )) }
        </div>
    )
}
