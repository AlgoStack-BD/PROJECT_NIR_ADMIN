import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Fail = () => {
    const { transaction_id } = useParams();
    useEffect(() => {
        // console.log(transaction_id);
        alert("Failled")
    }), [transaction_id];


    return (
        <div>Failled to make payment</div>
    )
}

export default Fail