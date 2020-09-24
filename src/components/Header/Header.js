import React, { useContext, useEffect, useState } from 'react'
import GlobalSearchInput from '../controls/GlobalSearchInput/GlobalSearchInput';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { MiscContext } from '../../context/misc.context';
import './Header.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Breadcrums from './Breadcrums/Breadcrums';
import UserService from '../../services/user.service';
import TokenStorageHelper from '../../storage/token.storage';

export default function Header() {

    const history = useHistory();
    
    const { user, setUser } = useContext(UserContext);
    const { misc, toggleSidebar } = useContext(MiscContext);

    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Smooth scroll to top everytime a link is used
        const unregisterHistoryListener = history.listen((location, action) => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Auto Login
        if(TokenStorageHelper.getRefreshToken()) autoLogin();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unregisterHistoryListener();
        }
    }, []);

    const onSitenameClick = () => {
        if(misc.sidebarOpen) toggleSidebar();
        history.push('/');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const autoLogin = () => {
        console.info('initiating auto login');
        UserService.getUserData().then(userData => {
            setUser({
                loggedIn: true,
                ... userData.data
            });
        }).catch(err2 => {
            console.error(err2);
            
        });
    }
    
    return (
        <div className={`header ${!scrolled ? 'header-transparent' : ''}`}>
            <div className="left">
                <FontAwesomeIcon icon={faBars} className="hamburger" onClick={toggleSidebar} />
                <div className="sitename" onClick={onSitenameClick}>
                    <span>movies<span className="primary-color">.</span>tv</span>
                </div>
            </div>
            <GlobalSearchInput />
            <div className="nav">
                { !user.loggedIn && 
                <>
                    <Link className="link" to="/login">
                        <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" /> 
                        <span className="nav-text">SIGN IN</span>
                    </Link>
                    <Link className="link" to="/register">
                        <FontAwesomeIcon icon={faUserPlus} className="nav-icon" /> 
                        <span className="nav-text">CREATE ACCOUNT</span>
                    </Link>
                </> }
                { user.loggedIn && <>
                    <Link className="link" to="/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> 
                        <span className="nav-text">LOG OUT</span>
                    </Link>
                </> }
                <Breadcrums />
            </div>
        </div>
    )
}
