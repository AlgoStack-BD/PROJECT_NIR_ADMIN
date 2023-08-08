import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import HouseRentFormStep1 from './HouseRentFormStep1';
import HouseRentFormStep2 from './HouseRentFormStep2';
import HouseRentFormStep3 from './HouseRentFormStep3';
import HouseRentFormStep4 from './HouseRentFormStep4';

const steps = ['Required Information', 'Additional Details', 'Billing Information', 'Submission Step'];

const HouseRentForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        location: '',
        type: '',
        isNegotiable: false,
        bedRoom: 0,
        bathRoom: 0,
        kitchen: 0,
        drawing: 0,
        dining: 0,
        belcony: 0,
        floorLevel: 0,
        bills: {
            gasBill: false,
            electricBill: false,
            waterBill: false,
            otherBills: '',
        },
        additionalMessage: '',
    });

    const handleNext = (stepData) => {
        setFormData((prevData) => ({ ...prevData, ...stepData }));
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <HouseRentFormStep1 formData={formData} onNext={handleNext} />;
            case 1:
                return <HouseRentFormStep2 formData={formData} onNext={handleNext} />;
            case 2:
                return <HouseRentFormStep3 formData={formData} onNext={handleNext} />;
            case 3:
                return <HouseRentFormStep4 formData={formData} onSubmit={handleNext} />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <div style={{ width: '90%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div style={{margin: '20px auto', width: '100%'}}>
                        <p>Congratulations.. Post added to database</p>
                        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                    </div>
                ) : (
                    <div>{getStepContent(activeStep)}</div>
                )}
                <div>
                    {activeStep !== 0 && (
                        <Button variant="outlined" color="primary" onClick={handleBack} sx={{ width: "100%", mt:1 }}>
                            Back
                        </Button>
                    )}
                    {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveStep(steps.length)}
                    >
                        {activeStep === steps.length - 1 && 'Review Data'}
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default HouseRentForm;
