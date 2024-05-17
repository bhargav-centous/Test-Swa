'use client'

import React from 'react'
import { useParams } from 'next/navigation';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddGoalCategoryForm from '../add/AddGoalCategoryForm';



const EditCategoryView = () => {
    const settings = useSettingsContext();

    const { id } = useParams();

    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit Categories"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Edit Categories', href: paths.dashboard.goalCategory.root },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <AddGoalCategoryForm id={id} />
        </Container>
    )
}

export default EditCategoryView