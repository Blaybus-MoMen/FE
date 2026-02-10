import { useLocation, useNavigate } from 'react-router';
import { Home, GraduationCap, BarChart2, UserCircle } from 'lucide-react';

const navItems = [
    { label: '홈', icon: Home, path: '/home' },
    { label: '학습 관리', icon: GraduationCap, path: '/manage' },
    { label: '학습 리포트', icon: BarChart2, path: '/report' },
    { label: '마이페이지', icon: UserCircle, path: '/my-page' },
];

export const HomeNavbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <nav
            className="fixed bottom-4 left-[20px] right-[20px] z-50 bg-white/80 backdrop-blur-xl border-t border-white/60 p-[2px] rounded-[589.29px]"
            style={{ boxShadow: '0px 0px 12px 2px #0000000D' }}
        >
            <div className="flex bg-[#f2f7fe] rounded-[589.29px] p-[2px]">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            type="button"
                            className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[21.5px] py-[5px] ${isActive ? 'bg-[#DEDEDE66]' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <Icon strokeWidth={2} size={16} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
