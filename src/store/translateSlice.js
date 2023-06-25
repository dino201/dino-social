import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locale: "vi",
}

export const translateSlice = createSlice({
    name: "translate",
    initialState,
    reducers: {
        translation: (state, action) => {
            state.locale = action.payload
        }
    }


})
export const { translation } = translateSlice.actions

export default translateSlice.reducer