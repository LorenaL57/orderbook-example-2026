# Bitfinex Order Book

A real-time order book widget replicating the Bitfinex trading interface, built with React, Redux Toolkit, and TypeScript.

## Features

- Live BTC/USD order book via Bitfinex WebSocket V2 API
- Real-time bid and ask updates with correct state reconciliation
- 5 precision levels (P0 to P4)
- Connect and Disconnect controls
- Automatic reconnection on unexpected network drops
- Cumulative total calculation per price level
- Dark theme matching Bitfinex UI

## Tech Stack

- React
- Redux Toolkit
- TypeScript
- Vite
- WebSocket (Bitfinex V2 API)

## How to run

```bash
npm install
npm run dev
```

## Architecture

WebSocket logic is encapsulated in a custom `useBitfinexWs` hook using `useRef` for stable connection management. Redux handles all order book state — bids, asks, precision, connection status and loading states. The message handler distinguishes between snapshots and incremental updates using the Bitfinex V2 protocol format.