import React from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card'
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Box, Grid, Stack } from '@mui/material';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { countries } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

const BillingInfoView = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useMockedUser();
    const UpdateUserSchema = Yup.object().shape({
        fname: Yup.string().required('First Name is required'),
        lname: Yup.string().required('Last Name is required'),
        bilingEmail: Yup.string().required('Billing Email Address is required').email('Email must be a valid email address'),
        billingPhoneNumber: Yup.string().required('Phone number is required'),
        country: Yup.string().required('Country is required'),
        billingAddress: Yup.string().required('Billing Address is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        zipCode: Yup.string().required('Zip code is required'),
    });

    const defaultValues = {
        fname: 'Gaurav',
        lname: 'Gurjar',
        bilingEmail: user?.email || '',
        billingPhoneNumber: '+91 9821081120',
        country: 'Australia',
        billingAddress: '3801 Chalk Butte Rd, Cut Bank, MT 59427, Australia',
        state: 'New South Wales',
        city: 'Canberra',
        zipCode: '2600',
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Card sx={{ mt: 5, mx: 3 }}>
            <Typography sx={{ pl: 3, pt: 2, fontWeight: 500 }}>Billing Info</Typography>
            <Divider sx={{ pb: 2 }} />
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="fname" label="First Name" />
                            <RHFTextField name="lname" label="Last Name" />
                            <RHFTextField name="billingPhoneNumber" label="Billing Phone Number" />
                            <RHFTextField name="bilingEmail" label="Billing Email Address" />
                        </Box>
                        <Stack my={3}>
                            <RHFTextField name="billingAddress" label="Billing Address" />
                        </Stack>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFAutocomplete
                                options={countries.map((option) => option.label)}
                                getOptionLabel={(option) => option}
                                name="city"
                                type="country"
                                label="City"
                            />
                            <RHFTextField name="state" label="State" />
                            <RHFTextField name="zipCode" label="Zip/Code" />
                            <RHFAutocomplete
                                name="country"
                                type="country"
                                label="Country"
                                placeholder="Choose a country"
                                options={countries.map((option) => option.label)}
                                getOptionLabel={(option) => option}
                            />

                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                                Update Billing Information
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </FormProvider>
        </Card>
    )
}

export default BillingInfoView