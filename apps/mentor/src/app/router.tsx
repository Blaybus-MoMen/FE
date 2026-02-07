import FeedbackPage from '@/pages/feedback/FeedbackPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import ManagePage from '@/pages/manage/Manage';
import AuthGuard from '@/shared/lib/AuthGuard';
import BaseLayout from '@/widget/MentorLayout';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to="login" />,
        },
        {
            element: <BaseLayout />,
            children: [
                {
                    path: '/login',
                    element: <LoginPage />,
                },
                {
                    element: <AuthGuard />,
                    children: [
                        {
                            path: '/home',
                            element: <HomePage />,
                        },
                        {
                            path: '/feedback',
                            element: <FeedbackPage />,
                        },
                        {
                            path: '/manage',
                            element: <ManagePage />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: '/mentor',
    }
);
