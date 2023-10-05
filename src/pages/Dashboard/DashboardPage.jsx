import React from 'react'
import Card from '../../components/Dashboard/Card'
import newUser from '../../assets/img/dashboard/new-user.svg'
import TotalUser from '../../assets/img/dashboard/total-user.svg'
import pendingUser from '../../assets/img/dashboard/pending-user.svg'
import revenue from '../../assets/img/dashboard/revenue.svg'
import styles from '../../assets/css/dashboard.module.css'
import { Box, Grid } from '@mui/material'
import { useQuery } from 'react-query'


const DashboardPage = () => {

  const { data: allUsers, loading, error } = useQuery('allUsers', () => fetch('http://localhost:5000/all-users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('jwt')}`
    }
  })
    .then(res => res.json())
    // return response.data 
    .then(data => data.data)

  );
  // console.log(allUsers)
  if (loading) return 'Loading...';
  if (error) return 'Error...';


  // cards on top of the dashboard
  const CardParent = () => {

    const dateFromObjectId = (objectId) => {
      let date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
      return date;
    };

    const isWithinLast24Hours = (date) => {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      return date > twentyFourHoursAgo;
    };

    // Function to get the count of new users who joined in the last 24 hours
    const getNewUsersCountInLast24Hours = () => {
      if (Array.isArray(allUsers)) {
        return allUsers.filter(user => isWithinLast24Hours(dateFromObjectId(user._id))).length;
      }
      return 0;
    };

    // Function for getting the count of unverified users
    const getUnverifiedUsersCount = () => {
      if (Array.isArray(allUsers)) {
        return allUsers.filter(user => !user.isVerified).length;
      }
      return 0;
    };


    return <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} md={3}>
        <Card text={'New User'} number={getNewUsersCountInLast24Hours()} icon={newUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Total User'} number={allUsers ? allUsers?.length : 0} icon={TotalUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Pending User'} number={getUnverifiedUsersCount()} icon={pendingUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Revenue'} number={0} icon={revenue} />
      </Grid>
    </Grid>

  }


  return (
    <Box sx={{ px: { xs: 1, md: 5 } }}>
      <CardParent />

    </Box>
  )
}

export default DashboardPage