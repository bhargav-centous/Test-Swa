'use client'

import React, { useState } from 'react'

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import useStep from 'src/hooks/Use-step';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { ListOfGoal } from 'src/sections/Self-Assessment-Form/ListOfGoal';
import DisclaimerCard from 'src/sections/Self-Assessment-Form/DisclaimerCard';
import { Questions } from 'src/sections/Self-Assessment-Form/GoalQuestions/Questions';

import FinishScreen from './FinishScreen/FinishScreen';

const SelfAssessmentForm = () => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const settings = useSettingsContext();
    const steps = useStep()

    const handleGoalToggle = (goalIndex) => {
        setSelectedGoals((prevSelectedGoals) => {
            let updatedSelectedGoals;
            if (prevSelectedGoals.includes(goalIndex)) {
                updatedSelectedGoals = prevSelectedGoals.filter((index) => index !== goalIndex);
            } else {
                updatedSelectedGoals = [...prevSelectedGoals, goalIndex];
            }
            // Sort the updatedSelectedGoals array in ascending order
            updatedSelectedGoals.sort((a, b) => a - b);
            return updatedSelectedGoals;
        });
    };

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Self Assessment Form"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Self Assessment Form', href: paths.dashboard.selfAssessmentForm },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            {steps.currentStep === 0 && <DisclaimerCard onNext={() => steps.onNext(1)} />}
            {steps.currentStep === 1 && <ListOfGoal handleGoalToggle={handleGoalToggle} selectedGoals={selectedGoals} onNext={() => steps.onNext(2)} />}
            {steps.currentStep === 2 && <Questions selectedGoals={selectedGoals} onNext={() => steps.onNext(3)} />}
            {steps.currentStep === 3 && <FinishScreen onNext={() => steps.onNext(4)} />}
        </Container>
    )
}

export default SelfAssessmentForm