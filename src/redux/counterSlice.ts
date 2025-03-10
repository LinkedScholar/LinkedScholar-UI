import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed";
}

const initialState: CounterState = { value: 0, status: "idle" };

// Async function to fetch a random number
export const fetchRandomNumber = createAsyncThunk<number>(
    "counter/fetchRandomNumber",
    async () => {
        const response = await fetch("https://www.randomnumberapi.com/api/v1.0/random");
        const data = await response.json();
        return data[0]; // Assuming API returns an array with one number
    }
);

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
        reset: (state) => { state.value = 0; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomNumber.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRandomNumber.fulfilled, (state, action: PayloadAction<number>) => {
                state.value = action.payload;
                state.status = "idle";
            })
            .addCase(fetchRandomNumber.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
