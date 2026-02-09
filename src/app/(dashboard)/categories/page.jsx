"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, RefreshCw, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

const LIMIT = 20;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: "" });

  // ---- Pagination State ----
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / LIMIT);

  // ---- Fetch Categories from API ----
  const fetchCategories = useCallback(async (pageNum = 1) => {
    setLoading(true);
    const result = await api.get(`/admin/categories?page=${pageNum}&limit=${LIMIT}`);

    if (result.success) {
      const responseData = result.data?.data || result.data;
      const list = responseData?.items || responseData?.categories || responseData || [];
      setCategories(Array.isArray(list) ? list : []);

      // Set pagination from backend response
      const pagination = responseData?.pagination;
      if (pagination) {
        setTotal(pagination.total || 0);
        setPage(pagination.page || pageNum);
      }
    } else {
      toast.error(result.message || "Failed to load categories");
    }

    setLoading(false);
  }, []);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCategories(page);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Page Change ----
  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    fetchCategories(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Delete Category ----
  const openDeleteModal = (id, name) => {
    setDeleteModal({ open: true, id, name });
  };

  const handleDelete = async () => {
    const { id, name } = deleteModal;
    setDeleting(id);
    const result = await api.delete(`/admin/categories/${id}`);

    if (result.success) {
      toast.success(`"${name}" deleted successfully`);
      setDeleteModal({ open: false, id: null, name: "" });
      fetchCategories(page);
    } else {
      toast.error(result.message || "Failed to delete category");
    }

    setDeleting(null);
  };

  // ---- Filter by search (client-side within current page) ----
  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ---- Pagination range (smart page numbers) ----
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 3) { start = 2; end = 4; }
      if (page >= totalPages - 2) { start = totalPages - 3; end = totalPages - 1; }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {loading ? "Loading..." : `${total} total categories`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchCategories(page)}
            disabled={loading}
            className="p-2.5 text-neutral-500 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/categories/add"
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Category
          </Link>
        </div>
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

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden animate-pulse">
              <div className="w-full h-36 bg-neutral-100" />
              <div className="p-5">
                <div className="h-5 bg-neutral-100 rounded w-2/3 mb-2" />
                <div className="h-4 bg-neutral-100 rounded w-full mb-4" />
                <div className="h-3 bg-neutral-50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categories Grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((category) => {
              const catId = category._id || category.id;
              return (
                <div
                  key={catId}
                  className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden hover:shadow-md hover:border-neutral-300 transition-all duration-300 group"
                >
                  {/* Category Image */}
                  <div className="relative w-full h-36 bg-neutral-100 overflow-hidden">
                    {(category.image_url || category.image) ? (
                      <Image
                        src={category.image_url || category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-neutral-300" />
                      </div>
                    )}
                  </div>

                  {/* Category Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                      {category.description || "No description"}
                    </p>

                  {(category.created_at || category.createdAt) && (
                    <p className="text-xs text-neutral-400 mb-4">{formatDate(category.created_at || category.createdAt)}</p>
                  )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/categories/${catId}/edit`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(catId, category.name)}
                        disabled={deleting === catId}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {deleting === catId ? (
                          <>
                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16">
                <ImageIcon className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                <p className="text-neutral-500 font-medium">No categories found</p>
                <p className="text-sm text-neutral-400 mt-1">
                  {search ? "Try a different search term" : "Create your first category"}
                </p>
                {!search && (
                  <Link
                    href="/categories/add"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              {/* Info */}
              <p className="text-sm text-neutral-500">
                Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
              </p>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {/* Previous */}
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 text-neutral-500 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-2 text-neutral-400 text-sm">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`min-w-[36px] h-9 text-sm font-medium rounded-lg transition-colors ${
                        p === page
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 text-neutral-500 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, name: "" })}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone and all associated data will be permanently removed.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        loading={deleting === deleteModal.id}
        variant="danger"
      />
    </div>
  );
}
