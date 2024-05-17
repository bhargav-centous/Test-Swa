'use client'

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { endpoints, getRequest, putRequest, postRequest } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AddGoalCategoryForm({ id = false }) {
    const { enqueueSnackbar } = useSnackbar();
    const [organizationTypes, setOrganizationTypes] = useState([])

    const getOrganizationTypes = () => {
        const URL = endpoints.commonAPI.organisationTypes;
        getRequest(URL).then((res) => {
            if (res.data) {
                setOrganizationTypes(res.data)
            } else {
                setOrganizationTypes([])
            }
        })
    }

    const router = useRouter();
    const [roleList, setRoleList] = useState([])

    const getRoleList = async () => {
        try {
            const URL = endpoints.manageRole.getRoleList;
            const response = await getRequest(`${URL}?PageNumber=${1}&PageSize=${100}`);
            setRoleList(response.data.items);
        } catch (error) {
            console.error('Error fetching role list:', error);
        }
    };

    useEffect(() => {
        getRoleList()
        getOrganizationTypes()
    }, [])



    const UpdateUserSchema = Yup.object().shape({
        organisationType: Yup.string()
            .required('Organisation Type is required')
        ,
        goalName: Yup.string()
            .required('Goal Name is required')
        ,
        goalDescription: Yup.string()
            .required('Goal Description is required')
        ,

    });

    const defaultValues = {
        organisationType: '',
        goalName: '',
        goalDescription: '',
        status: '',

    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,

    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        // const getSelectedStaff = async (staffid) => {
        //     try {
        //         const response = await getRequest(`${endpoints.addStaff.editStaff}/${staffid}`);
        //         if (response.status === 200) {
        //             return response.data;
        //         }
        //         return {}; // return an empty object if response status is not 200
        //     } catch (error) {
        //         console.error("Error fetching selected staff:", error);
        //         return {}; // return an empty object if there's an error
        //     }
        // };

        const fetchData = async () => {
            // if (id) {
            // //   
            // }
        };

        fetchData(); // Call the async function

    }, [setValue, id, roleList]);


    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = { ...data }
            if (id) { // when Id is not undefined
                payload.id = id
            }
            let response;
            if (id) { // Update Time Call
                response = await putRequest(`${endpoints.addStaff.editStaff}/${id}`, payload)
            } else { // Create Time Call.
                response = await postRequest(endpoints.goalCategories, payload)
            }
            if (response.status === 200) {
                enqueueSnackbar(`Data ${id ? "Update" : "Add"} successfully.`)
                if (!id) {
                    setTimeout(() => {
                        router.push(paths.dashboard.addstaff.list)
                    }, [500])
                }
            }

        } catch (error) {
            console.error(error);
        }
    });

    try {
        return (
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <Card sx={{ pb: 2, mb: 3 }}>
                            <Typography sx={{ px: 3, py: 2, fontWeight: 500, color: '#1D2630', fontSize: 14 }}>Goal Categories</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ px: 3, mt: 2 }}>
                                <RHFAutocomplete
                                    options={organizationTypes.map((option) => option.name)}
                                    name="organisationType"
                                    getOptionLabel={(option) => option}
                                    required
                                    label="Organizations Type"
                                />
                            </Box>
                            <Box sx={{ px: 3, mt: 2 }}>
                                <RHFTextField
                                    name="goalName"
                                    required
                                    label="Goal Name"
                                />
                            </Box>
                            <Box sx={{ px: 3, mt: 2 }}>
                                <RHFTextField
                                    name="goalDescription"
                                    required
                                    multiline
                                    label="Goal Description"
                                />
                            </Box>
                            <Box sx={{ px: 3, mt: 2 }}>
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <Typography variant='h5' fontWeight={400}>Status</Typography>
                                    <RHFSwitch
                                        name="status"
                                        label="Active"
                                    />
                                </Stack>
                            </Box>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2, mb: 1, px: 3 }}>
                                <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                                    {id ? "Save" : "Add"}
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        );
    } catch (error) {
        console.log(error);
    }
}
