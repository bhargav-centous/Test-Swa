import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  membershipDetails: icon('membership-details'),
  linkRequest: icon('link-request-icon'),
  addStaff: icon('add-staff-icon'),
  manageRole: icon('manage-role-icon'),
  staffMember: icon('staff-member-icon'),
  goalCategory: icon('goal-category-icon'),
};
// ----------------------------------------------------------------------
export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          //  Completd Pages...
          // { title: 'Membership Details', path: paths.dashboard.membershipDetails, icon: ICONS.membershipDetails },
          // { title: 'Self Assessment Form', path: paths.dashboard.selfAssessmentForm, icon: ICONS.membershipDetails },
          // { title: 'Linked Request', path: paths.dashboard.linkedRequest, icon: ICONS.membershipDetails },
          // { title: 'Pending Request', path: paths.dashboard.pendingRequest, icon: ICONS.membershipDetails },
          // { title: 'Link Request', path: paths.dashboard.linkRequest, icon: ICONS.linkRequest },
          // { title: 'Staff Member', path: paths.dashboard.staffMember, icon: ICONS.staffMember },
          // { title: 'Manage Role', path: paths.manageRole, icon: ICONS.manageRole },
          {
            title: 'Staff',
            path: paths.dashboard.addstaff.list,
            activeNavPaths: [
              '/dashboard/add-staff/'
            ],
            icon: ICONS.addStaff,
            // children: [
            //   {
            //     title: 'list',
            //     path: paths.dashboard.addstaff.list,
            //     // icon: ICONS.user,
            //   },
            //   {
            //     title: 'Add',
            //     path: paths.dashboard.addstaff.create,
            //     // icon: ICONS.user,
            //   },
            //   {
            //     title: 'view',
            //     path: paths.dashboard.addstaff.demo.view,
            //     // icon: ICONS.user,
            //   },
            //   // {
            //   //   title: 'Edit',
            //   //   path: paths.dashboard.addstaff.demo.edit,
            //   //   // icon: ICONS.user,
            //   // },
            // ],
          },
          {
            title: 'Manage Role',
            path: paths.dashboard.manageRole.root,
            activeNavPaths: [
              '/dashboard/manage-role/'
            ],
            icon: ICONS.manageRole,
            // children: [
            //   {
            //     title: 'list',
            //     path: paths.dashboard.manageRole.list,
            //     // icon: ICONS.user,
            //   },
            //   {
            //     title: 'Add',
            //     path: paths.dashboard.manageRole.create,
            //     // icon: ICONS.user,
            //   },
            //   // {
            //   //   title: 'Edit',
            //   //   path: paths.dashboard.manageRole.demo.edit,
            //   //   // icon: ICONS.user,
            //   // },
            // ],
          },
          {
            title: 'Goal Categories',
            path: paths.dashboard.goalCategory.root,
            activeNavPaths: [
              '/dashboard/goal-category/'
            ],
            icon: ICONS.goalCategory,
          },
          {
            title: 'Goal Question',
            path: paths.dashboard.goalQuestion.root,
            activeNavPaths: [
              '/dashboard/goal-question/'
            ],
            icon: ICONS.goalCategory,
          },
        ],
      },
    ],
    []
  );

  return data;
}
