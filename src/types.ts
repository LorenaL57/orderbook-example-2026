export interface Order {
    price: number
    count: number
    amount: number
}

export interface OrderBookState {
    bids: Order[]
    asks: Order[]
    precision: string
    connected: boolean
    error: string | null
}

export type Precision = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'