import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import AuthGuard from "@/shared/lib/AuthGuard";
import NavBarLayout from "@/shared/lib/NavBarLayout";
import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "@/shared/lib/MainLayout";
import ReportPage from "@/pages/report/ReportPage";
import ManagePage from "@/pages/manage/ManagePage";
import MyPage from "@/pages/mypage/MyPage";

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
                    {
                        path: '/my-page',
                        element: <MyPage />,
                    },
                ],
            },
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/manage',
                        element: <ManagePage />,
                    },
                    {
                        path: '/report',
                        element: <ReportPage />,
                    },

                ]
            }


        ],
    },
], {
    basename: '/mentee',
})