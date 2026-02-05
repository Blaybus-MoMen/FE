import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import AuthGuard from "@/shared/lib/AuthGuard";
import BaseLayout from "@/widget/MentorLayout";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
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
                    }

                ]
            },
        ]
    },
], {
    basename: '/mentor',
})