import React from 'react'
import Proptypes from 'prop-types'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

const DashBorder = styled(`div`)`
border:1px dashed #e8e8e8;
margin-top:20px;
margin-bottom:8px;
`


// eslint-disable-next-line react/prop-types
export default function DisclaimerCard({ onNext }) {
    const { value, onToggle } = useBoolean()
    return (
        <Card sx={{ pb: 2 }}>
            <Typography sx={{ pl: 3, pt: 2, fontWeight: 500 }}>Disclaimer</Typography>
            <Divider sx={{ pb: 2 }} />
            <Typography sx={{ pl: 3, color: '#6E7C89', pt: 2, my: 2, fontSize: 14, lineHeight: '24px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
            <Stack sx={{ pl: 1.5, pt: 2 }} direction='row' alignItems='center'>
                <Checkbox
                    checked={value}
                    onDoubleClick={() => console.info('ON DOUBLE CLICK')}
                    onClick={onToggle}
                />
                <Typography sx={{ color: '#384049', fontSize: 14 }}>I have read,understood and agreed with your terms and condition.</Typography>
            </Stack>
            <DashBorder />
            <Stack sx={{ pr: 1.5, pt: 2 }} direction='row' justifyContent='end'>
                <Button onClick={onNext} disabled={!value} sx={{ bgcolor: 'background.green', color: 'common.white', fontSize: 14, fontWeight: 500 }} variant="contained">
                    Continue
                </Button>
            </Stack>
        </Card>
    )
}

// eslint-disable-next-line react/no-typos
DisclaimerCard.propTypes = {
    onNext: Proptypes.func
};
