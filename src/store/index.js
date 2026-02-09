import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";

// ============================================
// Redux Store
// ============================================
// Slices:
//   auth  → user, token, isAuthenticated, loading, error
//   app   → data (dynamic), loading (per-key), sidebarCollapsed
// ============================================

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});
