import React from 'react';
import styles from '../../assets/css/pendingPost.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

const PendingPost = () => {
  const DataComponent = ({ name, date, location, text, bedroom, drawingroom, diningroom, kitchen, belcony, bathroom, isNagoitable, price, withFurniture, img}) => {
    return (
      <div className={styles.infoContainer}>
        {/* user info */}
        <div className={styles.userInfo}>
          <img src={`https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1703610053~exp=1703610653~hmac=7c8f34e70e29602ea130eb5464c999f10d318f8f39e0fd5fb29b2b7f5bdac077`} alt="img" style={{ width: '40px', height: "40px", borderRadius: "50%" }} />
          <div className={styles.userInfoText}>
            <p className={styles.userName}>{name}  <span className={styles.date}>({date})</span></p>
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
          <button className={styles.approve}>Approve</button>
          <button className={styles.ban}>Ban</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Number of pending post - 1</p>
      <hr className={styles.hr} />
      <DataComponent
        name="Mahinur Rahman"
        date="12/12/2021"
        location="Rajnagar, Moulvibazar"
        text="I am looking for a house which will have to have as i required. hope to find my excepted house to from here."
        bedroom="3"
        drawingroom="1"
        diningroom="1"
        kitchen="1"
        belcony="1"
        bathroom="2"
        isNagoitable={true}
        withFurniture={true}
        price="12000"
        img="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/383px-Flag_of_Bangladesh.svg.png, https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/383px-Flag_of_Bangladesh.svg.png, https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/383px-Flag_of_Bangladesh.svg.png, https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/383px-Flag_of_Bangladesh.svg.png"
      />

    </div>
  )
}

export default PendingPost