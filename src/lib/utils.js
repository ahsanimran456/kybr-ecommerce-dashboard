import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getStatusColor(status) {
  const colors = {
    active: "bg-neutral-900 text-white",
    inactive: "bg-neutral-100 text-neutral-500",
    pending: "bg-neutral-200 text-neutral-700",
    processing: "bg-neutral-800 text-neutral-100",
    shipped: "bg-neutral-700 text-white",
    delivered: "bg-neutral-900 text-white",
    cancelled: "bg-neutral-100 text-neutral-400 line-through",
    refunded: "bg-neutral-200 text-neutral-500",
    paid: "bg-neutral-900 text-white",
    "in-stock": "bg-neutral-900 text-white",
    "out-of-stock": "bg-neutral-200 text-neutral-500",
    "low-stock": "bg-neutral-300 text-neutral-700",
  };
  return colors[status.toLowerCase()] || "bg-neutral-100 text-neutral-600";
}
