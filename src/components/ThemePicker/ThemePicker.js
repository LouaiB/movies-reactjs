import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import './ThemePicker.sass';

export default function ThemePicker() {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const preferesDark = localStorage.getItem('preferesDark');
        if(preferesDark == 'yes') setIsDarkTheme(true);
        else setIsDarkTheme(false);
    }, []);

    useEffect(() => {
        const root = document.querySelector('#root');
        if(root) {
            switch(isDarkTheme){
                case true:
                    root.classList.remove('light');
                    root.classList.add('dark');
                    localStorage.setItem('preferesDark', 'yes');
                    break;
                case false:
                    root.classList.remove('dark');
                    root.classList.add('light');
                    localStorage.setItem('preferesDark', 'no');
            }
            
        }
    }, [isDarkTheme]);

    return (
        <div className="toggle">
            <button
                className={isDarkTheme ? 'dark' : 'light'}
                onClick={() => setIsDarkTheme(!isDarkTheme)}
            >
                { !isDarkTheme && <FontAwesomeIcon icon={faSun} className="sun" /> }
                { isDarkTheme && <FontAwesomeIcon icon={faCloudMoon} className="moon" /> }
            </button>
        </div>
    )
}
