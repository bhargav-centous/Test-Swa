"use client"

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock/_user';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserProfile from './UserProFile';
import BillingInfo from './BillingInfo';
// import AccountGeneral from '../account-general';
import AccountBilling from './Membership';
// import AccountSocialLinks from '../account-social-links';
// import AccountNotifications from '../account-notifications';
// import AccountChangePassword from '../account-change-password';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'user-profile',
    label: 'User Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'membership',
    label: 'Membership',
    icon: <img src='/assets/icons/membership/membership-icon.svg' alt='membership-tab-icon' width={24} />,
  },
  {
    value: 'billing-Info',
    label: 'Billing Info',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('user-profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Membership Details"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Membership Details', href: paths.dashboard.membershipDetails },
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
      {currentTab === 'user-profile' && <UserProfile />}
      {currentTab === 'billing-Info' && <BillingInfo />}
      {currentTab === 'membership' && (
        <AccountBilling
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )}
    </Container>
  );
}
