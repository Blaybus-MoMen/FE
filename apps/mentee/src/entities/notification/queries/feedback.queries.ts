import { useQuery } from "@tanstack/react-query"
import { notificationApi } from "../api/notification.api"


export const useGetNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getNotificationList'],
        queryFn: () => notificationApi.getNotificationList(),
    })
}

export const useGetUnreadNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getUnreadNotificationList'],
        queryFn: () => notificationApi.getUnreadNotificationList(),
    })
}

