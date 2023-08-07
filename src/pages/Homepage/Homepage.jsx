import React, { useContext, useState } from 'react'
import AddCard from '../../components/AddCard/AddCard'
import styles from '../../assets/css/homepage.module.css'
import { Box } from '@mui/material'
import { AuthContext } from '../../provider/AuthProvider'
import FormCard from '../../components/FormCard/FormCard'

const Homepage = () => {
  const { showForm } = useContext(AuthContext)
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (cardText) => {
    setSelectedCard(cardText);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
      <Box className={styles.parentLeft} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, ml: { md: '40px' } }}>
        {/* make admin */}
        <h2 className={styles.heading}>Workspace admin creation</h2>
        <AddCard text="admin" onSelect={handleCardSelect} selectedCard={selectedCard} />
        {/* admins post */}
        <h2 className={styles.heading}>Admin’s POST</h2>
        <Box sx={{ width: '100%', display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
          <AddCard text="house rent" onSelect={handleCardSelect} selectedCard={selectedCard} /> 
          <AddCard text="advertising" onSelect={handleCardSelect} selectedCard={selectedCard} />
        </Box>
      </Box>
      {/* show form */}
      {showForm !== '' &&
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {
            showForm == 'admin' ? <FormCard text={showForm} /> : (showForm === 'house rent' ? <FormCard text={showForm} /> : (showForm == 'advertising') ? <FormCard text={showForm} /> : null)
          }
        </Box>
      }
    </Box>
  )
}

export default Homepage