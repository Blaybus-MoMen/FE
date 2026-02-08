import { HomeNavbar } from "@/features/home/ui/HomeNavbar";
import { Outlet } from "react-router";
const NavBarLayout = () => {
    return (
        <>
            <Outlet />
            <HomeNavbar />
        </>
    )
}

export default NavBarLayout;