'use client'

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import useStep from 'src/hooks/Use-step';
import { useBoolean } from 'src/hooks/use-boolean';

import Layout from 'src/auth/register/Layout';
import Store from 'src/state-management/Store';
import { useAuthContext } from 'src/auth/hooks';
import NGOForm from 'src/auth/register/NGOForm';
import ChoosePlan from 'src/auth/register/ChoosePlan';
import IndividualForm from 'src/auth/register/IndividualForm';
import PayMentDetails from 'src/auth/register/PayMentDetails';

import Iconify from 'src/components/iconify';

export default function CheckRegisterStepsLayout({ children }) {
    const [selectedOrganizationType, setSelectedOrganizationType] = useState(null);
    const steps = useStep(3)
    const organizationTypeBool = useBoolean()
    const theme = useTheme();
    const { authenticated } = useAuthContext();
    const tempOrganizationTypes = [
        'Individual',
        'Ngo',
        'Brand'
    ];

    const handleOrganizationTypeChange = (event, value) => {
        setSelectedOrganizationType(value);
    };

    if (steps.currentStep === 3) {
        return <Provider store={Store}>{children}</Provider>;
    }

    if (authenticated) {
        return (
            <Box sx={{
                backgroundImage: 'url(/assets/background/bg-image.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
                height="100%">
                <Layout>
                    {steps.currentStep === 0 &&
                        <Container>
                            <Card sx={{
                                mx: 'auto',
                                pb: selectedOrganizationType ? 2 : 11,
                                maxWidth: {
                                    md: 806
                                }
                            }}>
                                <Typography variant='bluishgray' sx={{ pl: 3, pt: 5, fontWeight: 500, lineHeight: 4 }}>Are You Individual Or Organization?</Typography>
                                <Divider />
                                <Grid item xs={12} md={12} sx={{ p: 3, pb: 0 }}>
                                    <Box
                                        pb={2}
                                        rowGap={3}
                                        columnGap={2}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                        }}
                                    >
                                        <Stack>
                                            <Autocomplete
                                                // disablePortal
                                                id="combo-box-demo"
                                                options={tempOrganizationTypes}
                                                sx={{ width: 300 }}
                                                onFocus={() => organizationTypeBool.setValue(true)}
                                                onBlur={() => organizationTypeBool.setValue(false)}
                                                value={selectedOrganizationType}
                                                onChange={handleOrganizationTypeChange}
                                                renderInput={(params) => <> <FormLabel sx={{ ml: 0.5, color: organizationTypeBool.value ? theme.palette.common.black : 'text.grayishblue' }}>Organization Type <Iconify sx={{ mb: 0.8, color: 'common.required' }} icon="fa-solid:star-of-life" width={5} /></FormLabel><TextField {...params} sx={{ mt: 1 }} /> </>}
                                            />
                                        </Stack>
                                    </Box>
                                </Grid>
                                {selectedOrganizationType === 'Individual' && <IndividualForm onNext={steps.onNext} />}
                                {(selectedOrganizationType === 'Ngo' || selectedOrganizationType === 'Brand') && <NGOForm selectedOrganizationType={selectedOrganizationType} onNext={steps.onNext} />}
                            </Card>
                        </Container>}

                    {steps.currentStep === 1 &&
                        <ChoosePlan
                            selectedOrganizationType={selectedOrganizationType}
                            onNext={steps.onNext}
                        />
                    }
                    {steps.currentStep === 2 &&
                        <PayMentDetails
                            selectedOrganizationType={selectedOrganizationType}
                            onNext={steps.onNext}
                        />
                    }

                </Layout>
            </Box>
        );
    }
    return children;

}

CheckRegisterStepsLayout.propTypes = {
    children: PropTypes.node,
};
