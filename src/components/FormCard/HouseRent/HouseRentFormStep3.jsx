import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const HouseRentFormStep3 = ({ formData, onNext }) => {
    const [floorLevel, setFloorLevel] = useState(formData.floorLevel);
    const [gasBill, setGasBill] = useState(formData.bills.gasBill);
    const [electricBill, setElectricBill] = useState(formData.bills.electricBill);
    const [waterBill, setWaterBill] = useState(formData.bills.waterBill);
    const [otherBills, setOtherBills] = useState(formData.bills.otherBills || '');
    const [additionalMessage, setAdditionalMessage] = useState(formData.additionalMessage);

    const handleNext = () => {
        onNext({
            floorLevel,
            bills: {
                gasBill,
                electricBill,
                waterBill,
                otherBills,
            },
            additionalMessage,
        });
        // onSubmit({

        // });
    };

    return (
        <div>
            <TextField
                label="Floor Level"
                value={floorLevel}
                type='number'
                onChange={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                    setFloorLevel(e.target.value)
                }}
                fullWidth
                margin="normal"
            />
            <p>Users bill: </p>
            <FormControlLabel
                required
                control={<Checkbox checked={gasBill} onChange={(e) => setGasBill(e.target.checked)} />}
                label="Gas Bill"
            />
            <FormControlLabel
                required
                control={<Checkbox checked={electricBill} onChange={(e) => setElectricBill(e.target.checked)} />}
                label="Electric Bill"
            />
            <FormControlLabel
                required
                control={<Checkbox checked={waterBill} onChange={(e) => setWaterBill(e.target.checked)} />}
                label="Water Bill"
            />
            <TextField
                label="Other Bills"
                value={otherBills}
                onChange={(e) => setOtherBills(e.target.value)}
                fullWidth
            />
            <TextField
                label="Additional Message"
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ width: "100%" }}>
                Next
            </Button>
        </div>
    );
};

export default HouseRentFormStep3;
