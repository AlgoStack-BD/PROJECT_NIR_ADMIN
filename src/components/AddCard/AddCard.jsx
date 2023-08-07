import React, { useContext } from 'react'
import styles from '../../assets/css/addCard.module.css'
import addIcon from '../../assets/img/home/icon-plus.svg'
import FormCard from '../FormCard/FormCard'
import { AuthContext } from '../../provider/AuthProvider'

const AddCard = ({ text }) => {
    const { handleForm, showForm } = useContext(AuthContext)
    const handleClick = () => {
        handleForm(text)
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={addIcon} alt="add-icon" />
            <p style={{textAlign: 'center', marginTop:'10px'}}>Add {text}</p>
        </div>
    )
}

export default AddCard