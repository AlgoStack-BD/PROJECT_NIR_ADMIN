import React, { useContext, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../../provider/AuthProvider';

const HouseRentFormStep4 = ({ formData, onSubmit }) => {
    const { showForm } = useContext(AuthContext)
    console.log(showForm)
    const [img, setImg] = useState(formData.img);
    const [price, setPrice] = useState(formData.price);
    const [isPublicNumber, setIsPublicNumber] = useState(formData.isPublicNumber);
    const [fileNames, setFileNames] = useState(formData.img || []); // Initialize with existing filenames if available
    // const [isSold, setIsSold] = useState(formData.isSold);
    const [hasError, setHasError] = useState(false);
    const [userImg, setUserImg] = useState('');

    const handleFileUpload = async (e) => {
        const formData = new FormData();

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('files', e.target.files[i]);
        }

        try {
            const response = await axios.post('https://nir-house-renting-service-65vv8.ondigitalocean.app/upload', formData);
            const { message, fileNames } = response.data;

            console.log(`File upload success: ${message}`);
            setFileNames(fileNames);
        } catch (error) {
            console.error('Error uploading files:', error);
            // Handle error as needed
        }
    };


    const handleSubmission = async () => {

        if (
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
            console.log(
                'Missing required fields:',
                !price,
                !formData.location,
                !formData.type,
                formData.isNegotiable === undefined,
                !formData.bedRoom,
                !formData.bathRoom,
                !formData.kitchen,
                formData.bills.gasBill === undefined,
                formData.bills.electricBill === undefined,
                formData.bills.waterBill === undefined
            )
            setHasError(true);
            return;
        }
        // Convert array to string
        const type = formData?.type.join(',');
        const postData = {
            data: {
                userId: localStorage.getItem('userId'),
                location: formData.location,
                userName: formData.userName,
                phone: '01778287079',
                userImg: userImg,
                type: type,
                isNegotiable: formData.isNegotiable,
                bedRoom: formData.bedRoom,
                bathRoom: formData.bathRoom,
                kitchen: formData.kitchen,
                drawingRoom: formData.drawingRoom,
                diningRoom: formData.diningRoom,
                balcony: formData.balcony,
                bills: formData.bills,
                img: fileNames.join(','),
                price,
                additionalMessage: formData.additionalMessage,
                likeCount: 0,
                isPublicNumber,
                isSold: false,
                isApproved: true,
                isAdminPost: false,
            },
        };
        if (showForm === 'advertising') {
            postData.data.isAds = true;
        }else{
            postData.data.isAds = false;
        }
        
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
            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                multiple  // Allow multiple file selection
                style={{ marginBottom: '10px' }}
            />
            {fileNames.length > 0 && (
                <TextField
                    label="Images (Uploaded)"
                    value={fileNames.join(', ')}
                    fullWidth
                    margin="normal"
                    disabled
                />
            )}
            {/* <TextField
                label="Images (Comma-separated URLs)"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                fullWidth
                margin="normal"
            /> */}
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="User Image"
                value={userImg}
                onChange={(e) => setUserImg(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={<Checkbox checked={isPublicNumber} onChange={(e) => setIsPublicNumber(e.target.checked)} />}
                label="Make Public Number"
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
