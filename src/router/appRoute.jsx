import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';
import {privateRoutes} from "./private";
import ProtectedRoute from "./protectedRoute";

export default function AppRoutes() {
    const protectedRoutes = privateRoutes.map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    }));


    const routes = useRoutes([...publicRoutes, ...protectedRoutes]);
    return <React.Fragment>{routes}</React.Fragment>;
}
