import React from 'react'

export default function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <h1 style={styles.title}>Oops! Something went wrong</h1>
        <p style={styles.description}>
          We're sorry, but there seems to be an issue. Please try again later.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5', // Set your preferred background color
  },
  errorBox: {
    textAlign: 'center',
    padding: '20px',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.02)',
  },
  title: {
    color: '#e74c3c', // Set your preferred text color
    marginBottom: '10px',
  },
  description: {
    color: '#333', // Set your preferred text color
  },
};