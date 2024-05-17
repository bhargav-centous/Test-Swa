import React from 'react'
import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle';

import { useBoolean } from 'src/hooks/use-boolean';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const BillingForm = ({ setIsTermsSelected, isTermsSelected }) => {
    const { enqueueSnackbar } = useSnackbar();
    const termsAndCondionModal = useBoolean()
    const defaultValues = {
        fullname: 'test user',
        phonenumber: '+91 9874 563 215',
        email: 'info@example.com',
        cardNumber: '',
        expirationDate: '',
        cvc: ''
    }

    const UpdateUserSchema = Yup.object().shape({
        fullname: Yup.string().required('Full Name is required').trim(),
        phonenumber: Yup.string().required('Phone Number is required').trim(),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        cardNumber: Yup.string().required('Card Number is required').matches(/^\d{16}$/, 'Invalid card number'),
        expirationDate: Yup.string().required('Expiration Date is required').matches(/^\d{2}\/\d{2}$/, 'Invalid expiration date'),
        cvc: Yup.string().required('CVC is required').matches(/^\d{3}$/, 'Invalid CVC')
    })


    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        // formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    });



    return (
        <Card sx={{ px: 4, py: 2 }}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Typography pb={1} variant='h5'>Billing Address</Typography>
                <Grid mt={2} item xs={12} md={12}>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="fullname" label="Full Name" />
                        <RHFTextField name="phonenumber" label="Phone Number" />
                    </Box>
                    <Box mt={2}>
                        <RHFTextField name="email" label="Email" />
                    </Box>
                    {/* <Box mt={2}>
                        <RHFTextField
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Stack direction='row' spacing={1}>
                                        {['visa', 'mastercard', 'payment', 'express'].map((ele, index) => (
                                            <img
                                                key={index}
                                                src={`/assets/images/register/${ele}.svg`}
                                                alt={ele}
                                            />
                                        ))}
                                        <SvgColor
                                            src="/assets/images/register/visa.svg"
                                            sx={{ width: 16, height: 16, mr: 1 }}
                                        />
                                    </Stack>
                                </InputAdornment>,
                            }}
                            name="cardNumber"
                            label="Cart Information"
                        />
                        <Box
                            // rowGap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField placeholder='MM / YY' name="expirationDate" />
                            <RHFTextField placeholder="CVC" name="cvc" InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Stack direction='row' spacing={1}>
                                        {['cvc'].map((ele, index) => (
                                            <img
                                                key={index}
                                                src={`/assets/images/register/${ele}.svg`}
                                                alt={ele}
                                            />
                                        ))}

                                    </Stack>
                                </InputAdornment>,
                            }} />
                        </Box>
                    </Box> */}
                    {/* <Stack my={2}>
                        <RHFAutocomplete
                            name="country"
                            type="country"
                            label="Country"
                            placeholder="Choose a country"
                            options={countries.map((option) => option.label)}
                            getOptionLabel={(option) => option}
                        />
                        <RHFTextField
                            name="zip"
                            placeholder="Zip"
                        />
                    </Stack> */}
                    <Stack sx={{ mt: 2 }} direction='row' alignItems='center'>
                        <Checkbox
                            checked={isTermsSelected}
                            onClick={(e) => setIsTermsSelected(e.target.checked)}
                        />
                        <Typography sx={{ color: '#384049', fontSize: 14, mr: 0.5 }}>
                            I have read, understood and agreed with your
                        </Typography>
                        <Box sx={{ color: '#384049', fontWeight: 700, fontSize: 14, cursor: 'pointer' }} onClick={() => termsAndCondionModal.onTrue()}>
                            terms and condition.
                        </Box>
                    </Stack>

                </Grid>
            </FormProvider>
            <Dialog
                open={termsAndCondionModal.value}
                fullWidth
                maxWidth="sm"
                onClose={() => termsAndCondionModal.onFalse()}>
                <DialogTitle>Teams and Condition</DialogTitle>
                <Stack maxHeight={350} sx={{ overflowX: 'hidden', overflowY: 'scroll', px: 3, mb: 3 }} spacing={3}>
                    Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industrys standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industrys standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industrys standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industrys standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

                </Stack>
                <Stack sx={{ px: 3, mb: 2 }} direction='row' justifyContent='end'>
                    <Button sx={{ width: 'maxContent' }} variant="contained" onClick={() => termsAndCondionModal.onFalse()}>
                        Accept
                    </Button>
                </Stack>
            </Dialog>
        </Card>
    )
}

BillingForm.propTypes = {
    setIsTermsSelected: PropTypes.func,
    isTermsSelected: PropTypes.bool,
}

export default BillingForm