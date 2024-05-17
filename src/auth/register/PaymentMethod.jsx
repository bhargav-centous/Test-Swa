import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material';
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'

import SvgColor from 'src/components/svg-color'

const DashBorder = styled('div')`
  border: 1px dashed #e8e8e8;
  margin-top: ${(props) => props.marginTop}px;
  margin-bottom: 16px;
`;

const FreeText = styled(Typography)`
  text-decoration:line-through;
`;

export default function PaymentMethod({ onPayment, isTermsSelected, selectedOrganizationType }) {
    return (
        <Card sx={{ bgcolor: 'background.neutral', px: 4, py: 4 }}>
            <Typography fontWeight={600} pb={4} variant='h5'>Payment Summery</Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography>Subscription</Typography>
                <Typography bgcolor="#FF563029" px={1} fontSize={14} borderRadius={1 / 2} py={1 / 2} color='error.dark'>{selectedOrganizationType}</Typography>
            </Stack>
            <Typography sx={{ color: 'background.green', mb: 2, fontWeight: 600 }}>Free Trial up to August</Typography>

            {/* <Stack> */}
            {/* </Stack> */}
            <Stack mt={9} mb={3} direction="row" justifyContent='end' >
                <Stack direction='row' alignItems="center">
                    <SvgColor sx={{ height: '14px', width: '15px', bgcolor: 'background.green' }} src="/assets/icons/membership/dollar-sign.svg" />
                    <FreeText sx={{ color: 'background.green', typography: 'h4', }}>99</FreeText>
                    <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
                        Free
                    </Box>
                </Stack>
            </Stack>
            {/* <Stack mt={9} mb={3} direction="row" justifyContent='end' >
                <Stack direction='row' alignItems="center">
                    <Typography sx={{ color: 'background.green', typography: 'h4' }}>Free</Typography>
                </Stack>
            </Stack> */}
            <DashBorder marginTop={33} />
            <Stack direction='row' justifyContent='space-between'>
                <Typography>Total Billed</Typography>
                <Typography> <SvgColor sx={{ height: '14px', width: '15px' }} src="/assets/icons/membership/dollar-sign.svg" />0.00</Typography>
            </Stack>
            <DashBorder marginTop={18} />
            <Button disabled={!isTermsSelected} onClick={onPayment} fullWidth sx={{ my: 3, bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained">
                Proceed
            </Button>
            {/* <Stack direction='row' justifyContent="center" >
                <Stack alignItems='center'>
                    <Typography pb={1}>Your payment is secure</Typography>
                    <img alt='secure-payment' width={60} src="/assets/images/register/secure-payment.svg" />
                </Stack>
            </Stack> */}
        </Card>
    )

}
PaymentMethod.propTypes = {
    onPayment: PropTypes.func,
    selectedOrganizationType: PropTypes.string,
    isTermsSelected: PropTypes.bool,
}