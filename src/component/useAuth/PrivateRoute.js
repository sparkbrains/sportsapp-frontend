import Login from "../Page/Login/Login";
import {Outlet, Navigate, Routes } from "react-router-dom";

const PrivateRoutes = ({children, ...rest}) => {
    let auth = {'token' : true}
    return (
        auth.token ? <Routes /> : <Navigate to ="/" element={<Login />} />
    )
}

export default PrivateRoutes;