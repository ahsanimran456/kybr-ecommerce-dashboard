"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Save, X, ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function AddCategoryPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);         // actual File object
  const [imagePreview, setImagePreview] = useState(null); // preview URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---- Image Selection ----
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PNG, JPG, WEBP files are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ---- Remove selected image ----
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---- Drag & Drop ----
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Reuse the same logic
      const fakeEvent = { target: { files: [file] } };
      handleImageChange(fakeEvent);
    }
  };

  // ---- Submit Form ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    // Build FormData for multipart upload
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    if (image) {
      payload.append("image", image);
    }

    const result = await api.upload("/admin/categories", payload);

    if (result.success) {
      toast.success("Category created successfully!");
      router.push("/categories");
    } else {
      toast.error(result.message || "Failed to create category");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/categories" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Add New Category</h1>
          <p className="text-sm text-neutral-500 mt-1">Create a new product category</p>
        </div>
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
          </div>
        </div>

        {/* Category Image */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Category Image</h3>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview ? (
            // ---- Image Preview ----
            <div className="relative group">
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
                <Image
                  src={imagePreview}
                  alt="Category preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                  unoptimized
                />
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
              <p className="text-xs text-neutral-400 mt-2">{image?.name} — {(image?.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            // ---- Upload Area ----
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
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Category
              </>
            )}
          </button>
          <Link href="/categories" className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
