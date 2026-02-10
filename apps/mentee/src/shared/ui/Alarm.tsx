import { useState } from 'react';
import noti from '@/assets/icons/noti.svg';
import notifi from '@/assets/icons/notifi.svg';
import { useGetNotificationListQuery, useGetUnreadNotificationListQuery, useReadAllNotificationMutation, useReadNotificationMutation } from '@/entities/notification/queries/notification.queries';
import { useQueryClient } from '@tanstack/react-query';

const Alarm = () => {
    const queryClient = useQueryClient();
    const { data: unreadCount } = useGetUnreadNotificationListQuery();

    const { data: notifications } = useGetNotificationListQuery()

    const { mutateAsync } = useReadNotificationMutation();
    const { mutateAsync: readAllNotification } = useReadAllNotificationMutation();

    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleReadNotification = async (id: number) => {
        try {
            await mutateAsync(id);
            queryClient.invalidateQueries({
                queryKey: ['getNotificationList'],
            });
            queryClient.invalidateQueries({
                queryKey: ['getUnreadNotificationList'],
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleReadAllNotification = async () => {
        try {
            await readAllNotification();
            queryClient.invalidateQueries({
                queryKey: ['getNotificationList'],
            });
            queryClient.invalidateQueries({
                queryKey: ['getUnreadNotificationList'],
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="relative inline-block z-[999]">
            <button
                type="button"
                onClick={handleToggle}
                className="relative flex items-center"
            >
                <img src={noti} alt="noti" />
                {Number(unreadCount) > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-primary-blue rounded-[12px] z-[999]">
                    <div className="h-[200px] flex flex-col p-3 text-sm text-white">
                        <div className="flex items-center justify-between gap-[4px] flex-shrink-0">
                            <div className="flex items-center gap-[4px]">
                                <img src={notifi} alt="notifi" />
                                <p className="text-[10px] text-white/80">알림</p>
                            </div>
                            {notifications && notifications.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleReadAllNotification}
                                    className="text-[10px] px-2 py-[3px] rounded-full bg-white/10 text-white/80 border border-white/30 hover:bg-white/20 transition-colors"
                                >
                                    전체 읽기
                                </button>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto mt-[10px] no-scrollbar">
                            {!notifications || notifications.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-white/60 text-[12px]">알림이 없습니다</p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {notifications?.map((noti, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-[4px] items-center p-[6px] rounded-[3px] hover:bg-white/30 active:bg-white/20 transition-all duration-200"
                                            onClick={() => handleReadNotification(noti.id)}
                                        >
                                            <span className="w-[6px] h-[6px] bg-rose-400 rounded-full flex-shrink-0"></span>
                                            {/* <p className="text-[10px] bg-white/15 px-[6px] py-[5px] rounded-[3px] text-white/90">{noti.type}</p> */}
                                            <p className="text-white">{noti.message}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alarm;