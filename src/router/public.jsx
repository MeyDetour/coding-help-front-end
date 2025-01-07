import App from '../App';
import  Login  from './../pages/login';
import Register from "./../pages/register";
import Error from "./../pages/error";

export const publicRoutes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },    {
        path: '*',
        element: <Error />,
    }
];