'use client'

import React from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddStafForm from './AddStafForm';


const AddStaffFormView = () => {
    const settings = useSettingsContext();
    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Add  Staff"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Add Staff', href: paths.addStaff },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <AddStafForm />
        </Container>
    )
}

export default AddStaffFormView