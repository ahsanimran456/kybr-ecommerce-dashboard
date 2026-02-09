// ============================================
// Kybr Admin - Custom API Request Functions
// ============================================
// Usage:
//   import { api } from "@/lib/api";
//   const data = await api.get("/products");
//   const data = await api.post("/auth/login", { email, password });
//   const data = await api.put("/products/123", { name: "Updated" });
//   const data = await api.delete("/products/123");
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ---- Helper: Get auth token from localStorage ----
function getToken() {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      return JSON.parse(token); // stored as JSON string
    } catch {
      return localStorage.getItem("token");
    }
  }
  return null;
}

// ---- Helper: Build headers ----
function buildHeaders(customHeaders = {}, isFormData = false) {
  const headers = { ...customHeaders };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ---- Core: Make API Request ----
async function makeRequest(endpoint, options = {}) {
  const {
    method = "GET",
    data = null,
    headers = {},
    isFormData = false,
  } = options;

  const url = `${BASE_URL}${endpoint}`;

  const config = {
    method,
    headers: buildHeaders(headers, isFormData),
  };

  // Attach body for POST, PUT, PATCH
  if (data && method !== "GET" && method !== "DELETE") {
    config.body = isFormData ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    // Parse response
    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // If response is not ok, throw with server message
    if (!response.ok) {
      const error = new Error(responseData?.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = responseData;
      throw error;
    }

    return {
      success: true,
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    // Network error or thrown error from above
    return {
      success: false,
      message: error.message || "Something went wrong",
      status: error.status || 500,
      data: error.data || null,
    };
  }
}

// ============================================
// Exported API Methods
// ============================================

export const api = {
  // GET request - fetch data
  get: (endpoint, headers = {}) =>
    makeRequest(endpoint, { method: "GET", headers }),

  // POST request - create / send data
  post: (endpoint, data, headers = {}) =>
    makeRequest(endpoint, { method: "POST", data, headers }),

  // PUT request - full update (auto-detects FormData)
  put: (endpoint, data, headers = {}) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return makeRequest(endpoint, { method: "PUT", data, headers, isFormData });
  },

  // PATCH request - partial update (auto-detects FormData)
  patch: (endpoint, data, headers = {}) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return makeRequest(endpoint, { method: "PATCH", data, headers, isFormData });
  },

  // DELETE request - remove data
  delete: (endpoint, headers = {}) =>
    makeRequest(endpoint, { method: "DELETE", headers }),

  // POST with FormData (for file uploads)
  upload: (endpoint, formData, headers = {}) =>
    makeRequest(endpoint, { method: "POST", data: formData, headers, isFormData: true }),
};
