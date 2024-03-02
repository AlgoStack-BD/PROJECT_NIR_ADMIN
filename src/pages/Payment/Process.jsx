import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Process = () => {
    const session_id = window.location.search.split("=")[1];
    const navigate = useNavigate();

    
    const saveTransaction = async () => {
        const res = await axios.post("https://nir-house-renting-service-65vv8.ondigitalocean.app/make-payment", {
            data: {
                session_id: session_id,
                user_id: '656f1d253449d567288c1a22',
                post_id: '65d47efd1e61e6ec64beca7e',
            }
        });
        console.log(res.data)
        if (res?.data?.status === 200) {
            navigate("/payment-success");
            return res.data;
        } else if (res?.data?.status === 403) {
            navigate("/payment-success");
        } else {
            console.log(res.data)
            // return res.data;
            navigate("/payment-fail");
        }
    };

    const { data: transactionData, isLoading } = useQuery({
        queryKey: 'transactionData',
        queryFn: saveTransaction,
        enabled: session_id ? true : false,
    });

    React.useEffect(() => {
        console.log(isLoading, transactionData)
        if (!isLoading && transactionData.status === 200) {
            // Do something with transactionData if needed
            navigate("/payment-success");
        }
    }, [isLoading, transactionData, navigate]);


    return (
        <div>Processing your payment {session_id}</div>
    )
}

export default Process