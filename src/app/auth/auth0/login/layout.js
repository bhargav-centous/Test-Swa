'use client';

import PropTypes from 'prop-types';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children }) {

    // Array of available Auth images
    const authImages = ['/assets/background/auth-icon-1.svg', '/assets/background/auth-icon-2.svg', '/assets/background/auth-icon-3.svg'];
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomNumber = getRandomNumber(0, 2);
    const randomImage = authImages[randomNumber];

    return (
        <GuestGuard>
            <AuthClassicLayout image={randomImage}>{children}</AuthClassicLayout>
        </GuestGuard>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};
