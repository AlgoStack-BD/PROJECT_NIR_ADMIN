import React from 'react'
import styles from '../../assets/css/login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate = useNavigate()
    const [error, setError] = React.useState(null)

    const handleLogin = async (e) => {
        setError(null)
        e.preventDefault()
        if (e.target.email.value === '' || e.target.password.value === '') {
            // alert('Please fill in the form')
            setError('Please fill in the form')
        }
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
            // save email password to local storage in encrypted form



            // console.log(response.data)
            if (response.data.status === 404) {
                setError(response.data.message)
            } else if (response.data.status === 500) {
                setError(response.data.message)

            } else {
                localStorage.setItem('jwt', response.data.jwt)
                if (response.data.data.isAdmin === true) {
                    navigate('/dashboard')
                } else {
                    setError('Warning: Illegal Access Detected')
                }
            }
        } catch (error) {
            setError(error)
        }

    }

    return (
        <form className={styles.form} onSubmit={handleLogin} onChange={()=> setError(null)}>
            <div className={styles.box}>
                <label htmlFor="email">Email</label>
                <input name='email' type="email" placeholder="Email" className={styles.input} />
            </div>
            <div className={styles.box}>
                <label htmlFor="email">Password</label>
                <input name='password' type="password" placeholder="Password" className={styles.input} />
            </div>
            <button className={styles.button} type='submit'>Login</button>
            {
                error && <div className={styles.error}>{error}</div>
            }
        </form>
    )
}

export default LoginForm