import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id : number,
    email : string,
    phoneNumber : string,
}

export interface AuthState {
    user: User | null
    token: string | null
}
const initialState: AuthState = {
    user: null,
    token: null,
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const {login, logout} = auth.actions
export default auth.reducer