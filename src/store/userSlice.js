import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: "",
    currentUser: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.currentUser = action.payload.currentUser;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.loading = false;
        },
        loginFailed(state) {
            state.loading = false;
            state.error = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = "";
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        replaceUserData(state, action) {
            state.currentUser = action.payload;
        },
    }
})

export const { loginStart, loginSuccess, loginFailed, replaceUserData, logout } = userSlice.actions

export default userSlice.reducer