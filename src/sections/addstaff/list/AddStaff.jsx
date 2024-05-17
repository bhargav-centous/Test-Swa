'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddStaffView from './AddStaffView';

const AddStaff = () => {
    const settings = useSettingsContext();
    const router = useRouter()
    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
                heading="Add Staff"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Staff', href: paths.dashboard.addstaff.root },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
                action={
                    <Button
                        variant="contained"
                        onClick={() => router.push(paths.dashboard.addstaff.create)}
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        Add Staff
                    </Button>
                }
            />
            <AddStaffView />
        </Container>
    )
}

export default AddStaff