import OrderBook from "./components/OrderBook"

function App() {
  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', color: '#888' }}>ORDER BOOK BTC/USD</h2>
      <OrderBook />
    </div>
  )
}

export default App