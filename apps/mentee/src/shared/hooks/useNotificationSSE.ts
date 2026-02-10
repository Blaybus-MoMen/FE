import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const useNotificationSSE = (token: string) => {
    const queryClient = useQueryClient();
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!token) return;
        if (eventSourceRef.current) {
            return;
        }
        const eventSource = new EventSource(
            `http://100.50.98.194:8089/api/v1/notifications/subscribe?token=${token}`,
        );
        eventSourceRef.current = eventSource;
        eventSource.addEventListener("notification", (event: MessageEvent) => {
            try {
                const data = event.data ? JSON.parse(event.data) : null;
                console.log("[SSE] 파싱된 데이터", data);
            } catch (err) {
                console.log("[SSE] 파싱 실패", event.data, err);
            }
            queryClient.invalidateQueries({ queryKey: ['getNotificationList'] });
            queryClient.invalidateQueries({ queryKey: ['getUnreadNotificationList'] });
        });
        eventSource.onerror = () => {
            console.error("SSE 에러");
            eventSource.close();
            eventSourceRef.current = null;
        };
        return () => {
            eventSource.close();
            eventSourceRef.current = null;
        };
    }, [token, queryClient]);
};

export default useNotificationSSE;