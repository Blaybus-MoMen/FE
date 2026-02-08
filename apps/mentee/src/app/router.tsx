import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import AuthGuard from "@/shared/lib/AuthGuard";
import NavBarLayout from "@/shared/lib/NavBarLayout";
import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "@/shared/lib/MainLayout";
import ReportPage from "@/pages/report/ReportPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="login" />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <AuthGuard />,
        children: [
            {
                element: <NavBarLayout />,
                children: [
                    {
                        path: '/home',
                        element: <HomePage />,
                    },
                ],
            },
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/learning',
                        element: <>1</>,
                    },
                    {
                        path: '/report',
                        element: <ReportPage />,
                    },
                    {
                        path: '/mypage',
                        element: <>3</>,
                    },
                ]
            }


        ],
    },
], {
    basename: '/mentee',
})