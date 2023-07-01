import * as React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isLoddedIn, element: Component, ...props }) => {

    return (
        isLoddedIn ? <Component {...props} /> : <Navigate to='/singin' replace />
    )
}