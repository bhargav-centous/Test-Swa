import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function MembershipBillingPlan({ cardList, addressBook, plans }) {
    const openAddress = useBoolean();

    const openCards = useBoolean();

    const primaryAddress = addressBook.filter((address) => address.primary)[0];

    const primaryCard = cardList.filter((card) => card.primary)[0];

    const [selectedPlan, setSelectedPlan] = useState('Basic');

    const handleSelectPlan = useCallback(
        (newValue) => {
            const currentPlan = plans.filter((plan) => plan.primary)[0].subscription;
            if (currentPlan !== newValue) {
                setSelectedPlan(newValue);
            }
        },
        [plans]
    );


    const renderPlans = plans.map((plan) => (
        <Grid item xs={12} md={4} key={plan.subscription}>
            <Stack
                component={Paper}
                variant="outlined"
                onClick={() => handleSelectPlan(plan.subscription)}
                sx={{
                    p: 2.5,
                    position: 'relative',
                    cursor: 'pointer',
                    ...(plan.primary && {
                        opacity: 0.48,
                        cursor: 'default',
                    }),
                    ...(plan.subscription === selectedPlan && {
                        // boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                        bgcolor: 'background.green'
                    }),
                }}
            >
                {plan.primary && (
                    <Label
                        color="info"
                        startIcon={<Iconify icon="eva:star-fill" />}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'background.green' }}
                    >
                        Current
                    </Label>
                )}

                <Box sx={{ width: 48, height: 48 }}>
                    {plan.subscription === 'basic' && <SvgColor sx={{ height: '30px', width: '30px', bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green' }} src="/assets/icons/membership/basic.svg" />}
                    {plan.subscription === 'Standard' && <SvgColor sx={{ height: '30px', width: '30px', bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green' }} src="/assets/icons/membership/standard.svg" />}
                    {plan.subscription === 'premium' && <SvgColor sx={{ height: '30px', width: '30px', bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green' }} src="/assets/icons/membership/premium.svg" />}
                </Box>

                <Box
                    sx={{
                        typography: 'subtitle2',
                        mt: 2,
                        mb: 0.5,
                        textTransform: 'capitalize',
                        bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green',
                        borderRadius: '80px',
                        px: 3, py: 1, fontSize: 18, fontWeight: '500',
                        color: plan.subscription === selectedPlan ? 'background.green' : 'common.white'
                    }}
                >
                    {plan.subscription}
                </Box>
                <Box
                    sx={{ color: plan.subscription === selectedPlan ? 'common.white' : '', fontSize: 18, py: 2, lineHeight: '22px' }}
                >
                    {plan.description}
                </Box>

                <Stack direction="row" alignItems="center">
                    <SvgColor sx={{ height: '14px', width: '15px', bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green' }} src="/assets/icons/membership/dollar-sign.svg" />
                    <Typography sx={{ color: plan.subscription === selectedPlan ? 'common.white' : 'background.green', typography: 'h3' }}>{plan.price}</Typography>
                    <Box component="span" sx={{ typography: 'body2', color: plan.subscription === selectedPlan ? 'common.white' : 'text.disabled', ml: 0.5 }}>
                        /mo
                    </Box>
                </Stack>
                <Box
                    sx={{ color: plan.subscription === selectedPlan ? 'common.white' : '', fontSize: 18, fontWeight: 400, py: 2, lineHeight: '22px' }}
                >
                    More Info <SvgColor sx={{ height: '14px', width: '15px', ml: 1 }} src="/assets/icons/membership/down-arrow.svg" />
                </Box>
            </Stack>
        </Grid>
    ));

    return (
        <Card>
            <Typography sx={{ pl: 3, pt: 2, fontWeight: 500 }}>Membership Plan</Typography>

            <Divider sx={{ pb: 2 }} />
            <Grid container spacing={2} sx={{ p: 3 }}>
                {renderPlans}
            </Grid>

            <Stack spacing={2} sx={{ pl: 4, pt: 0, typography: 'body2' }}>
                <Grid container spacing={{ xs: 0.5, md: 2, mb: 3 }}>
                    <Grid item xs={12} md={4} sx={{ color: 'text.secondary' }}>
                        Plan
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ typography: 'subtitle2', textTransform: 'capitalize', color: 'text.primary' }}>
                        {selectedPlan || '-'}
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 0.5, md: 2, mb: 3 }}>
                    <Grid item xs={12} md={4} sx={{ color: 'text.secondary' }}>
                        Billing name
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Button
                            onClick={openAddress.onTrue}
                            endIcon={<Iconify width={16} icon="eva:arrow-ios-downward-fill" />}
                            sx={{ typography: 'subtitle2', p: 0, borderRadius: 0, color: 'text.primary' }}
                        >
                            {primaryAddress?.name}
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 0.5, md: 2, mb: 3 }}>
                    <Grid item xs={12} md={4} sx={{ color: 'text.secondary' }}>
                        Billing address
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ color: 'text.primary' }}>
                        {primaryAddress?.fullAddress}
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 0.5, md: 2, mb: 3 }}>
                    <Grid item xs={12} md={4} sx={{ color: 'text.secondary' }}>
                        Billing phone number
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ color: 'text.primary' }}>
                        {primaryAddress?.phoneNumber}
                    </Grid>
                </Grid>

                <Grid container mb={4} spacing={{ xs: 0.5, md: 2 }}>
                    <Grid item xs={12} md={4} sx={{ color: 'text.secondary' }}>
                        Payment method
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Button
                            onClick={openCards.onTrue}
                            endIcon={<Iconify width={16} icon="eva:arrow-ios-downward-fill" />}
                            sx={{ typography: 'subtitle2', p: 0, borderRadius: 0, color: 'text.primary' }}
                        >
                            {primaryCard?.cardNumber}
                        </Button>
                    </Grid>
                </Grid>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
                <Button sx={{ borderColor: 'background.green', color: 'background.green' }} variant="outlined">Cancel Plan</Button>
                <Button sx={{ borderColor: 'background.green', bgcolor: 'background.green' }} variant="contained">Upgrade Plan</Button>
            </Stack>
        </Card>
    );
}

MembershipBillingPlan.propTypes = {
    addressBook: PropTypes.array,
    cardList: PropTypes.array,
    plans: PropTypes.array,
};
