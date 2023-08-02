import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../layout/Login/Login';
import Dashboard from '../layout/Dashboard/Dashboard';
import Homepage from '../pages/Homepage/Homepage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import Users from '../pages/Users/Users';
import PendingPost from '../pages/PendingPost/PendingPost';
import TotalRevenue from '../pages/TotalRevenue/TotalRevenue';
import Profile from '../pages/Profile/Profile';
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
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'users',
                element: <Users />,
            },
            {
                path: 'pendingPost',
                element: <PendingPost />,
            },
            {
                path: 'totalRevenue',
                element: <TotalRevenue />,
            },
        ],
    },
    {
        path: '*',
        element: <div>Page not found</div>,
    }
]);

export default routes;
