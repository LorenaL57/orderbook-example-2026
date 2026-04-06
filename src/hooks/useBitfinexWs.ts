import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSnapshot, updateOrder, setConnected, setError, setLoading, clearBook } from "../store/bookSlice";
import type { Precision } from "../types";

export function useBitfinexWs() {
    const dispatch = useDispatch();
    const websocketRef = useRef<WebSocket | null>(null);
    const precisionRef = useRef<Precision>('P0')

    const connectWebSocket = useCallback((precision: Precision) => {
        dispatch(setLoading(true));
        precisionRef.current = precision;
        if (websocketRef.current) {
            websocketRef.current.close();
        }
        const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
        ws.onopen = () => {
            dispatch(setConnected(true))
            ws.send(JSON.stringify({
                event: "subscribe",
                channel: "book",
                symbol: "tBTCUSD",
                prec: precision,
                freq: "F0",
                len: 25
            }
            ));
        };
        ws.onmessage = (msg) => {
            //we want to ignore the heartbeat and event objects
            const data = JSON.parse(msg.data);
            if (!Array.isArray(data)) return;
            if (data[1] === "hb") return;

            if (Array.isArray(data) && Array.isArray(data[1])) {
                if (Array.isArray(data[1][0])) {
                    dispatch(setSnapshot(data[1]));
                    dispatch(setLoading(false));
                } else {
                    dispatch(updateOrder(data[1]));
                    dispatch(setLoading(false));
                }
            }
        }
        ws.onerror = (err) => {
            dispatch(setError("WebSocket error: " + err));
            dispatch(setLoading(false));
        }
        ws.onclose = (event) => {
            dispatch(setConnected(false));
            dispatch(setLoading(false));
            if (!event.wasClean) {
                dispatch(setError("WebSocket closed unexpectedly: " + event.reason));
                dispatch(clearBook());
            }
        }
        websocketRef.current = ws
    }, [dispatch])

    const disconnectWebSocket = useCallback(() => {
        if (websocketRef.current) {
            websocketRef.current.close();

        }
        dispatch(clearBook());
        dispatch(setConnected(false));
    }, [dispatch])

    return { connectWebSocket, disconnectWebSocket }
}