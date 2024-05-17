import PropTypes from 'prop-types'
import React, { useState } from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import BillingForm from './BillingForm'
import PaymentMethod from './PaymentMethod'

export default function PayMentDetails({ onNext, selectedOrganizationType }) {

    const [isTermsSelected, setIsTermsSelected] = useState(false)

    return (
        <Container sx={{ mb: 9 }}>
            <Stack mb={6} direction='row' justifyContent='center'>
                <Stack textAlign='center' direction='column'>
                    <Typography mb={3} fontSize={32} fontWeight={600}>Let&apos;s finish powering you up!</Typography>
                    <Typography color='text.secondary' variant='body1' fontWeight={400}>{selectedOrganizationType} plan is right for you.</Typography>
                </Stack>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <BillingForm
                        isTermsSelected={isTermsSelected}
                        setIsTermsSelected={setIsTermsSelected}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PaymentMethod
                        selectedOrganizationType={selectedOrganizationType}
                        isTermsSelected={isTermsSelected}
                        onPayment={() => onNext(3)}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

PayMentDetails.propTypes = {
    onNext: PropTypes.func,
    selectedOrganizationType: PropTypes.string,
}

