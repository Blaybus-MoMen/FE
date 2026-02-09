import { useLocation } from 'react-router';
import Alarm from '../ui/Alarm';

const PATH_TITLE_MAP = {
    '/manage': '학습관리',
    '/report': '학습리포트',
    '/my-page': '마이페이지',
}

const Header = () => {
    const { pathname } = useLocation();
    const title = PATH_TITLE_MAP[pathname as keyof typeof PATH_TITLE_MAP];
    return (
        <div className="flex items-center justify-between px-[16px] py-[8px] bg-[#e1ecff]">
            <h3 className='text-primary-blue-dark'>{title}</h3>
            <Alarm />
        </div >
    )
}

export default Header;

