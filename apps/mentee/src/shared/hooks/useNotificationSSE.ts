import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from 'event-source-polyfill';

const useNotificationSSE = (token: string) => {
    const queryClient = useQueryClient();
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!token) return;
        if (eventSourceRef.current) {
            return;
        }
        const eventSource = new EventSourcePolyfill(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/notifications/subscribe?token=${token}`,
        );
        eventSourceRef.current = eventSource;
        eventSource.onmessage = (event) => {
            try {
                const data = event.data ? JSON.parse(event.data as string) : null;
                console.log('[SSE] 알림 수신', { event, data });
            } catch {
                console.log('[SSE] 알림 수신 (raw)', event.data);
            }
            queryClient.invalidateQueries({ queryKey: ['getNotificationList'] });
            queryClient.invalidateQueries({ queryKey: ['getUnreadNotificationList'] });
        };
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