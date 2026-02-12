import { useMutation, useQuery } from "@tanstack/react-query"
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



export const useReadNotificationMutation = () => {
    return useMutation({
        mutationFn: (id: number) => notificationApi.readNotification(id),
    })
}

export const useReadAllNotificationMutation = () => {
    return useMutation({
        mutationFn: () => notificationApi.readAllNotification(),
    })
}