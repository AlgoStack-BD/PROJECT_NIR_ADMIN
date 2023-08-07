import React, { useContext } from 'react'
import MakeAdmin from './MakeAdmin'
import { AuthContext } from '../../provider/AuthProvider'

const FormCard = ({ text }) => {
  const { handleForm } = useContext(AuthContext)

  return (
    <div style={styles.parent}>
      <span onClick={() => handleForm('')} style={styles.cancelBtn}> X </span>
      {
        text == 'admin' &&
        <MakeAdmin />
      }
      {
        text == 'house rent' &&
        <h1>house rent</h1>
      }
      {
        text == 'advertising' &&
        <h1>ASD</h1>
      }
    </div>
  )
}

const styles = {
  parent: {
    width: '100%',
    maxWidth: '400px',
    // backgroundColor: '#E5E5E5',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    border: '1px solid #8799F0'
  },
  cancelBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '5px',
    // border: '1px solid #8799F0',
  }
}


export default FormCard