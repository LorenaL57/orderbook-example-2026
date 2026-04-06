export default function BidTable({ orders }) {
  return (
 
      <table className="order-table">
        <thead>
          <th>Count</th>
          <th>Amount</th>
          <th>Total</th>
          <th>Price</th>
        </thead>
        <tbody>
          {orders.slice(0, 25).map((order, index) => (
            <tr key={index} style={{ color: "#00b386" }}>
              <td>{order.count}</td>
              <td>{order.amount.toFixed(4)}</td>
              <td>{order.total.toFixed(4)}</td>
              <td>{order.price.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
  );
}
