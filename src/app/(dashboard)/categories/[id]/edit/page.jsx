"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, X, ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const fileInputRef = useRef(null);
  const hasFetched = useRef(false);

  const [loading, setLoading] = useState(true);       // page loading
  const [saving, setSaving] = useState(false);         // save button
  const [deletingCat, setDeletingCat] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", is_active: true });
  const [image, setImage] = useState(null);            // new File object (if changed)
  const [imagePreview, setImagePreview] = useState(null); // preview URL (new or existing)
  const [existingImage, setExistingImage] = useState(null); // current image from server
  const [notFound, setNotFound] = useState(false);

  // ---- Fetch Category Details ----
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    const result = await api.get(`/admin/categories/${params.id}`);

    if (result.success) {
      const cat = result.data?.data || result.data;
      setFormData({
        name: cat.name || "",
        description: cat.description || "",
        is_active: cat.is_active ?? true,
      });
      const imgUrl = cat.image_url || cat.image || null;
      setExistingImage(imgUrl);
      setImagePreview(imgUrl);
    } else {
      setNotFound(true);
      toast.error(result.message || "Category not found");
    }

    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Handle Input Changes ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---- Image Selection ----
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PNG, JPG, WEBP files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ---- Remove Image ----
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setExistingImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---- Drag & Drop ----
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageChange({ target: { files: [file] } });
    }
  };

  // ---- Submit (PUT Update) ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("is_active", formData.is_active);
    if (image) {
      payload.append("image", image);
    }

    const result = await api.put(`/admin/categories/${params.id}`, payload);

    if (result.success) {
      toast.success("Category updated successfully!");
      router.push("/categories");
    } else {
      toast.error(result.message || "Failed to update category");
    }

    setSaving(false);
  };

  // ---- Delete Category ----
  const handleDelete = async () => {
    setDeletingCat(true);
    const result = await api.delete(`/admin/categories/${params.id}`);

    if (result.success) {
      toast.success("Category deleted successfully");
      setShowDeleteModal(false);
      router.push("/categories");
    } else {
      toast.error(result.message || "Failed to delete category");
    }

    setDeletingCat(false);
  };

  // ---- Loading State ----
  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-neutral-100 rounded-lg animate-pulse" />
          <div>
            <div className="h-7 w-48 bg-neutral-100 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-neutral-50 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6 space-y-5">
          <div className="h-5 w-36 bg-neutral-100 rounded animate-pulse" />
          <div className="h-10 bg-neutral-50 rounded-lg animate-pulse" />
          <div className="h-10 bg-neutral-50 rounded-lg animate-pulse" />
          <div className="h-24 bg-neutral-50 rounded-lg animate-pulse" />
        </div>
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <div className="h-36 bg-neutral-50 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  // ---- Not Found ----
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-500 text-lg">Category not found</p>
        <Link href="/categories" className="text-neutral-900 hover:text-neutral-600 font-medium mt-2 transition-colors">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/categories" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Edit Category</h1>
            <p className="text-sm text-neutral-500 mt-1">Update {formData.name}</p>
          </div>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Details */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Category Details</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Category Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Perfumes"
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe this category..."
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm resize-none transition-all"
              />
            </div>

            {/* Active Status Toggle */}
            <div className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-neutral-700">Category Status</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {formData.is_active ? "Category is visible to customers" : "Category is hidden from customers"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, is_active: !prev.is_active }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 ${
                  formData.is_active ? "bg-neutral-900" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    formData.is_active ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Category Image */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Category Image</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative group">
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
                {image ? (
                  // New local file preview
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  // Existing remote image
                  <Image
                    src={imagePreview}
                    alt="Category image"
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {image && (
                <p className="text-xs text-neutral-400 mt-2">{image.name} — {(image.size / 1024).toFixed(1)} KB</p>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-7 h-7 text-neutral-400" />
              </div>
              <p className="text-sm font-medium text-neutral-600">Click to upload or drag and drop</p>
              <p className="text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Update Category
              </>
            )}
          </button>
          <Link href="/categories" className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${formData.name}"? This action cannot be undone and all associated data will be permanently removed.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        loading={deletingCat}
        variant="danger"
      />
    </div>
  );
}
