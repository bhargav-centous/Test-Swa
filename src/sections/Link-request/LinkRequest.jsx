'use client'

import React from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LinkRequestView from './LinkRequestView';




const LinkRequest = () => {
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Link Request"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Link Request', href: paths.dashboard.linkRequest },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <LinkRequestView />


        </Container>
    )
}

export default LinkRequest