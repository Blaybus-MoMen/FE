import { HomeNavbar } from "@/features/home/ui/HomeNavbar";
import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => {
    return (
        <div className="h-full w-full flex flex-col shadow-[0px_2px_5px_2px_#00000012] bg-[#e1ecff]">
            <Header />
            <main className="flex-1 min-h-0 overflow-auto">
                <Outlet />
            </main>
            <HomeNavbar />
        </div>
    )
}

export default MainLayout;