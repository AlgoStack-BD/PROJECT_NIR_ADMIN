import React from 'react'
import AddCard from '../../components/AddCard/AddCard'
import styles from '../../assets/css/homepage.module.css'
import { Box } from '@mui/material'

const Homepage = () => {
  return (
    <Box className={styles.parent} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, ml: { md: '40px' } }}>
      {/* make admin */}
      <h2 className={styles.heading}>Workspace admin creation</h2>
      <AddCard text="admin" />
      {/* admins post */}
      <h2 className={styles.heading}>Admin’s POST</h2>
      <Box sx={{width: '100%', display: 'flex', gap: '20px'}}>
        <AddCard text="rent house" />
        <AddCard text="advertising" />
      </Box>
    </Box>
  )
}

export default Homepage