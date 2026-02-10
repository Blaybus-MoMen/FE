import FeedbackPage from '@/pages/feedback/FeedbackPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import ManagePage from '@/pages/manage/Manage';
import AuthGuard from '@/shared/lib/AuthGuard';
import RootRedirect from '@/shared/lib/RootRedirect';
import BaseLayout from '@/widget/MentorLayout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootRedirect />,
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
                            path: '/mentoring/:menteeId/manage',
                            element: <ManagePage />,
                        },
                        {
                            path: '//mentoring/:menteeId/feedback',
                            element: <FeedbackPage />,
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
