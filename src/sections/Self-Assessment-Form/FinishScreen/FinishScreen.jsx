import React from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


const FinishScreen = () => (
    <Card sx={{ height: 650 }}>
        <Stack sx={{ marginTop: '200px' }} direction='row' justifyContent='center'>
            <Stack spacing={3} direction='column' justifyContent='center' alignItems='center' textAlign='center'>
                <img alt='sd' src="/assets/images/selfAssessment/finish.svg" />
                <Typography variant="h4">Thank you for submitting self assessment form</Typography>
                <Typography variant='bluishgray'>We will get back to you by email or call.</Typography>
                <Button sx={{ bgcolor: 'background.green', color: 'common.white', fontSize: 14, fontWeight: 500 }} variant='containde'>Go Back</Button>
            </Stack>
        </Stack>
    </Card>
)

export default FinishScreen