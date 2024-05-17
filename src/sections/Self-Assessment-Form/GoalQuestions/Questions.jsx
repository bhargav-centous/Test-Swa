import React from 'react'
import Proptypes from 'prop-types'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'

import useStep from 'src/hooks/Use-step';

import QuestionList from 'src/sections/Self-Assessment-Form/GoalQuestions/QuestionLIst';

export function Questions({ selectedGoals, onNext }) {
    const questionSteper = useStep(0)

    const handleNext = () => {
        questionSteper.onNext(questionSteper.currentStep + 1)
    };

    const handleBack = () => {
        questionSteper.onPrevious(questionSteper.currentStep - 1)
    };

    const actioveGoal = Number(selectedGoals[questionSteper.currentStep] + 1)

    return (
        <Card sx={{ pb: 2, mb: 3 }}>
            <Typography sx={{ px: 3, py: 2, fontSize: 14, fontWeight: 500 }}>{`Goal ${actioveGoal}`}</Typography>
            <Divider sx={{ mb: 2 }} />

            <Stepper activeStep={questionSteper.currentStep}>
                <Stack sx={{ px: 3 }} width={1} direction='column'>
                    <QuestionList />
                    <Stack direction='row' justifyContent='space-between'>
                        <Button
                            hidden
                            variant='outlined'
                            onClick={handleBack}
                            sx={{ mr: 1, visibility: questionSteper.currentStep === 0 ? 'hidden' : 'visible', color: 'background.green' }}
                        >
                            Prev
                        </Button>
                        {questionSteper.currentStep === selectedGoals.length - 1 ?
                            <Button sx={{ bgcolor: 'background.green', color: 'common.white', fontSize: 14, fontWeight: 500 }} variant='contained' onClick={onNext}>
                                Submit
                            </Button> :
                            <Button sx={{ bgcolor: 'background.green', color: 'common.white', fontSize: 14, fontWeight: 500 }} variant='contained' onClick={handleNext}>
                                Next
                            </Button>}
                    </Stack>
                </Stack>
            </Stepper>

        </Card >
    )
}

Questions.propTypes = {
    selectedGoals: Proptypes.array,
    onNext: Proptypes.func,
}