import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



export const PrivateRoute = ({isAuth, children}) => {

    return isAuth 
        ? children 
        : <Navigate to="/auth/login" />;
};
