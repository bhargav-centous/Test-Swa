'use client'

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { endpoints, getRequest } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
    RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function StaffListView() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [selectedStaff, setSelectedStaff] = useState()
    const { id } = useParams();

    const getRolebyId = async (staffid) => {
        try {
            const URL = endpoints.addStaff.getDataById;
            const response = await getRequest(`${URL}/${staffid}`);
            setSelectedStaff(response.data);
            // setSelectedStaff(response.data.items);
        } catch (error) {
            console.error('Error fetching role list:', error);
        }
    };

    useEffect(() => {
        getRolebyId(id)
    }, [id])


    const { user } = useMockedUser();

    const UpdateUserSchema = Yup.object().shape({
        firstName: Yup.string().trim()
            .required('First Name is required')
            .matches(/^[a-zA-Z]+$/, 'First Name must contain only alphabets'),
        lastName: Yup.string().trim()
            .required('Last Name is required')
            .matches(/^[a-zA-Z]+$/, 'Last Name must contain only alphabets'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        photoURL: Yup.string().notRequired(),
        contactNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .test('is-valid', 'Invalid phone number', (value) => {
                if (!value) return true; // Allow empty value
                const phoneNumberRegex = /^[0-9]{10}$/; // Modify regex based on your validation requirements
                return phoneNumberRegex.test(value);
            }),
        userRoleID: Yup.string().required('User Role is required'),
        countryCodeID: Yup.string().required('Country Code is required')
    });
    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        photoURL: user?.photoURL || null,
        contactNumber: '',
        countryCodeID: 1,
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
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        setValue('firstName', selectedStaff?.firstName)
        setValue('lastName', selectedStaff?.lastName)
        setValue('email', selectedStaff?.email)
        setValue('contactNumber', selectedStaff?.contactNumber)
        setValue('userRoleID', selectedStaff?.userRoleName)
    }, [selectedStaff, setValue])

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

    const values = getValues()
    const sx = { background: "#919eab24" }

    try {
        return (
            <FormProvider methods={methods}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Card d sx={{ pt: 8, pb: 5, px: 3, textAlign: 'center' }}>
                            <RHFUploadAvatar
                                name="photoURL"
                                maxSize={3145728}
                                onDrop={handleDrop}
                            />
                            <Typography mt={2}>{`${values?.firstName}  ${values?.lastName}`}</Typography>
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
                                <RHFTextField sx={sx} disabled name="firstName" label="First Name" />
                                <RHFTextField sx={sx} disabled name="lastName" label="Last Name" />
                                <RHFTextField sx={sx} disabled name="email" label="Email Address" />
                                <RHFTextField sx={sx} disabled name="contactNumber" label="Contact" />
                            </Box>
                            <Box
                                sx={{ px: 3, mb: 1 }}>
                                <RHFAutocomplete
                                    sx={{ width: 1 / 2, ...sx }}
                                    options={[].map((option) => option.roleName)}
                                    name="userRoleID"
                                    disabled
                                    label="User Role"
                                />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        );
    } catch (error) {
        console.log(error);
    }
}
