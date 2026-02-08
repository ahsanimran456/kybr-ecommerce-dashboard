"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { categories } from "@/lib/mock-data";
import { useState } from "react";
import { Search } from "lucide-react";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">Organize your products into categories</p>
        </div>
        <Link
          href="/categories/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl border border-neutral-200/80 p-5 hover:shadow-md hover:border-neutral-300 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center group-hover:bg-neutral-900 transition-colors duration-300">
                <FolderTree className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <StatusBadge status={category.status} />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 mb-1">{category.name}</h3>
            <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{category.description}</p>

            <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
              <span>{category.productCount} Products</span>
              <span>{formatDate(category.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/categories/${category.id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Link>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-neutral-500 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-neutral-400">
            No categories found
          </div>
        )}
      </div>
    </div>
  );
}
