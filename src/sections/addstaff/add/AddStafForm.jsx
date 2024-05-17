'use client'

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { FormLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { endpoints, getRequest, putRequest, postRequest } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
    RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AddStafForm({ id = false }) {
    const { enqueueSnackbar } = useSnackbar();
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
    }, [])



    const { user } = useMockedUser();
    const countries = ['in', 'au']
    const UpdateUserSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required')
            .matches(/^[a-zA-Z]+$/, 'First Name must contain only alphabets'),
        lastName: Yup.string()
            .required('Last Name is required')
            .matches(/^[a-zA-Z]+$/, 'Last Name must contain only alphabets'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        photoURL: Yup.string().notRequired(),
        contactNumber: Yup.string()
            .required('Phone number is required')
        ,
        userRoleID: Yup.string().required('User Role is required'),
        countryCodeID: Yup.string().required('Country Code is required')
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        photoURL: user?.photoURL || null,
        contactNumber: '',
        countryCodeID: 'in',
        userRoleID: ''
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,

    });

    const {
        setValue,
        handleSubmit,
        getValues,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        const getSelectedStaff = async (staffid) => {
            try {
                const response = await getRequest(`${endpoints.addStaff.editStaff}/${staffid}`);
                if (response.status === 200) {
                    return response.data;
                }
                return {}; // return an empty object if response status is not 200
            } catch (error) {
                console.error("Error fetching selected staff:", error);
                return {}; // return an empty object if there's an error
            }
        };

        const fetchData = async () => {
            if (id) {
                const selectedStaff = await getSelectedStaff(id);
                setValue('firstName', selectedStaff.firstName)
                setValue('lastName', selectedStaff.lastName)
                setValue('email', selectedStaff.email)
                // setValue('photoURL', selectedStaff.photoURL)
                setValue('contactNumber', selectedStaff.contactNumber)
                setValue('userRoleID', selectedStaff.userRoleName)
                setValue('countryCodeID', selectedStaff?.countryCodeID?.toString())
            }
        };

        fetchData(); // Call the async function

    }, [setValue, id, roleList]);


    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const payload = { ...data, userRoleID: Number(roleList.find((ele) => ele.roleName === data.userRoleID).id) }
            delete payload.photoURL
            if (id) { // when Id is not undefined
                payload.id = id
            }
            let response;
            if (id) { // Update Time Call
                response = await putRequest(`${endpoints.addStaff.editStaff}/${id}`, payload)
            } else { // Create Time Call.
                response = await postRequest(endpoints.addStaff.addStaffUser, payload)
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

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('photoURL', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const handlePhoneChange = (value, country) => {
        setValue('countryCodeID', country?.dialCode); // Update form value for contact number
        // Check if the phoneNumber starts with the countryCode
        if (value.startsWith(country?.dialCode)) {
            const formattedPhoneNumber = value.slice(country?.dialCode.length);
            setValue("contactNumber", formattedPhoneNumber)
        };
    }


    try {
        return (
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Card sx={{ pt: 8, pb: 5, px: 3, textAlign: 'center' }}>
                            <RHFUploadAvatar
                                name="photoURL"
                                maxSize={3145728}
                                onDrop={handleDrop}
                            />
                            <Typography mt={2}>User Name</Typography>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Card sx={{ pb: 2, mb: 3 }}>
                            <Typography sx={{ px: 3, py: 2, fontSize: 14, fontWeight: 500 }}>Personal Information</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                                rowGap={3}
                                columnGap={2}
                                sx={{ px: 3 }}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                }}
                            >
                                <RHFTextField required name="firstName" label="First Name" />
                                <RHFTextField required name="lastName" label="Last Name" />
                                <RHFTextField required name="email" label="Email Address" />
                                {/* <RHFTextField required name="contactNumber" label="Contact" /> */}
                                <Stack>
                                    <FormLabel sx={{ mb: 1 }}>Contact <Iconify sx={{ mb: 0.8, color: 'common.required' }} icon="fa-solid:star-of-life" width={5} /></FormLabel>
                                    <PhoneInput
                                        inputStyle={{ borderColor: '#919eab33', height: '50px', width: '100%' }}
                                        containerStyle={{ borderRadius: '8px' }}
                                        autoFormat
                                        countryCodeEditable={false}
                                        onlyCountries={countries}
                                        country='in' // Set the country code for the PhoneInput
                                        value={methods.getValues('countryCodeID') + methods.getValues('contactNumber')} // Pass current value of contactNumber field
                                        onChange={handlePhoneChange} // Handle phone number change
                                    />
                                    <Typography fontSize={12} sx={{ margin: '8px 14px 0px', color: 'error.main' }}>{errors?.contactNumber ? `${errors?.contactNumber?.message}` : ''}</Typography>
                                </Stack>
                            </Box>
                            <Box
                                sx={{ px: 3, mt: 2 }}>
                                <RHFAutocomplete
                                    sx={{ width: 1 / 2 }}
                                    options={roleList.map((option) => option.roleName)}
                                    name="userRoleID"
                                    getOptionLabel={(option) => option}
                                    required
                                    label="User Role"
                                />
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
