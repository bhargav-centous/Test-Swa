import React from 'react'
import Proptypes from 'prop-types'

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { GoalDescriptionModal } from './GoalDescriptionModel'


const DashBorder = styled(`div`)`
border:1px dashed #e8e8e8;
margin-top:20px;
margin-bottom:8px;
`


export const ListOfGoal = ({ handleGoalToggle, selectedGoals, onNext }) => {
    const goalState = useBoolean()
    const handleProceed = () => {
        onNext()
    };

    return (
        <>
            <Card sx={{ pb: 2 }}>
                <Typography sx={{ pl: 3, pt: 2, fontWeight: 500 }}>List of Goal</Typography>
                <Divider sx={{ pb: 2 }} />
                <Grid sx={{ pl: 3, pt: 2 }} container spacing={2}>
                    {
                        [...Array(10)].map((goal, goalIndex) => (
                            <Grid key={goalIndex} item xs={6}>
                                <Stack direction='row' alignItems='center'>
                                    <FormControlLabel
                                        sx={{ width: '86px' }}
                                        control={
                                            <Checkbox name="antoine"
                                                onChange={() => handleGoalToggle(goalIndex)}
                                                checked={selectedGoals.includes(goalIndex)}
                                            />
                                        }
                                        label={`Goal ${goalIndex + 1}`}
                                    />
                                    <Iconify onClick={goalState.onTrue} sx={{ color: 'text.secondary', height: 24, width: 24, mx: 1, cursor: 'pointer' }} icon="ic:sharp-info" />
                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid>
                <DashBorder />
                <Stack sx={{ pr: 1.5, pt: 2 }} direction='row' justifyContent='end'>
                    <Button onClick={handleProceed} sx={{ bgcolor: 'background.green', color: 'common.white', fontSize: 14, fontWeight: 500 }} variant="contained">
                        Procced
                    </Button>
                </Stack>
            </Card>
            <GoalDescriptionModal
                onClose={goalState.onFalse}
                open={goalState.value}
            />
        </>
    )
}

ListOfGoal.propTypes = {
    handleGoalToggle: Proptypes.func,
    onNext: Proptypes.func,
    selectedGoals: Proptypes.array,
}