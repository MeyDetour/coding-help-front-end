import  Private from './../pages/private';

export const privateRoutes = [
    {
        path: '/private/:subpage/*',
        element: <Private />,
    }
];