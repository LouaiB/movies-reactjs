import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../../assets/logo.png';
import './Footer.sass';

export default function Footer() {
    return (
        <div className="footer">
            <img src={footerLogo} className="logo" />
            <div className="sections">
                <div className="section">
                    <span className="title">movies.tv</span>
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/trending">Trending</Link>
                    <Link className="link" to="/random">Random</Link>
                    <Link className="link" to="/search">Search</Link>
                    <Link className="link" to="/browse">Browse</Link>
                </div>
                <div className="section">
                    <span className="title">Partners</span>
                    <a className="link" href="#">Discord</a>
                    <a className="link" href="#">Hollywood</a>
                    <a className="link" href="#">movies.tv Fans' Community</a>
                </div>
                <div className="section">
                    <span className="title">Resources</span>
                    {/* <a className="link" href="#">Premium Benefits</a> */}
                    <a className="link" href="#">Advertising</a>
                    <a className="link" href="#">Terms of Use</a>
                    {/* <a className="link" href="#">EULA</a> */}
                    <a className="link" href="#">Privacy</a>
                    <a className="link" href="#">Cookies Policy</a>
                </div>
                <div className="section">
                    <span className="title">Connect</span>
                    <a className="link" href="#">Contact Us</a>
                    <a className="link" href="#">What's New</a>
                    <a className="link" href="#">movies.tv Fans' Community</a>
                </div>
            </div>
        </div>
    )
}
