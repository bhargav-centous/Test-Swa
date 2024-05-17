import React from 'react'
import * as Yup from 'yup';
import Proptypes from 'prop-types'
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton';

import { endpoints, postRequest } from 'src/utils/axios';

import { countries } from 'src/assets/data';

import { checkisLocal, generateRandomString } from 'src/components/commonUtils';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function NGOForm({ onNext, selectedOrganizationType }) {
    const { enqueueSnackbar } = useSnackbar();

    const UpdateUserSchema = Yup.object().shape({
        organisationName: Yup.string().required('Organization Name is required').trim(),
        primaryContactName: Yup.string().required('Primary Contact Name is required').trim(),
        primaryContactEmailAddress: Yup.string().required('Primary Contact Email Address is required').trim(),
        primaryContactPhoneNumber: Yup.string().required('Primary Contact Phone Number is required').trim(),
        organisationRegistrationNumber: Yup.string().required('Organization Registration Number is required').trim(),
        parent_organization: Yup.string().required('Parent Organization is required').trim(),
        parent_organization_regestration_num: Yup.string().required('Parent Organization registration Number is required').trim(),

        addressLine1: Yup.string().required('Address is required').trim(),
        cityName: Yup.string().required('City is required').trim(),
        stateName: Yup.string().required('State is required').trim(),
        countryName: Yup.string().required('Country is required').trim(),
        zipCode: Yup.string().required('Zip code is required').trim(),
    })

    const defaultValues = {
        organisationName: generateRandomString(7),
        organisationRegistrationNumber: '78925486458',
        primaryContactName: 'John Doe',
        primaryContactEmailAddress: 'john.doe@gmail.com',
        primaryContactPhoneNumber: '6145551329',
        addressLine1: 'Temp Address',
        cityName: 'Surat',
        stateName: 'Gujrat',
        zipCode: '395004',
        parent_organization: 'Sustainable World Alliance',
        parent_organization_regestration_num: '78925486458',
    }

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
            const payload = {
                ...data,
                organisationType: selectedOrganizationType,
                countryCodeID: countries.find((ele) => ele.label === data.countryName)?.phone
            };
            delete payload.parent_organization_regestration_num
            delete payload.parent_organization
            
            if (checkisLocal) {
                const response = await postRequest(endpoints.register.OrganizationExternalUser, payload)
                if (response.status === 200) {
                    enqueueSnackbar('Registration Successful', { variant: 'success' });
                    setTimeout(() => { onNext(1) }, [1000])
                }
            } else {
                onNext(1);
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong.', { variant: 'error' });
            console.log(error);
        }
    });

    try {
        return (
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box>
                    <Divider sx={{ mb: 2 }} />
                </Box>
                <Grid item xs={12} md={8}>
                    <Typography variant='bluishgray' sx={{ pb: 2, px: 3, fontWeight: 500 }}>Organization Personal Information</Typography>
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
                        <RHFTextField required name="organisationName" label="Organization Name" />
                        <RHFTextField required name="organisationRegistrationNumber" label="Organization Registration Number" />
                        <RHFTextField required name="primaryContactName" label="Primary Contact Name" />
                        <RHFTextField required name="primaryContactEmailAddress" label="Primary Contact Email Address" />
                        <RHFTextField required name="primaryContactPhoneNumber" label="Primary Contact Phone Number" />
                        <RHFTextField name="parent_organization" label="Parent Organization" helperText="Note: Only add these fields if your parent organization has requested" />
                        <RHFTextField name="parent_organization_regestration_num" label="Parent Organization Registration Number" helperText='Note: Only add these fields if your parent organization has requested' />
                    </Box>
                </Grid>
                <Box pt={2}>
                    <Divider sx={{ mb: 2 }} />
                </Box>
                <Grid item xs={12} md={8}>
                    <Typography variant='bluishgray' sx={{ pb: 2, px: 3, fontWeight: 500 }}>Organization Address Information</Typography>
                    <Box sx={{ mb: 3, px: 3 }}>
                        <RHFTextField required name="addressLine1" label="Organization Address line 1*" />
                    </Box>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        sx={{ px: 3, }}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField required name="cityName" label="City" />
                        <RHFTextField required name="stateName" label="State/Region" />
                        <RHFTextField required name="zipCode" label="Zip/Code" />
                        <RHFAutocomplete
                            name="countryName"
                            type="country"
                            required
                            label="Country"
                            placeholder="Choose a country"
                            options={countries.map((option) => option.label)}
                            getOptionLabel={(option) => option}
                        />
                    </Box>
                </Grid>
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2, mb: 1, px: 3 }}>
                    <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                        Continue
                    </LoadingButton>
                </Stack>
            </FormProvider>
        )
    } catch (error) {
        console.log(error);
    }
}

NGOForm.propTypes = {
    onNext: Proptypes.func,
    selectedOrganizationType: Proptypes.string,
}
