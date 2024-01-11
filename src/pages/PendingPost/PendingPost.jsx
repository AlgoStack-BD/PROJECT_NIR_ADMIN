import React from 'react';
import styles from '../../assets/css/pendingPost.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const PendingPost = () => {
  const queryClient = useQueryClient();

  const DataComponent = ({ name, date, location, text, bedroom, drawingroom, diningroom, kitchen, belcony, bathroom, isNagoitable, price, withFurniture, img, id }) => {

    const dateObject = new Date(date);

    // Extracting components
    const year = dateObject.getFullYear();
    // Months are zero-based, so added 1
    const month = dateObject.getMonth() + 1; 
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    return (
      <div className={styles.infoContainer}>
        {/* user info */}
        <div className={styles.userInfo}>
          <img src={`https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1703610053~exp=1703610653~hmac=7c8f34e70e29602ea130eb5464c999f10d318f8f39e0fd5fb29b2b7f5bdac077`} alt="img" style={{ width: '40px', height: "40px", borderRadius: "50%" }} />
          <div className={styles.userInfoText}>
            <p className={styles.userName}>{name}  <span className={styles.date}>{
              // date.split('T')[0]
              'Date: ' + day + '/' + month + '/' + year + ' | Time: ' + hours + ':' + minutes + ':' + seconds
              // time also can be shown from

            }</span></p>
            <p className={styles.userLocation}>
              <FaLocationDot />
              <span className={styles.userLocationText}>{location}</span>
            </p>
          </div>
          {/* tags */}
          <div className={styles.tags}>
            <p className={styles.tag}>
              <FaTags />
              {isNagoitable == "true" ? 'Nagotiable' : 'Fixed'}
            </p>
            <p className={styles.tag}>
              <MdOutlineAttachMoney />
              {price} TK
            </p>
            <p className={styles.tag}>
              <MdOutlineAttachMoney />
              {withFurniture == 'true' ? 'Furnichair available' : 'Only rent'}
            </p>
          </div>
        </div>
        {/* post Text */}
        <p className={styles.postText}>{text}</p>
        {/* post details of rooms */}
        <div className={styles.postDetails}>
          {
            bedroom && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Bedroom</p>
              <p className={styles.postDetailsItemNumber}>{bedroom}</p>
            </div>
          }
          {
            drawingroom && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Drawing room</p>
              <p className={styles.postDetailsItemNumber}>{drawingroom}</p>
            </div>
          }
          {
            diningroom && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Dining room</p>
              <p className={styles.postDetailsItemNumber}>{diningroom}</p>
            </div>
          }
          {
            kitchen && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Kitchen</p>
              <p className={styles.postDetailsItemNumber}>{kitchen}</p>
            </div>
          }
          {
            belcony && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Belcony</p>
              <p className={styles.postDetailsItemNumber}>{belcony}</p>
            </div>
          }
          {
            bathroom && <div className={styles.postDetailsItem}>
              <p className={styles.postDetailsItemText}>Bathroom</p>
              <p className={styles.postDetailsItemNumber}>{bathroom}</p>
            </div>
          }

        </div>
        <div className={styles.images}>
          {
            img && img.split(',').map((item, index) => {
              return (
                <img src={item} alt="img" key={index} />
              )
            })
          }
        </div>
        {/* approve or ban post */}
        <div className={styles.approveOrBan}>
          <button className={styles.approve} onClick={() => handleApprovePost(id)}>Approve</button>
          <button className={styles.ban} onClick={() => handleDeclinePost(id)}>Decline</button>
        </div>
      </div>
    )
  }

  const { isLoading: pendingPostLoading, error, data: pendingPosts } = useQuery('pendingPosts', () =>
    fetch('http://localhost:5000/pending-posts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
  );

  const handleApprovePost = async (id) => {
    const data = {
      data: {
        isApproved: true
      }
    }
    JSON.stringify(data)
    const res = await axios.put(`http://localhost:5000/update-post/${id}`, data, {
      headers: {
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
    // console.log(res)
    if (res.data.status == 200) {
      alert('Post approved')
    } else {
      alert('Something went wrong, try again')
    }
    queryClient.invalidateQueries('pendingPosts')
  }

  // dedline post
  const handleDeclinePost = async (id) => {
    const data = {
      data: {
        isApproved: false
      }
    }
    JSON.stringify(data)
    const res = await axios.put(`http://localhost:5000/update-post/${id}`, data, {
      headers: {
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
    // console.log(res)
    if (res.data.status == 200) {
      alert('Post declined')
    } else {
      alert('Something went wrong, try again')
    }
    queryClient.invalidateQueries('pendingPosts')
  }

  // main return
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Number of pending post - 1</p>
      <hr className={styles.hr} />
      {
        pendingPostLoading ? 'Loading...' : pendingPosts?.data?.map((item, index) => {
          return (
            <DataComponent
              id={item?._id}
              key={index}
              name={item?.userName}
              date={item?.createdAt}
              location={item?.location}
              text={item?.additionalMessage}
              bedroom={item?.bedRoom}
              drawingroom={item?.drawingRoom}
              diningroom={item?.diningRoom}
              kitchen={item?.kitchen}
              belcony={item?.balcony}
              bathroom={item?.bathRoom}
              isNagoitable={item?.isNegotiable}
              withFurniture={item?.withFurniture}
              price={item?.price}
              img={item?.img}
            />
          )
        })
      }
      {
        error && 'Something went wrong'
      }
    </div>
  )
}

export default PendingPost