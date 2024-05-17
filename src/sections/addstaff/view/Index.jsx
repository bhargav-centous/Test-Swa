'use client'

import React from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StaffListView from './StaffListView';



const View = () => {
    const settings = useSettingsContext();
    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="View Staff"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'View Staff', href: paths.addStaff },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <StaffListView />
        </Container>
    )
}

export default View