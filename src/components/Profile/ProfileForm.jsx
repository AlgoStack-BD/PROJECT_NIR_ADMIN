import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import styles from '../../assets/css/profile-form.module.css'
import profilePic from '../../assets/img/profile/profile.svg'
import addButton from '../../assets/img/profile/addButton.svg'
import location from '../../assets/img/profile/location.svg'
import { useQuery } from 'react-query'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';



const ProfileForm = ({ userId }) => {
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  // for snackbar
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  // console.log(userId)
  const { isLoading, error, data } = useQuery(['singleUser', userId], () =>
    fetch(`http://localhost:5000/single-user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
  );


  const FormData = ({ text, amount }) => {
    return (
      <div className={styles.formData}>
        <span>{text}</span>
        <span>{amount}</span>
      </div>
    )
  }

  const LocationAndLink = ({ text }) => {
    let copyData = text == 'Choose current location' ? (data?.data?.location == null ? 'Sylhet' : data?.data?.location) : (data?.data?.phone == null ? '01778287079' : data?.data?.phone)
    // if(data == null) copyData = ''
    return (
      <div className={styles.locationAndLink} onClick={() => {
        handleClick(SlideTransition)();
        navigator.clipboard.writeText(copyData)
        // alert('Copied' + ' ' + copyData)
      }}>
        <p style={{ margin: '0 20px' }}>{text}</p>
        <div>
          {
            text == 'Choose current location' &&
            <img src={location} alt="location" />
          }
        </div>
      </div>
    )
  }

  if (isLoading) return 'Loading...'
  if (error) return 'Error loading data';

  console.log(data)


  return (
    <Box className={styles.formParent} >
      <div className={styles.formImage}>
        <img src={profilePic} alt="profile-image" /> {/* data?.data?.image */}
        <img src={addButton} alt="add-button-image" className={styles.addButton} />
        {/* search user here */}
      </div>
      <p variant="h5" className={styles.formTitle}>{data?.data?.name}</p>
      {/* total post for rent as owners */}
      <FormData text="Rent request applied" amount={data?.data?.totoalPost} />
      <FormData text="Total approved request" amount={data?.data?.rentSuccess} />
      {/* pending = total post - rent success */}
      <FormData text="Pending post" amount={parseInt(data?.data?.totoalPost) - parseInt(data?.data?.rentSuccess)} />

      <hr style={{
        height: '40px',
        visibility: 'hidden'
      }} />

      <LocationAndLink text="Choose current location" />
      <hr style={{
        height: '10px',
        visibility: 'hidden'
      }} />
      <LocationAndLink text="Copy phone number" />
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Copied data successfully!"
        key={state.Transition.name}
      />
    </Box >
  )
}

export default ProfileForm