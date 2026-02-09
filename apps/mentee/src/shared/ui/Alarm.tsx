import noti from '@/assets/icons/noti.svg';
import { useNotificationStore } from '../store/notification.store';
const Alarm = () => {
    // const unreadCount = useNotificationStore((s) => s.unreadCount);
    const unreadCount = 10;
    return (
        <div className="relative">
            <img src={noti} alt="noti" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px]
            bg-red-500 text-white rounded-full flex items-center justify-center">
                    {unreadCount}
                </span>
            )}
        </div>
    )
}

export default Alarm;