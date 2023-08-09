import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import styles from '../../assets/css/profile-form.module.css'
import profilePic from '../../assets/img/profile/profile.svg'
import addButton from '../../assets/img/profile/addButton.svg'
import location from '../../assets/img/profile/location.svg'


const ProfileForm = () => {
  const FormData = ({ text, amount }) => {
    return (
      <div className={styles.formData}>
        <span>{text}</span>
        <span>{amount}</span>
      </div>
    )
  }

  const LocationAndLink = ({ text }) => {
    return (
      <div className={styles.locationAndLink}>
        <p style={{ margin: '0 20px' }}>{text}</p>
        <div>{
          text == 'Choose current location' && <img src={location} alt="location" />
        }</div>
      </div>
    )
  }
  return (
    <Box className={styles.formParent} >
      <div className={styles.formImage}>
        <img src={profilePic} alt="profile-image" />
        <img src={addButton} alt="add-button-image" className={styles.addButton} />
        {/* search user here */}
      </div>
      <p variant="h5" className={styles.formTitle}>Mahinur Rahman</p>
      <FormData text="Rent request applied" amount="8" />
      <FormData text="Total approved request" amount="8" />
      <FormData text="Pending post" amount="4" />

      <hr style={{
        height: '40px',
        visibility: 'hidden'
      }} />
      <LocationAndLink text="Choose current location" />
      <hr style={{
        height: '10px',
        visibility: 'hidden'
      }} />
      <LocationAndLink text="Copy profile link" />
    </Box>
  )
}

export default ProfileForm