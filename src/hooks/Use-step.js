import { useState } from 'react';

const useStep = (initialval) => {
    const [currentStep, setCurrentStep] = useState(initialval || 0);

    const onNext = (nextStep) => {
        setCurrentStep(nextStep);
    };

    const onPrevious = (prevStep) => {
        setCurrentStep(prevStep);
    };

    return {
        currentStep,
        onNext,
        onPrevious,
    };
};

export default useStep;