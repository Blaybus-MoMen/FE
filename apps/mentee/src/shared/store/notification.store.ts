import { create } from "zustand";

type Notification = {
    id: string;
    message: string;
    read: boolean;
};

type NotificationStore = {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (n: Notification) => void;
    markAllRead: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (n) =>
        set((state) => ({
            notifications: [n, ...state.notifications],
            unreadCount: state.unreadCount + 1,
        })),
    markAllRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({
                ...n,
                read: true,
            })),
            unreadCount: 0,
        })),
}));