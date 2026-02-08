"use client";

import Link from "next/link";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { products } from "@/lib/mock-data";

export default function ProductsPage() {
  const getStockStatus = (stock) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= 10) return "low-stock";
    return "in-stock";
  };

  const columns = [
    {
      key: "name",
      label: "Product",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-500 text-xs font-bold shrink-0">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{item.name}</p>
            <p className="text-xs text-neutral-400">SKU: {item.sku}</p>
          </div>
        </div>
      ),
    },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (item) => (
        <div>
          <p className="font-semibold text-neutral-900">{formatCurrency(item.price)}</p>
          {item.comparePrice > item.price && (
            <p className="text-xs text-neutral-400 line-through">{formatCurrency(item.comparePrice)}</p>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="text-sm">{item.stock}</span>
          <StatusBadge status={getStockStatus(item.stock)} />
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (item) => <span className="text-neutral-500">{formatDate(item.createdAt)}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex items-center gap-1">
          <Link href={`/products/${item.id}/edit`} className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
          <Link href={`/products/${item.id}/edit`} className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
            <Pencil className="w-4 h-4" />
          </Link>
          <button className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your product inventory</p>
        </div>
        <Link href="/products/add" className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>
      <DataTable columns={columns} data={products} searchPlaceholder="Search products..." searchKey="name" />
    </div>
  );
}
