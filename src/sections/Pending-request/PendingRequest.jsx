'use client'

import React from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PendingRequestView from './PendingRequestView';




const PendnigRequest = () => {
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Pending Request"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Pending Request', href: paths.dashboard.pendingRequest },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <PendingRequestView />


        </Container>
    )
}

export default PendnigRequest