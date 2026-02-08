"use client";

import Link from "next/link";
import { Eye, Mail, Phone } from "lucide-react";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { customers, type Customer } from "@/lib/mock-data";

export default function CustomersPage() {
  const columns = [
    {
      key: "name",
      label: "Customer",
      render: (item: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {item.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{item.name}</p>
            <p className="text-xs text-neutral-400">{item.city}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (item: Customer) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-neutral-600">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            {item.email}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-600">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            {item.phone}
          </div>
        </div>
      ),
    },
    {
      key: "totalOrders",
      label: "Orders",
      render: (item: Customer) => (
        <span className="text-sm font-semibold text-neutral-900">{item.totalOrders}</span>
      ),
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      render: (item: Customer) => (
        <span className="text-sm font-semibold text-neutral-900">{formatCurrency(item.totalSpent)}</span>
      ),
    },
    {
      key: "lastOrder",
      label: "Last Order",
      render: (item: Customer) => (
        <span className="text-sm text-neutral-500">{formatDate(item.lastOrder)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: Customer) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Customer) => (
        <Link
          href={`/customers/${item.id}`}
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
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Customers</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your customer base</p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={customers}
        searchPlaceholder="Search customers..."
        searchKey="name"
      />
    </div>
  );
}
