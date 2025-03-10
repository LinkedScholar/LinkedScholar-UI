import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
    status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
    authenticated: false,
    username: undefined,
    email: undefined,
    picture: undefined,
    status: "idle",
};

// Fetch user session from backend
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
    const response = await fetch("http://localhost:8080/api/user/session", {
        credentials: "include",
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
            state.email = undefined;
            state.picture = undefined;
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
                state.email = action.payload.email;
                state.picture = action.payload.picture;
                state.status = "idle";
            })
            .addCase(fetchSession.rejected, (state) => {
                state.authenticated = false;
                state.status = "failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
