import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const PrivetRoute = () => {
    const { userData } = useSelector((state) => state.user)
    return userData ? (
        <Outlet />
    ) :
        (
            <Navigate to="/login" replace={true} />
        )
}

export default PrivetRoute