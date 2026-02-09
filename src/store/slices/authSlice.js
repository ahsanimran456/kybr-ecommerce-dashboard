import { createSlice } from "@reduxjs/toolkit";

// ---- Helper: Load from localStorage (parsed) ----
function loadFromStorage(key) {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  } catch {
    return localStorage.getItem(key); // return raw string if not JSON
  }
}

// ---- Initial State (localStorage se restore hoga agar available hai) ----
const initialState = {
  user: loadFromStorage("user"),              // { name, email, role, ... }
  token: loadFromStorage("token"),            // JWT token string
  session: loadFromStorage("session"),        // session data
  isAuthenticated: !!loadFromStorage("token"), // token hai tw true
  loading: false,
  error: null,
};

// ---- Auth Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },

    // Login success - save user + token + session
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.session = action.payload.session || null;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      // Persist in localStorage (stringify objects)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        if (action.payload.session) {
          localStorage.setItem("session", JSON.stringify(action.payload.session));
        }
      }
    },

    // Login failed
    loginFailed: (state, action) => {
      state.user = null;
      state.token = null;
      state.session = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload; // error message string
    },

    // Logout - clear everything
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.session = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("session");
      }
    },

    // Update user data (e.g. after profile update)
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    // Update session
    setSession: (state, action) => {
      state.session = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("session", JSON.stringify(action.payload));
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setLoading,
  loginSuccess,
  loginFailed,
  logout,
  setUser,
  setSession,
  clearError,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
