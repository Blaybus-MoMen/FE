import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { INotificationListResponse } from "./notification.api.type"

/** 피드백 API */
export const notificationApi = {
    getNotificationList: async () => {
        const response = await ApiHelper.get<INotificationListResponse[]>(API_PATH.NOTIFICATION.LIST)
        return response
    },
    getUnreadNotificationList: async () => {
        const response = await ApiHelper.get<number>(API_PATH.NOTIFICATION.UNREAD_LIST)
        return response
    },

}