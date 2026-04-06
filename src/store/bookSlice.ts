import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bids: [],
    asks: [],
    precision: 'P0',
    connected: false,
    error: null,
    loading: false,

};

const chatSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setSnapshot: (state, action) => {
            action.payload.forEach(item => {
                if (item[2] > 0) {
                    state.bids.push({ price: item[0], count: item[1], amount: item[2] });
                } else {
                    state.asks.push({ price: item[0], count: item[1], amount: Math.abs(item[2]) })
                }
            })
        },

        updateOrder: (state, action) => {
            const [price, count, amount] = action.payload;
            if (count === 0) {
                state.bids = state.bids.filter(order => order.price !== price);
                state.asks = state.asks.filter(order => order.price !== price);
            } else if (count > 0 && amount > 0) {
                //check if order already exists
                const orderExistsIndex = state.bids.findIndex((order) => { return order.price === price });
                if (orderExistsIndex !== -1) {
                    state.bids[orderExistsIndex] = { price, count, amount };
                }
                //if order doesn't exist we will push the new order in the array
                else {
                    state.bids.push({ price, count, amount });
                }

            }
            else if (count > 0 && amount < 0) {
                //same logic for asks
                const orderExistsIndex = state.asks.findIndex((order) => { return order.price === price });
                if (orderExistsIndex !== -1) {
                    state.asks[orderExistsIndex] = { price, count, amount: Math.abs(amount) };
                }
                else {
                    state.asks.push({ price, count, amount: Math.abs(amount) });
                }
            }
        },
        setPrecision: (state, action) => {
            state.precision = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        clearBook: (state) => {
            state.bids = [];
            state.asks = [];
        },

    },
});

export const { setSnapshot, updateOrder, setPrecision, setConnected, setError, setLoading,clearBook

} = chatSlice.actions;

export default chatSlice.reducer;
