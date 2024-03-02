import { Box, Divider, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import styles from '../../assets/css/profile-form.module.css'
import profilePic from '../../assets/img/profile/profile.svg'
import addButton from '../../assets/img/profile/addButton.svg'
import location from '../../assets/img/profile/location.svg'
import { useQuery, useQueryClient } from 'react-query'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import 'formdata-polyfill';

const ProfileForm = ({ userId }) => {
  const fileInput = useRef(null);
  const queryClient = useQueryClient();

  const handleFileUpload = () => {
    const token = localStorage.getItem('jwt');
    // const userId = localStorage.getItem('userId');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    console.log(fileInput?.current.files[0])
    // check size and type here
    if (fileInput?.current.files[0].size > 1024 * 1024 * 5) {
      console.log('Size too large!');

      return;
    }
    if (fileInput?.current.files[0].type !== 'image/jpeg' && fileInput?.current.files[0].type !== 'image/png' && fileInput?.current.files[0].type !== 'image/jpg') {
      console.log('This type of file is not allowed!');
      return;
    }
    var formdata = new FormData();
    formdata.append("file", fileInput?.current.files[0], fileInput?.current.files[0].name);

    const formData = new FormData(); // Renamed variable to formData
    formData.append('file', fileInput.current.files[0]);

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    fetch(`https://nir-house-renting-service-65vv8.ondigitalocean.app/update-user/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        queryClient.invalidateQueries('singleUser');
        console.log(result)
      })
      .catch((error) => console.log('error', error));
  };


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
    fetch(`https://nir-house-renting-service-65vv8.ondigitalocean.app/single-user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
  );


  const MyFormData = ({ text, amount }) => {
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
      <div className={styles.locationAndLink}
        onClick={() => {
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

  // console.log(data.data._id)

  // const handleImageUpload = async () => {
  //   console.log('baal')
  //   if (image.size > 1024 * 1024 * 5) {
  //     console.log('Size too large!');
  //   }

  //   if (
  //     image.type !== 'image/jpeg' &&
  //     image.type !== 'image/png' &&
  //     image.type !== 'image/jpg'
  //   ) {
  //     console.log('This type of file is not allowed!');
  //   }

  //   const formData = new FormData();
  //   formData.append('image', image);
  //   console.log(formData)
  //   try {
  //     const response = await axios.post(
  //       `https://nir-house-renting-service-65vv8.ondigitalocean.app/update-user-image`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     console.log(response)
  //     if (response.status === 200) {
  //       handleClick(SlideTransition)();
  //       console.log('Image uploaded successfully.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  return (
    <Box className={styles.formParent} >
      <div className={styles.formImage}>
        <img src={`https://nir-house-renting-service-65vv8.ondigitalocean.app/uploads/${data?.data?.image}`} alt="profile-image" style={{
          width: '114px',
          height: '114px',
          borderRadius: '50%',
          objectFit: 'cover'
        }} />

        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleFileUpload} // Call handleFileUpload on file selection
        />
        <img
          src={addButton}
          onClick={() => {
            // When the image is clicked, trigger the file input
            console.log('ok');
            fileInput.current.click();
          }}
          alt="add-button-image"
          className={styles.addButton}
        />
        {/* search user here */}
      </div>
      <p variant="h5" className={styles.formTitle}>{data?.data?.name}</p>
      {/* total post for rent as owners */}
      <MyFormData text="Rent request applied" amount={data?.data?.totoalPost ? data?.data?.totoalPost : 0} />
      <MyFormData text="Total approved request" amount={data?.data?.rentSuccess ? data?.data?.rentSuccess : 0} />
      {/* pending = total post - rent success */}
      <MyFormData text="Pending post" amount={isNaN(parseInt(data?.data?.totoalPost) - parseInt(data?.data?.rentSuccess)) ? 0 : parseInt(data?.data?.totoalPost) - parseInt(data?.data?.rentSuccess)} />

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