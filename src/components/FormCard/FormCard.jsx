import React from 'react'

const FormCard = ({text}) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#E5E5E5',
      borderRadius: '10px',
    }}>
        {text}
    </div>
  )
}

export default FormCard