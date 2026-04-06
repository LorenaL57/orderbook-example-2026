/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { Order } from "../types";
import { useMemo } from "react";
import BidTable from "./BidTable";
import AskTable from "./AskTable";


export default function BidAskTable() {
    const asks = useSelector((state: any) => state.book.asks);
    const bids = useSelector((state: any) => state.book.bids);


    const totalAsks = useMemo(() => {
        let total = 0;
        const finalAsks = asks.map((order: Order) => {
            total += order.amount;
            return { ...order, total };
        });
        return finalAsks;
    }, [asks]);

    const totalBids = useMemo(() => {
        let total = 0;
        const finalBids = bids.map((order: Order) => {
            total += order.amount;
            return { ...order, total };
        });
        return finalBids;
    }, [bids]);

    return (
        <div className="table-container">
            <div className="table-container">
                <BidTable orders={totalBids} />
                <AskTable orders={totalAsks} />
            </div>
        </div>
    );
}
