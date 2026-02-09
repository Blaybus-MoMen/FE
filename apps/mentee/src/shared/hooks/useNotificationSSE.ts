import { useEffect, useRef } from "react";

const useNotificationSSE = (token: string) => {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!token) return;
        if (eventSourceRef.current) {
            return;
        }

        const eventSource = new EventSource(
            `/api/v1/notifications/subscribe?token=${token}`
        );

        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("알림 수신:", data);
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
    }, [token]);
};

export default useNotificationSSE;