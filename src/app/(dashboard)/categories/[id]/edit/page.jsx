"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Save, Trash2 } from "lucide-react";
import { categories } from "@/lib/mock-data";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = categories.find((c) => c.id === params.id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "", slug: category?.slug || "", description: category?.description || "", status: category?.status || "active",
  });

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-500 text-lg">Category not found</p>
        <Link href="/categories" className="text-neutral-900 hover:text-neutral-600 font-medium mt-2 transition-colors">Back to Categories</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/categories");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value,
      ...(name === "name" ? { slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") } : {}),
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/categories" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Edit Category</h1>
            <p className="text-sm text-neutral-500 mt-1">Update {category.name}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-neutral-500 bg-neutral-100 text-sm font-medium rounded-lg hover:bg-neutral-200 hover:text-neutral-700 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Category Details</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Category Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Slug</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm bg-neutral-50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm resize-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full max-w-xs px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm bg-white transition-all">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Category Image</h3>
          <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer">
            <Upload className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-600">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> {loading ? "Saving..." : "Update Category"}
          </button>
          <Link href="/categories" className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
