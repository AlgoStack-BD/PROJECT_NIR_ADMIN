import React, { useContext } from 'react';
import styles from '../../assets/css/login.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = React.useState(null);
    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        
        if (e.target.email.value === '' || e.target.password.value === '') {
            setError('Please fill in the form');
            return;
        }

        try {
            await login(e.target.email.value, e.target.password.value);
            navigate('/dashboard/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleLogin} onChange={() => setError(null)}>
            <div className={styles.box}>
                <label htmlFor="email">Email</label>
                <input name='email' type="email" autoComplete="true" placeholder="Email" className={styles.input} />
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
    );
};

export default LoginForm;
