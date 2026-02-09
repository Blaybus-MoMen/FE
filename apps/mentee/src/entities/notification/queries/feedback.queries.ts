import { useQuery } from "@tanstack/react-query"
import { notificationApi } from "../api/notification.api"


export const useGetNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getMyPageInfo'],
        queryFn: () => notificationApi.getNotificationList(),
    })
}

export const useGetUnreadNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getMyPageInfo'],
        queryFn: () => notificationApi.getUnreadNotificationList(),
    })
}

