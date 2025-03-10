import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    locale?: string;
    authorities?: string[];
    status: "idle" | "loading" | "failed";
}


const initialState: AuthState = {
    authenticated: false,
    username: undefined,
    authorities: undefined,
    status: "idle",
};

// Async action to fetch session details
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
    const response = await fetch("http://localhost:8080/api/user/session", {
        credentials: "include", // Ensures cookies are sent
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user session");
    }
    return response.json();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authenticated = false;
            state.username = undefined;
            state.authorities = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSession.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSession.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.authenticated = action.payload.authenticated;
                state.username = action.payload.username;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
                state.authorities = action.payload.authorities;
                state.status = "idle";
            })
            .addCase(fetchSession.rejected, (state) => {
                state.authenticated = false;
                state.username = undefined;
                state.authorities = undefined;
                state.status = "failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
