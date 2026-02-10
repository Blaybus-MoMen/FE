import { Outlet, useLocation } from "react-router";
import Alarm from "../ui/Alarm";


const ALARM_POSITION_BY_PATH: Partial<Record<string, string>> = {
    '/home': 'px-[16px] py-[20px]',
    '/my-page': 'px-[16px] py-[20px]',
    '/report': 'px-[16px] py-[15px]',
    '/manage': 'px-[16px] py-[15px]',
};
const DEFAULT_ALARM_POSITION = 'px-[16px] py-[20px]';



const AlarmLayout = () => {
    const { pathname } = useLocation();
    const positionClass = ALARM_POSITION_BY_PATH[pathname] ?? DEFAULT_ALARM_POSITION;
    return (
        <>
            <Outlet />
            <div className={`fixed top-0 right-0 z-999 pointer-events-none ${positionClass} [&>*]:pointer-events-auto`}>
                <Alarm />
            </div>
        </>
    )
}

export default AlarmLayout;