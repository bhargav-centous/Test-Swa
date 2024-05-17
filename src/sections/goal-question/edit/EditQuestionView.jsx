'use client'

import React from 'react'
import { useParams } from 'next/navigation';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddGoalQuestionForm from '../add/AddGoalQuestionForm';



const EditQuestion = () => {
    const settings = useSettingsContext();

    const { id } = useParams();

    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit Question"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Edit Question', href: paths.dashboard.addstaff.root },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <AddGoalQuestionForm id={id} />
        </Container>
    )
}

export default EditQuestion