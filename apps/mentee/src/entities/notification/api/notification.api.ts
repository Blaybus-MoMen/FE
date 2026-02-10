import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { INotificationListResponse } from "./notification.api.type"
import type { ApiResponse } from "@/shared/model/type"

/** 피드백 API */
export const notificationApi = {
    getNotificationList: async () => {
        const response = await ApiHelper.get<ApiResponse<INotificationListResponse[]>>(API_PATH.NOTIFICATION.LIST)
        return response.data
    },
    getUnreadNotificationList: async () => {
        const response = await ApiHelper.get<ApiResponse<number>>(API_PATH.NOTIFICATION.UNREAD_LIST)
        return response.data
    },
    readNotification: async (id: number) => {
        const response = await ApiHelper.patch(`${API_PATH.NOTIFICATION.READ(id)}`)
        return response
    },

}