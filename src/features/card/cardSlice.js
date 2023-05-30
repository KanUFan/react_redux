import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        text: "",
        imageURL: "",
    },
];

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        cardAdded(state, action) {
            state.push(action.payload);
        },
    },
});

export const { cardAdded } = cardSlice.actions;

export default cardSlice.reducer;
