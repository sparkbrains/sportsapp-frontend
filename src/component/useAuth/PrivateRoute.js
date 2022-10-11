import Login from "../Page/Login/Login";
import {Outlet, Navigate, Routes, } from "react-router-dom";
import Sportscenterowner from "../Page/Super_Adimin/Sportscenterowner/Sportscenterowner";

export const PrivateRoutes = ({children, ...rest}) => {
    let auth = localStorage.token
    console.log(auth,"authhhhhh");
    return (
        auth?.length ? <Outlet /> : <Navigate to ="/" element={<Login />} />
    )
}
export const GuestRoutes = ({children, ...rest}) => {
    let auth = localStorage.token
    return (
        !auth?.length ? <Outlet /> : <Navigate to ="/sportscenterowner" element={<Sportscenterowner />} />
    )
}

// export default PrivateRoutes;