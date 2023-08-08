import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';

const HouseRentFormStep4 = ({ formData, onSubmit }) => {
    const [img, setImg] = useState(formData.img);
    const [price, setPrice] = useState(formData.price);
    const [isPublicNumber, setIsPublicNumber] = useState(formData.isPublicNumber);
    // const [isSold, setIsSold] = useState(formData.isSold);
    const [hasError, setHasError] = useState(false);

    const handleSubmission = async () => {

        if (
            !img ||
            !price ||
            !formData.location ||
            !formData.type ||
            formData.isNegotiable === undefined ||
            !formData.bedRoom ||
            !formData.bathRoom ||
            !formData.kitchen ||
            formData.bills.gasBill === undefined ||
            formData.bills.electricBill === undefined ||
            formData.bills.waterBill === undefined
        ) {
            setHasError(true);
            return;
        }


        const postData = {
            data: {
                userId: localStorage.getItem('userId'),
                location: formData.location,
                type: formData.type,
                isNegotiable: formData.isNegotiable,
                bedRoom: formData.bedRoom,
                bathRoom: formData.bathRoom,
                kitchen: formData.kitchen,
                drawingRoom: formData.drawingRoom,
                diningRoom: formData.diningRoom,
                balcony: formData.balcony,
                bills: formData.bills,
                img,
                price,
                additionalMessage: formData.additionalMessage,
                likeCount: 0,
                isPublicNumber,
                isSold: false,
                isApproved: true,
                isAdminPost: false,
            },
        };

        axios.post('http://localhost:5000/create-post', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                console.log('Post request successful:', response.data);
                onSubmit(); // Call the callback to move to the next step or handle success
            })
            .catch(error => {
                console.error('Error making POST request:', error);
                // Handle error as needed
            });
    };

    return (
        <div>
            <TextField
                label="Images (Comma-separated URLs)"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={<Checkbox checked={isPublicNumber} onChange={(e) => setIsPublicNumber(e.target.checked)} />}
                label="Public Phone Number"
            />
            {/* <FormControlLabel
                control={<Checkbox checked={isSold} onChange={(e) => setIsSold(e.target.checked)} />}
                label="Sold"
            /> */}
            <Button variant="contained" color="primary" onClick={handleSubmission} sx={{ width: '100%' }}>
                Submit
            </Button>
            {hasError && (
                <p style={{ color: 'red', marginTop: '10px' }}>Please fill in all required fields.</p>
            )}
        </div>
    );
};

export default HouseRentFormStep4;
