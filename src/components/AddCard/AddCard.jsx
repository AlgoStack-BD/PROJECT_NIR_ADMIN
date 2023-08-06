import React from 'react'
import styles from '../../assets/css/addCard.module.css'
import addIcon from '../../assets/img/home/icon-plus.svg'

const AddCard = ({ text }) => {
    const handleClick = () => {
        console.log('clicked', text)
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={addIcon} alt="add-icon" />
            <p style={{textAlign: 'center', marginTop:'10px'}}>Add {text}</p>
        </div>
    )
}

export default AddCard