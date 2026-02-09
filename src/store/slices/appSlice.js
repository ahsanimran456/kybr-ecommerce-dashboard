import { createSlice } from "@reduxjs/toolkit";

// ============================================
// App Slice - General purpose store
// Use this to save any data globally
// ============================================
// Usage:
//   dispatch(setData({ key: "products", value: [...] }))
//   dispatch(setData({ key: "categories", value: [...] }))
//   const products = useSelector(state => state.app.data.products)
// ============================================

const initialState = {
  data: {},          // dynamic key-value store: { products: [], categories: [], ... }
  loading: {},       // per-key loading state: { products: true, categories: false }
  sidebarCollapsed: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Set any data by key - setData({ key: "products", value: [...] })
    setData: (state, action) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },

    // Remove data by key
    removeData: (state, action) => {
      delete state.data[action.payload];
    },

    // Set loading for a specific key
    setKeyLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },

    // Toggle sidebar
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    // Set sidebar state
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  setData,
  removeData,
  setKeyLoading,
  toggleSidebar,
  setSidebarCollapsed,
} = appSlice.actions;

export default appSlice.reducer;
