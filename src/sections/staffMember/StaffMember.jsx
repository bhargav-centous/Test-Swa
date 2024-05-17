'use client'

import React, { useState, useCallback } from 'react'

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StaffMembertView from 'src/sections/staffMember/StaffMembertView';


const TABS = [
    {
        value: 1,
        label: 'Staff Member',
        icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
];

const StaffMember = () => {
    const settings = useSettingsContext();

    const [currentTab, setCurrentTab] = useState(1);

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Pending Request"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Staff Member Details', href: paths.dashboard.staffMember },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} sx={{ fontWeight: 400 }} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
            </Tabs>
            <StaffMembertView />
        </Container>
    )
}

export default StaffMember