// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    membershipDetails: `${ROOTS.DASHBOARD}/membershipDetails`,
    selfAssessmentForm: `${ROOTS.DASHBOARD}/selfAssessmentForm`,
    brnadSearch: `${ROOTS.DASHBOARD}/brnadSearch`,
    ngoSearch: `${ROOTS.DASHBOARD}/ngoSearch`,
    linkedRequest: `${ROOTS.DASHBOARD}/linkedRequest`,
    pendingRequest: `${ROOTS.DASHBOARD}/pendingRequest`,
    linkRequest: `${ROOTS.DASHBOARD}/linkRequest`,
    staffMember: `${ROOTS.DASHBOARD}/staffMember`,
    addstaff: {
      root: `${ROOTS.DASHBOARD}/add-staff`,
      list: `${ROOTS.DASHBOARD}/add-staff/list`,
      create: `${ROOTS.DASHBOARD}/add-staff/create`,
      view: (id) => `${ROOTS.DASHBOARD}/add-staff/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/add-staff/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/add-staff/${0}/edit`,
        view: `${ROOTS.DASHBOARD}/add-staff/${0}`,
      },
    },
    manageRole: {
      root: `${ROOTS.DASHBOARD}/manage-role`,
      list: `${ROOTS.DASHBOARD}/manage-role/list`,
      create: `${ROOTS.DASHBOARD}/manage-role/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/manage-role/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/manage-role/${0}/edit`,
      },
    },
    settings: {
      scoringpartnertype: `${ROOTS.DASHBOARD}/settings/scoring-partner-type`,
      goalscoringpartnertype: `${ROOTS.DASHBOARD}/settings/goal-scoring-partner-type`,
      managegoal: `${ROOTS.DASHBOARD}/settings/manage-goal`,
      subgoal: `${ROOTS.DASHBOARD}/settings/sub-goal`,
      scoringpartnercategory: `${ROOTS.DASHBOARD}/settings/scoring-partner-category`,
    },
    goalCategory: {
      root: `${ROOTS.DASHBOARD}/goal-category`,
      add: `${ROOTS.DASHBOARD}/goal-category/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/goal-category/${id}/edit`,
    },
    goalQuestion: {
      root: `${ROOTS.DASHBOARD}/goal-question`,
      add: `${ROOTS.DASHBOARD}/goal-question/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/goal-question/${id}/edit`,
    }
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
};
