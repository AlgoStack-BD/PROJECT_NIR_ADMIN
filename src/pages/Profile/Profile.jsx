import { Box, Grid } from '@mui/material'
import React from 'react'
import imageGrp from '../../assets/img/profile/imageGrp.svg'
import ProfileForm from '../../components/Profile/ProfileForm'

const Profile = () => {
  return (
    <Box>
      <Box sx={{ height: '30vh', zIndex: -1, background: `linear-gradient(180deg, #3E6EC9 0%, #0D55DF 100%)`, position: 'relative' }}>
        <img
          style={{ position: 'absolute', right: 40, top: 20, cursor: 'pointer' }}
          src={imageGrp}
          alt="change-Image-icon"
        />
      </Box>
      <Grid container spacing={2} style={{marginTop: "-60px", zIndex: 1, height: "100%"}}>
        <Grid item xs={12} md={5} style={{display: 'flex', justifyContent: 'center'}}>
          <ProfileForm />
        </Grid>
        <Grid item xs={12} md={7} style={{background: '#999'}}>
          asdas
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile