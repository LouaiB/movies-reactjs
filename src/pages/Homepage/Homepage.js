import React, { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import ErrorBoundary from '../../utils/ErrorBoundary/errorBoundary';
import Hero from './Hero/Hero';
import './Homepage.sass';
import PreFooter from './PreFooter/PreFooter';
import RandomSnip from './RandomSnip/RandomSnip';
import RecentUploadsSnip from './RecentUploadsSnip/RecentUploadsSnip';
import TrendingSnip from './TrendingSnip/TrendingSnip';

export default function Homepage() {

    const { user } = useContext(UserContext);

    return (
        <div className="homepage">
            <Hero />
            <ErrorBoundary>
                <RecentUploadsSnip />
            </ErrorBoundary>
            <ErrorBoundary>
                <TrendingSnip />
            </ErrorBoundary>
            <ErrorBoundary>
                <RandomSnip />
            </ErrorBoundary>
        </div>
    )
}
