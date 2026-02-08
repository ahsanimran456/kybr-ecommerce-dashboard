"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { categories } from "@/lib/mock-data";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", sku: "", category: "", price: "", comparePrice: "", stock: "", status: "active", description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/products");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/products" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Add New Product</h1>
          <p className="text-sm text-neutral-500 mt-1">Create a new product for your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-600 mb-2">Product Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter product name" className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">SKU *</label>
              <input type="text" name="sku" required value={formData.sku} onChange={handleChange} placeholder="e.g., PRF-001" className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Category *</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm bg-white transition-all">
                <option value="">Select category</option>
                {categories.filter(c => c.status === "active").map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Pricing (AED)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Price (AED) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">AED</span>
                <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full pl-14 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Compare Price (AED)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">AED</span>
                <input type="number" name="comparePrice" min="0" step="0.01" value={formData.comparePrice} onChange={handleChange} placeholder="0.00" className="w-full pl-14 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">Stock Quantity *</label>
              <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} placeholder="0" className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm transition-all" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Description</h3>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe your product..." className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm resize-none transition-all" />
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Product Image</h3>
          <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all cursor-pointer">
            <Upload className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-600">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-5">Status</h3>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full max-w-xs px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 text-sm bg-white transition-all">
            <option value="active">Active</option>
            <option value="inactive">Inactive (Draft)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Product"}
          </button>
          <Link href="/products" className="px-6 py-2.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
