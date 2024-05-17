import React from 'react'
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack'

import Footerview from 'src/sections/footer/Footerview'

export default function Layout({ children }) {
    return (
        <Stack justifyContent='space-between' sx={{ height: '100%' }}>
            <Stack>
                <Stack sx={{ mt: 5, mb: 4 }} direction="row" justifyContent="center">
                    <img className='12112' width={136} alt='header-icon' src='/assets/swa-logo.svg' />
                </Stack>
                {children}
            </Stack>
            <Footerview />
        </Stack>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}