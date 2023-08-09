import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import imageGrp from '../../assets/img/profile/imageGrp.svg'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileData from '../../components/Profile/ProfileData'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { useQuery } from 'react-query'

const Profile = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const { isLoading, error, data } = useQuery('allUsers', () =>
    fetch('http://localhost:5000/all-users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'Internal server error: ' + error.message;

  // useEffect(() => {
  //   setAllUsers(data.data)
  // }, [data])
  console.log(data.data)

  const options = data.data.map((option) => {
    const firstLetter = option.email[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      ...option,
    };
  });


  return (
    <Box>
      <Box sx={{ height: '30vh', zIndex: -1, background: `linear-gradient(180deg, #3E6EC9 0%, #0D55DF 100%)`, position: 'relative' }}>
        <img
          style={{ position: 'absolute', right: 40, top: 20, cursor: 'pointer' }}
          src={imageGrp}
          alt="change-Image-icon"
        />
      </Box>
      <Grid container spacing={2} style={{ marginTop: "-120px", zIndex: 1, height: "100%" }}>
        <Autocomplete
          id="grouped-demo"
          options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.email}
          sx={{ width: '86%', margin: '0 auto', background: '#F1F1F1', borderRadius: '10px', mb: 3 }}
          renderInput={(params) => <TextField {...params} placeholder='Search user' />}
        />
        <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileForm />

        </Grid>
        <Grid item xs={12} md={7}>
          <ProfileData />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile