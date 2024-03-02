import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from '../../assets/css/forms.module.css'
import axios from 'axios';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('email');

    const { isLoading, error, data } = useQuery('allUsers', () =>
        fetch('https://nir-house-renting-service-65vv8.ondigitalocean.app/all-users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
    );

    if (isLoading) return 'Loading...';

    if (error) return 'Internal server error: ' + error.message;

    const filteredUsers = data?.data?.filter(user => user.isAdmin === false);

    const handleMakeAdmin = async () => {

        const headers = {
            'Authorization': `${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        };

        const data = {
            data: {
                isAdmin: true
            }
        };

        axios.put(`https://nir-house-renting-service-65vv8.ondigitalocean.app/update-user/${selectedUserId}`, data, { headers })
            .then(response => {
                if(response.data.status == 200){
                    alert('User is now an admin');
                }else{
                    alert('Something went wrong');
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    return (
        <div className={styles.parent}>
            <p className={styles.text}>SELECT USER TO MAKE ADMIN</p>
            <Box sx={{ display: 'flex', width: "100%", justifyContent: 'space-around', alignItems: 'center' }}>
                <p>Search via</p>
                <ToggleButtonGroup
                    value={selectedValue}
                    exclusive
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue);
                        // Reset search value when changing user type
                        setSearchValue('');
                    }}
                    aria-label="user-type"
                    className={styles.toggleParent}
                >
                    <ToggleButton className={styles.toggleBtn} value="email" aria-label="display by email">
                        Email
                    </ToggleButton>
                    <ToggleButton className={styles.toggleBtn} value="name" aria-label="display by name">
                        Name
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Stack spacing={2} sx={{ width: '100%', padding: '10px 20px' }}>
                <Autocomplete
                    id="free-solo-demo"
                    options={filteredUsers}
                    getOptionLabel={user => selectedValue === 'email' ? user.email : user.name}
                    inputValue={searchValue}
                    onInputChange={(event, value) => setSearchValue(value)}
                    renderInput={params => <TextField {...params} label={`Search by ${selectedValue}`} />}
                    onChange={(event, value) => {
                        if (selectedValue === 'email') {
                            setEmail(value.email);
                        } else {
                            setEmail('');
                        }
                        setSelectedUserId(value ? value._id : null);
                    }}
                />
            </Stack>
            <Button variant="outlined" color="primary" sx={{ width: '90%', mt: 3 }} onClick={handleMakeAdmin}>
                Confirm Admin
            </Button>
            {selectedUserId && <p>Selected user id: {selectedUserId}</p>}
        </div>
    );
}

export default MakeAdmin;
