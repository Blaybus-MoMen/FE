import { HomeNavbar } from "@/features/home/ui/HomeNavbar";
import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => {
    return (
        <div className="h-full w-full shadow-[0px_2px_5px_2px_#00000012] bg-[#FEFEFE]">
            <Header />
            <Outlet />
            <HomeNavbar />
        </div>
    )
}

export default MainLayout;