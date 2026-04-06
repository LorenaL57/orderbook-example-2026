/* eslint-disable @typescript-eslint/no-explicit-any */
import BidAskTable from "./OrderTable";
import ConnectionManagement from "./ConnectionManagement";
import PrecisionSelection from "./PrecisionSelection";
import { useBitfinexWs } from "../hooks/useBitfinexWs";
import type { Precision } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { setPrecision, clearBook } from "../store/bookSlice";

export default function OrderBook() {
    const dispatch = useDispatch();
    const { connectWebSocket, disconnectWebSocket } = useBitfinexWs();

    const precision = useSelector((state: any) => state.book.precision);
    const loading = useSelector((state: any) => state.book.loading);
    const error = useSelector((state: any) => state.book.error);

    const connected = useSelector((state: any) => state.book.connected);

    const handlePrecisionChange = (precision: Precision) => {
        dispatch(clearBook())
        dispatch(setPrecision(precision));
        connectWebSocket(precision);
    };

    const handleConnectWs = () => {
        connectWebSocket(precision);
    };
    const handleDisconnectWs = () => {
        disconnectWebSocket();
    };

    return (
        <div className="orderbook-container">
            <h1>Order Book</h1>
            <ConnectionManagement
                onConnect={handleConnectWs}
                onDisconnect={handleDisconnectWs}
            />
            <PrecisionSelection onChangePrecision={handlePrecisionChange} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {connected ? (
                <div className="tables-wrapper">
                    <BidAskTable />
                </div>
            ) : (
                <p className="placeholder-info">Connect to WS to view the order book</p>
            )}
        </div>
    );
}
