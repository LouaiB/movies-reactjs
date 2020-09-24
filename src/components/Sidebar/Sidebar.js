import React, { useContext, useEffect, useState } from 'react';
import { MiscContext } from '../../context/misc.context';
import { UserContext } from '../../context/user.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFire, faRandom, faSearch, faBookOpen, faSignInAlt, faUserPlus, faSignOutAlt, faWrench } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.sass';
import { Link, useHistory } from 'react-router-dom';
import ThemePicker from '../ThemePicker/ThemePicker';

export default function Sidebar() {

    const history = useHistory();

    const { misc, toggleSidebar } = useContext(MiscContext);
    const { user } = useContext(UserContext);

    const [pathname, setPathname] = useState('/');

    useEffect(() => {
        setPathname(history.location.pathname);
        const unregister = history.listen((location, action) => {
            setPathname(location.pathname);
        });

        return unregister;
    }, []);

    const navLinkClicked =() => {
        toggleSidebar();
    }

    return (
        <div className={`sidebar ${misc.sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <hr />
            <Link to="/" className={`link ${pathname == '/' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                <FontAwesomeIcon icon={faHome} className="icon" />
                <span>Home</span>
            </Link>
            <Link to="/trending" className={`link ${pathname == '/trending' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                <FontAwesomeIcon icon={faFire} className="icon" />
                <span>Trending</span>
            </Link>
            <Link to="/random" className={`link ${pathname == '/random' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                <FontAwesomeIcon icon={faRandom} className="icon" />
                <span>Random</span>
            </Link>
            <Link to="/search" className={`link ${pathname == '/search' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                <FontAwesomeIcon icon={faSearch} className="icon" />
                <span>Search</span>
            </Link>
            <Link to="/browse" className={`link ${pathname == '/browse' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                <FontAwesomeIcon icon={faBookOpen} className="icon" />
                <span>Browse</span>
            </Link>
            <hr />
            <span className="section-title">ACCOUNT</span>
            {!user.loggedIn && (
                <>
                    <Link to="/login" className="link" onClick={navLinkClicked}>
                        <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                        <span>Sign In</span>
                    </Link>
                    <Link to="/register" className="link" onClick={navLinkClicked}>
                        <FontAwesomeIcon icon={faUserPlus} className="icon" />
                        <span>Create Account</span>
                    </Link>
                </>
            )}
            {user.loggedIn && (
                <>
                    <Link to="/logout" className="link" onClick={navLinkClicked}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                        <span>Log Out</span>
                    </Link>
                </>
            )}
            {user.loggedIn && (
                <>
                    <hr />
                    <span className="section-title">ADMIN</span>
                    <Link to="/admin-panel" className={`link ${pathname == '/admin-panel' ? 'active-sidebar-link' : ''}`} onClick={navLinkClicked}>
                        <FontAwesomeIcon icon={faWrench} className="icon" />
                        <span>Admin Panel</span>
                    </Link>
                </>
            )}
            <hr />
            <div className="link">
                <ThemePicker className="icon" />
                <span>Theme</span>
            </div>
        </div>
    )
}
