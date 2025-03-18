import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
    authenticated: false,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    picture: undefined,
    status: "idle",
};

// Fetch user session from backend
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
    let the_string = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
    const response = await fetch(the_string + "/api/user/session", {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user session");
    }

    const data = await response.json();
    console.log("✅ Session Response:", data); // Debugging

    return data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authenticated = false;
            state.username = undefined;
            state.firstName = undefined;
            state.lastName = undefined;
            state.email = undefined;
            state.picture = undefined;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSession.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSession.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.authenticated = action.payload.authenticated;
                state.username = action.payload.username || undefined;
                state.firstName = action.payload.firstName || undefined;
                state.lastName = action.payload.lastName || undefined;
                state.email = action.payload.email || undefined;
                state.picture = action.payload.picture || undefined;
                state.status = "succeeded";
            })
            .addCase(fetchSession.rejected, (state) => {
                state.authenticated = false;
                state.status = "failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
