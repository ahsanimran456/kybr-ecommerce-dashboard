"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { dashboardStats, revenueChartData, topProducts, recentOrders } from "@/lib/mock-data";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          change={dashboardStats.revenueGrowth}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={dashboardStats.ordersGrowth}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Total Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          change={dashboardStats.customersGrowth}
          icon={Users}
        />
        <StatsCard
          title="Total Products"
          value={dashboardStats.totalProducts.toLocaleString()}
          change={dashboardStats.productsGrowth}
          icon={Package}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Revenue Overview</h3>
              <p className="text-sm text-neutral-400">Monthly revenue for 2025-2026</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-neutral-900 rounded-full" />
                <span className="text-neutral-500">Revenue (AED)</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                    backgroundColor: "#fff",
                  }}
                  formatter={(value) => [formatCurrency(value as number), "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#171717" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Top Products</h3>
            <Link href="/products" className="text-sm text-neutral-500 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 11 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#525252", fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                    backgroundColor: "#fff",
                  }}
                  formatter={(value) => [value as number, "Sales"]}
                />
                <Bar dataKey="sales" fill="#404040" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
            <p className="text-sm text-neutral-400">Latest orders from your store</p>
          </div>
          <Link href="/orders" className="text-sm text-neutral-500 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Order</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/orders/${order.id}`} className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-neutral-900">{order.customer.name}</p>
                    <p className="text-xs text-neutral-400">{order.customer.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-neutral-500">{formatDateTime(order.createdAt)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-neutral-900">{formatCurrency(order.total)}</td>
                  <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-4"><StatusBadge status={order.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
