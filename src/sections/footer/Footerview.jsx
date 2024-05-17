import React from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


const Footerview = () => {

    const handleClick = () => {
        window.open('https://www.google.com', '_blank')
    }

    return (
        <Stack direction='row' px={2} justifyContent='space-between' py={3}>
            <Typography variant='footertext'>© Sustainable World Alliance 2024</Typography>
            <Typography sx={{ cursor: 'pointer' }} onClick={handleClick} variant='footertext'>Help</Typography>
        </Stack>
    )
}

export default Footerview