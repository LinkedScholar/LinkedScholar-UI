import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error?: string;
    attempts: number;
}

const initialState: AuthState = {
    authenticated: false,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    picture: undefined,
    status: "idle",
    error: undefined,
    attempts: 0,
};

export const fetchSession = createAsyncThunk(
    "auth/fetchSession",
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as { auth: AuthState };

        if (state.auth.attempts >= 2) {
            return rejectWithValue({ status: 429, message: "Max attempts reached" });
        }

        const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
        try {
            const response = await fetch(`${baseUrl}/api/user/session`, {
                credentials: "include",
            });

            if (response.status === 401) {
                return rejectWithValue({
                    status: 401,
                    isAuthenticated: false,
                    message: "Not authenticated",
                });
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return rejectWithValue({
                    status: response.status,
                    message: errorData.message || "Failed to fetch user session",
                });
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue({
                status: 500,
                message: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
    }
);

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
            state.error = undefined;
            state.attempts = 0;
        },
        clearError: (state) => {
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSession.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
                state.attempts += 1;
            })
            .addCase(fetchSession.fulfilled, (state, action) => {
                state.authenticated = true;
                state.username = action.payload.username;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
                state.picture = action.payload.picture;
                state.status = "succeeded";
                state.error = undefined;
                state.attempts = 0;
            })
            .addCase(fetchSession.rejected, (state, action) => {
                const status = (action.payload as any)?.status;

                if (status === 401 || state.attempts >= 2) {
                    state.authenticated = false;
                    state.status = "failed";
                } else {
                    state.status = "idle";
                }

                if (status !== 401 && state.attempts < 2) {
                    state.error = (action.payload as any)?.message || "Failed to fetch session";
                }
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
