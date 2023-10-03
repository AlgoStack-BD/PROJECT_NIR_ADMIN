import React from 'react'
import styles from '../../assets/css/dashboard.module.css'

export default function Card({ text, number, icon }) {
    return (
        <div className={styles.singleCard}>
            <div>
                <p className={styles.number}>{number}</p>
                <p className={styles.text}>{text}</p>
            </div>
            <div>
                <img src={icon} alt="icon" />
            </div>

        </div>
    )
}
