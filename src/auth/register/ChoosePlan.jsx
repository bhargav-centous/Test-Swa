import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

export default function ChoosePlan({ onNext, selectedOrganizationType }) {
    const [registerPlan, setRegisterPlan] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('');

    useEffect(() => {
        if (selectedOrganizationType === 'Individual') {
            setRegisterPlan([
                {
                    subscription: 'basic',
                    price: 49,
                    primary: false,
                    list: ['Membership', 'Promotions', 'Insights', 'Newsletter', 'Projects', 'NGO / Brand Search'],
                    description: 'Individuals'
                }
            ])
        }
        if (selectedOrganizationType === 'Ngo' || selectedOrganizationType === 'Brand') {
            setRegisterPlan([
                {
                    subscription: 'Standard',
                    price: 499,
                    primary: true,
                    list: ['Basic +', 'Self Assess / Score', 'Publish Profile page', 'Publish Ratings & Badge', 'Category Awards', 'Marketplace Search', 'SDGiCity Affiliate Program'],
                    description: 'Small / Medium Organizations'
                },
                {
                    subscription: 'premium',
                    price: 999,
                    primary: false,
                    list: ['Standard +', 'Sustainability Certification Pathways', 'NGO / Brand Link', 'Consumer Link', 'Publish Project', 'Overall Awards'],
                    description: 'Large Organizations'
                },
            ])
        }
    }, [selectedOrganizationType,]);

    const handleSelectPlan = useCallback(
        (newValue) => {
            if (newValue) {
                setSelectedPlan(newValue);
            }
        },
        []
    );

    const getCardHeaderIcon = (plan) => {
        const obj = {
            premium: '/assets/icons/membership/premium.svg',
            Standard: '/assets/icons/membership/standard.svg',
            basic: '/assets/icons/membership/basic.svg',
        }

        return obj[plan]
    }

    const renderPlans = registerPlan?.map((plan, planIndex) => (
        <Grid item xs={12} md={4} key={plan.subscription}>
            <Stack
                component={Paper}
                variant="outlined"
                onClick={() => handleSelectPlan(plan.subscription)}
                sx={{
                    p: planIndex === 1 ? 4 : 3,
                    px: 5,
                    zIndex: planIndex === 1 ? 999 : 888,
                    position: 'relative',
                    cursor: 'pointer',
                    bgcolor: '#FDFDFD',
                    ...(plan.subscription === selectedPlan && {
                        // boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                        bgcolor: 'background.green'
                    }),
                }}
            >
                <Box sx={{ width: 48, height: 48, mb: 3 }}>
                    <Box sx={{ bgcolor: plan.subscription === selectedPlan ? 'background.default' : '#A7F6BC', height: 64, width: 64, borderRadius: '50%', textAlign: 'center' }}>
                        <SvgColor sx={{ mt: '15px', height: '30px', width: '30px', bgcolor: 'background.green' }} src={getCardHeaderIcon(plan.subscription)} />
                    </Box>
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

                <Stack mb={3} direction="row" alignItems="center">
                    <SvgColor sx={{ height: '14px', width: '15px', bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green' }} src="/assets/icons/membership/dollar-sign.svg" />
                    <Typography sx={{ color: plan.subscription === selectedPlan ? 'common.white' : 'background.green', typography: 'h3' }}>{plan.price}</Typography>
                    <Box component="span" sx={{ typography: 'body2', color: plan.subscription === selectedPlan ? 'common.white' : 'text.disabled', ml: 0.5 }}>
                        /mo
                    </Box>
                </Stack>
                <Stack>
                    {plan?.list?.map((ele, index) => (
                        <Stack key={index} direction='row' mb={1} alignItems='center' spacing={2} textAlign='center'>
                            <Box sx={{
                                height: 10, width: 10,
                                borderRadius: '50%',
                                border: `1px solid ${selectedPlan === plan.subscription ? "#ffffff" : "#4B465C"}`,

                            }} component="span" />
                            <Typography sx={{ color: plan.subscription === selectedPlan ? 'common.white' : '#4B465C' }}>{ele}</Typography>
                        </Stack>
                    ))}
                </Stack>
                <Button
                    onClick={() => onNext(2)}
                    variant='contained'
                    sx={{
                        bgcolor: plan.subscription === selectedPlan ? 'common.white' : 'background.green',
                        color: plan.subscription === selectedPlan ? 'background.green' : '',
                        fontSize: 18,
                        fontWeight: 400,
                        py: 2,
                        mt: 4
                    }}
                >
                    Subscribe <Iconify ml={2} width={16} className="arrow" icon="ph:arrow-right-thin" />
                </Button>
            </Stack>
        </Grid>
    ));

    const ChoosePlanSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-track': {
            backgroundColor: theme.palette.background.green,
        }
    }));

    return (
        <Container sx={{ mb: 5 }} maxWidth='lg'>
            <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
                <Typography fontSize={24} pl={1} fontWeight={600}>Choose Your Plan</Typography>
                <FormControl sx={{ my: 2 }}>
                    <Stack direction='row' alignItems='center'>
                        <Typography color='#464646' mr={1}>Monthly</Typography>
                        <FormControlLabel control={
                            <ChoosePlanSwitch name="jason" />
                        }
                            label={
                                <Typography color='#464646'>Annual</Typography>
                            }
                        />
                    </Stack>
                </FormControl>
            </Stack>
            <Card sx={{ bgcolor: 'background.default' }}>
                <Grid justifyContent='center' container sx={{ px: 2, py: 7, }}>
                    {renderPlans}
                </Grid>
            </Card>
        </Container>
    )
}

ChoosePlan.propTypes = {
    onNext: PropTypes.func,
    selectedOrganizationType: PropTypes.func,
}