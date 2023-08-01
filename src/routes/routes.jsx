import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../layout/Login/Login';
import Dashboard from '../layout/Dashboard/Dashboard';
import Homepage from '../pages/Homepage/Homepage';
// import ProtectedRoute from './ProtectedRoute';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <Dashboard />
        ),
        children: [
            {
                path: 'home',
                element: <Homepage />,
            },
        ],
    },
    {
        path: '*',
        element: <div>Page not found</div>,
    }
]);

export default routes;
