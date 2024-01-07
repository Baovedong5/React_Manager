import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  name: string;
  address: {
    name: string;
    code: number;
  };
}

const initialState: CounterState = {
  value: 0,
  name: "Phuong",
  address: {
    name: "Ha Noi",
    code: 10000,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
