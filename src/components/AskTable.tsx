export default function AskTable({ orders }) {
    return (

        <table className="order-table">
            <thead>
                <th>Price</th>
                <th>Total</th>
                <th>Amount</th>
                <th>Count</th>
            </thead>
            <tbody>
                {orders.slice(0, 25).map((order, index) => (
                    <tr key={index} style={{ color: "#ff4d4d" }}>
                        <td>{order.price.toFixed(1)}</td>
                        <td>{order.total.toFixed(4)}</td>
                        <td>{order.amount.toFixed(4)}</td>
                        <td>{order.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
}
