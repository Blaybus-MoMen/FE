import LoginPage from "@/pages/login/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
], {
    basename: "/mentor",
})