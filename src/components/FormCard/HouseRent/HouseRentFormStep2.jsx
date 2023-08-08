import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const HouseRentFormStep2 = ({ formData, onNext }) => {
    const [kitchen, setKitchen] = useState(formData.kitchen);
    const [drawing, setDrawing] = useState(formData.drawing);
    const [dining, setDining] = useState(formData.dining);
    const [belcony, setBelcony] = useState(formData.belcony);

    const handleNext = () => {
        onNext({
            kitchen,
            drawing,
            dining,
            belcony
        });
    };

    return (
        <div>

            <TextField
                required
                label="Kitchen"
                type="number"
                value={kitchen}
                onChange={(e) => setKitchen(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="drawing"
                type="number"
                value={drawing}
                onChange={(e) => setDrawing(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Dining"
                type="number"
                value={dining}
                onChange={(e) => setDining(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Belcony"
                type="number"
                value={belcony}
                onChange={(e) => setBelcony(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" color="primary" onClick={handleNext} sx={{ width: "100%" }}>
                Next
            </Button>
        </div>
    );
};

export default HouseRentFormStep2;
