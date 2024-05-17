import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken'); // Assuming you store your token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const postRequest = async (endpoint, data, config = {}) => {
  try {
    const url = endpoint;

    if (!url) throw new Error(`Endpoint "${endpoint}" not found`);

    const res = await axiosInstance.post(url, data, config);
    return { data: res.data, status: res.status };
  } catch (error) {
    if (Array.isArray(error.errors)) {
      error.errors.map((ele, index) => enqueueSnackbar(ele[Object.keys(ele)[0]][0], { variant: 'error' }))
    } else {
      Object.keys(error.errors).map((ele, index) => (
        enqueueSnackbar(error.errors[ele][index], { variant: 'error' })
      ))
    }
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const getRequest = async (endpoint, config = {}) => {
  try {
    const url = endpoint;

    if (!url) throw new Error(`Endpoint "${endpoint}" not found`);
    const res = await axiosInstance.get(url, { ...config });
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    if (Array.isArray(error.errors)) {
      error.errors.map((ele, index) => enqueueSnackbar(ele[Object.keys(ele)[0]][0], { variant: 'error' }))
    } else {
      Object.keys(error.errors).map((ele, index) => (
        enqueueSnackbar(error.errors[ele][index], { variant: 'error' })
      ))
    }
    console.error('Error making GET request:', error); // Corrected error message
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const putRequest = async (endpoint, data, config = {}) => {
  try {
    const url = endpoint;
    if (!url) throw new Error(`Endpoint "${endpoint}" not found`);

    const res = await axiosInstance.put(url, data, config);
    return { data: res.data, status: res.status };
  } catch (error) {
    if (Array.isArray(error.errors)) {
      error.errors.map((ele, index) => enqueueSnackbar(ele[Object.keys(ele)[0]][0], { variant: 'error' }))
    } else {
      Object.keys(error.errors).map((ele, index) => (
        enqueueSnackbar(error.errors[ele][index], { variant: 'error' })
      ))
    }
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const deleteRequest = async (endpoint, config = {}) => {
  try {
    const url = endpoint;
    if (!url) throw new Error(`Endpoint "${endpoint}" not found`);

    const res = await axiosInstance.delete(url, config);
    return { data: res.data, status: res.status };
  } catch (error) {
    if (Array.isArray(error.errors)) {
      error.errors.map((ele, index) => enqueueSnackbar(ele[Object.keys(ele)[0]][0], { variant: 'error' }))
    } else {
      Object.keys(error.errors).map((ele, index) => (
        enqueueSnackbar(error.errors[ele][index], { variant: 'error' })
      ));
    }
    throw error; // Re-throw the error for handling in the calling code
  }
};


export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  register: {
    IndividualExternalUser: '/api/IndividualExternalUser',
    OrganizationExternalUser: '/api/OrganizationExternalUser',
  },
  manageRole: {
    RolesAndPermissions: '/api/RolesAndPermissions/GetPrivileges',
    AddRolesAndPermissions: '/api/RolesAndPermissions',
    getRoleList: '/api/UserRoles',
    editRoleAndPermissions: '/api/RolesAndPermissions'
    // pass Role id
    // editRoleAndPermissions: '/api/RolesAndPermissions${RoleID}'
  },
  settings: {
    ScoringPartnerTypes: '/api/ScoringPartnerTypes',
    Goals: '/api/Goals',
    SubGoal: '/api/SubGoals',
    ScoringPartnerCategories: '/api/ScoringPartnerCategories',
    GoalScoringPartnerType: '/api/SDGGoalScoringPartnerType'
    // pass Role id
    // editRoleAndPermissions: '/api/RolesAndPermissions${RoleID}'
  }
  ,
  addStaff: {
    addStaffUser: '/api/InternalStaffUser',
    getStaffUser: '/api/InternalStaffUser',
    getDataById: '/api/InternalStaffUser',
    editStaff: '/api/InternalStaffUser'
  },

  commonAPI: {
    organisationTypes: '/api/OrganisationTypes',
  },
  goalCategories: '/api/GoalCategories',
  goalQuestion: {
    goalQuestion: '/api/GoalQuestionAnswers/GetGoalQuestionsWithPagination',
    addGoalQuestion: '/api/GoalQuestionAnswers',
    getDataById: `/api/GoalQuestionAnswers/GetGoalQuestionAnswersByQuestionID`
  }
};

