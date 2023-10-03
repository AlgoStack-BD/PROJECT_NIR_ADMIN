import React from 'react'
import Card from '../../components/Dashboard/Card'
import newUser from '../../assets/img/dashboard/new-user.svg'
import TotalUser from '../../assets/img/dashboard/total-user.svg'
import pendingUser from '../../assets/img/dashboard/pending-user.svg'
import revenue from '../../assets/img/dashboard/revenue.svg'
import styles from '../../assets/css/dashboard.module.css'
import { Grid } from '@mui/material'
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
  console.log(allUsers)
  // if (loading) return 'Loading...';
  // cards on top of the dashboard
  const CardParent = () => {

    return <Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
      <Grid item xs={12} md={3}>
        <Card text={'New User'} number={13} icon={newUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Total User'} number={allUsers? allUsers?.length : 0} icon={TotalUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Pending User'} number={13} icon={pendingUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Revenue'} number={13} icon={revenue} />
      </Grid>
    </Grid>

  }


  return (
    <div>
      <CardParent />

    </div>
  )
}

export default DashboardPage