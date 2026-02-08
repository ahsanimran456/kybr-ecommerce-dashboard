"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { orders, type Order } from "@/lib/mock-data";

export default function OrdersPage() {
  const columns = [
    {
      key: "orderNumber",
      label: "Order",
      render: (item: Order) => (
        <Link href={`/orders/${item.id}`} className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
          {item.orderNumber}
        </Link>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (item: Order) => (
        <div>
          <p className="font-medium text-neutral-900 text-sm">{item.customer.name}</p>
          <p className="text-xs text-neutral-400">{item.customer.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (item: Order) => (
        <span className="text-sm text-neutral-600">{item.items.length} item(s)</span>
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (item: Order) => (
        <span className="text-sm font-semibold text-neutral-900">{formatCurrency(item.total)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: Order) => <StatusBadge status={item.status} />,
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (item: Order) => <StatusBadge status={item.paymentStatus} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: Order) => (
        <span className="text-sm text-neutral-500">{formatDateTime(item.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Order) => (
        <Link
          href={`/orders/${item.id}`}
          className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors inline-flex"
        >
          <Eye className="w-4 h-4" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Orders</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage and track all customer orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200/80 p-4 hover:shadow-md hover:border-neutral-300 transition-all duration-300">
          <p className="text-sm text-neutral-500">All Orders</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200/80 p-4 hover:shadow-md hover:border-neutral-300 transition-all duration-300">
          <p className="text-sm text-neutral-500">Pending</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{orders.filter(o => o.status === "pending").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200/80 p-4 hover:shadow-md hover:border-neutral-300 transition-all duration-300">
          <p className="text-sm text-neutral-500">Processing</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{orders.filter(o => o.status === "processing").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200/80 p-4 hover:shadow-md hover:border-neutral-300 transition-all duration-300">
          <p className="text-sm text-neutral-500">Delivered</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{orders.filter(o => o.status === "delivered").length}</p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={orders}
        searchPlaceholder="Search orders..."
        searchKey="orderNumber"
      />
    </div>
  );
}
