import React from 'react'
import { useParams } from 'react-router-dom';

const Success = () => {
    const { tranId } = useParams();
    console.log(tranId);

    return (
        <div>Success : {tranId}</div>
    )
}

export default Success