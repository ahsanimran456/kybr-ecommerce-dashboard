"use client";

import { Provider } from "react-redux";
import { store } from "./index";

// ---- Redux Provider Wrapper for Next.js ----
// Wrap your root layout with this component
export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
