import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}

export const showFailedToast = (message)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}