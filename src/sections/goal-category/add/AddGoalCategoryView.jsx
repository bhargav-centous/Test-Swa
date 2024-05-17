'use client'

import React from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddGoalCategoryForm from './AddGoalCategoryForm';



const AddGoalCategoryView = () => {
    const settings = useSettingsContext();
    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Add Goal Categories"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Add Goal Categories', href: paths.dashboard.goalCategory.root },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <AddGoalCategoryForm />
        </Container>
    )
}

export default AddGoalCategoryView