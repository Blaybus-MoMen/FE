import { useMutation, useQuery } from "@tanstack/react-query"
import { notificationApi } from "../api/notification.api"


export const useGetNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getNotificationList'],
        queryFn: () => notificationApi.getNotificationList(),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    })
}

export const useGetUnreadNotificationListQuery = () => {
    return useQuery({
        queryKey: ['getUnreadNotificationList'],
        queryFn: () => notificationApi.getUnreadNotificationList(),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    })
}



export const useReadNotificationMutation = () => {
    return useMutation({
        mutationFn: (id: number) => notificationApi.readNotification(id),
    })
}