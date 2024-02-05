import React from 'react'
import Card from '../../components/Dashboard/Card'
import newUser from '../../assets/img/dashboard/new-user.svg'
import TotalUser from '../../assets/img/dashboard/total-user.svg'
import pendingUser from '../../assets/img/dashboard/pending-user.svg'
import revenue from '../../assets/img/dashboard/revenue.svg'
import styles from '../../assets/css/dashboard.module.css'
import { Box, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { ResponsiveContainer, PieChart, Pie, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, } from 'recharts';


const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const handleYearSelection = (e) => {
    setSelectedYear(e.target.value);
    // alert(e.target.value);
  }

  const { data: allUsers, loading, error } = useQuery('allUsers',
    () => fetch('http://localhost:5000/all-users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
      // return response.data 
      .then(data => data.data)
  );

  

  // get all subscribtion and revenue data
  const { data: allSubscribtion, loading: subscribtionLoading, error: subscribtionError } = useQuery('allSubscribtion',
    () => fetch('http://localhost:5000/all-subscriptions', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
      // return response.data
      .then(data => data.data)
  );

  console.log(allSubscribtion, subscribtionLoading, subscribtionError)

  // console.log(allUsers)
  if (loading) return 'Loading...';
  if (error) return 'Error...';


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
      return allUsers?.filter(user => isWithinLast24Hours(dateFromObjectId(user._id))).length;
    }
    return 0;
  };

  // Function for getting the count of unverified users
  const getUnverifiedUsersCount = () => {
    if (Array.isArray(allUsers)) {
      return allUsers?.filter(user => !user.isVerified).length;
    }
    return 0;
  };

  const TinyBarChart = () => {
    const data = [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 200 },
      { name: 'Mar', value: 150 },
      { name: 'Apr', value: 300 },
      { name: 'May', value: 250 },
      { name: 'Jun', value: 180 },
    ];

    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} style={{ padding: "20px" }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // cards on top of the dashboard
  const CardParent = () => {
    return <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} md={3}>
        <Card text={'New User'} number={getNewUsersCountInLast24Hours()} icon={newUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Total User'} number={allUsers ? allUsers?.length : 0} icon={TotalUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Unverified User'} number={getUnverifiedUsersCount()} icon={pendingUser} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card text={'Revenue'} number={allSubscribtion?.length * 20} icon={revenue} />
      </Grid>
    </Grid>

  }

  const data = [
    { name: 'New User', value: getNewUsersCountInLast24Hours() },
    { name: 'Total User', value: allUsers ? allUsers?.length : 0 },
    { name: 'Unverified User', value: getUnverifiedUsersCount() },
  ];

  return (
    <Box sx={{ px: { xs: 1, md: 5 } }}>
      <CardParent />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ height: 600, marginTop: '20px' }}>
          <div style={{ height: '400px', width: '100%', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
            <h3>User Visual Chart</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "10px" }}>
              <p>Total user: {allUsers ? allUsers?.length : 0}</p>
              <p>New user: {getNewUsersCountInLast24Hours()}</p>
              <p>Unvarified user: {getUnverifiedUsersCount()}</p>
            </div>
            <ResponsiveContainer style={{ paddingBottom: "30px" }}>
              <PieChart >
                <Pie
                  dataKey="value"
                  data={data}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ height: 400, background: '#f9f9f9', padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
              <h3>Revenue Generation Chart</h3>
              {/* button for selecting year */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "10px" }}>
                <p>Year</p>
                <select name="year" onChange={handleYearSelection}>
                  {
                    [2023, 2022].map(year => <option value={year} >{year}</option>)
                  }
                </select>
              </div>
            </div>
            <TinyBarChart />
          </div>
        </Grid>
      </Grid>

    </Box>
  )
}

export default DashboardPage