import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, FormControlLabel, Checkbox } from '@mui/material';

const HouseRentFormStep1 = ({ formData, onNext }) => {
    const [location, setLocation] = useState(formData.location || '');
    const [userName, setUserName] = useState(formData.userName || '');
    const [type, setType] = useState(formData.type || []);
    const [isNegotiable, setIsNegotiable] = useState(formData.isNegotiable || false);
    const [bedRoom, setBedRoom] = useState(formData.bedRoom);
    const [bathRoom, setBathRoom] = useState(formData.bathRoom);
    
    const handleNext = () => {
        onNext({
            location,
            userName,
            type,
            isNegotiable,
            bedRoom,
            bathRoom,
        });
    };

    return (
        <div>
            <TextField
                required
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                required
                label="User name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
            />
            <FormControl fullWidth margin="normal" required>
                <Select
                    required
                    placeholder='Type'
                    multiple
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                >
                    <MenuItem value="bachelor">Bachelor</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="onlyBoys">Only Boys</MenuItem>
                    <MenuItem value="girlsHostel">Girls Hostel</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                required
                control={<Checkbox checked={isNegotiable} onChange={(e) => setIsNegotiable(e.target.checked)} />}
                label="Negotiable"
            />
            <TextField
                required
                label="Bedroom"
                type="number"
                value={bedRoom}
                onChange={(e) => setBedRoom(e.target.value)}
                fullWidth
            />
            <TextField
                required
                label="Bathroom"
                type="number"
                value={bathRoom}
                onChange={(e) => setBathRoom(e.target.value)}
                fullWidth
                margin="normal"
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ width: "100%" }}>
                Next
            </Button>
        </div>
    );
};

export default HouseRentFormStep1;