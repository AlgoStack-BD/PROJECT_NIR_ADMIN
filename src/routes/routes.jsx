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
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Success from '../pages/Payment/Success';
import Fail from '../pages/Payment/Fail';
import Process from '../pages/Payment/Process';
// import ProtectedRoute from './ProtectedRoute';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: '/process-payment',
        element: <Process />,
        errorElement: <ErrorPage />
    },
    {
        path: '/payment-success',
        element: <Success />,
        errorElement: <ErrorPage />
    },
    {
        path: '/payment-fail',
        element: <Fail />,
        errorElement: <ErrorPage />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
        children: [
            {
                path: 'home',
                element: <Homepage />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'profile',
                element: <Profile />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'users',
                element: <Users />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'pendingPost',
                element: <PendingPost />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'totalRevenue',
                element: <TotalRevenue />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '*',
        element: <div>Page not found</div>,
    }
]);

export default routes;
