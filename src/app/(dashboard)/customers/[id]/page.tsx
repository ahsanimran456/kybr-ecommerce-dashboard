"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, ShoppingCart, DollarSign, Calendar, Package } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { customers, orders } from "@/lib/mock-data";

export default function CustomerDetailPage() {
  const params = useParams();
  const customer = customers.find((c) => c.id === params.id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-500 text-lg">Customer not found</p>
        <Link href="/customers" className="text-neutral-900 hover:text-neutral-600 font-medium mt-2 transition-colors">Back to Customers</Link>
      </div>
    );
  }

  const customerOrders = orders.filter((o) => o.customer.email === customer.email);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/customers"
          className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Customer Details</h1>
          <p className="text-sm text-neutral-500 mt-1">{customer.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile Card */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {customer.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="text-xl font-bold text-neutral-900">{customer.name}</h3>
            <div className="mt-2">
              <StatusBadge status={customer.status} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">{customer.city}, UAE</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">Joined {formatDate(customer.joinedAt)}</span>
            </div>
          </div>
        </div>

        {/* Stats & Orders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-neutral-200/80 p-4 text-center group hover:bg-neutral-900 transition-colors duration-300">
              <ShoppingCart className="w-5 h-5 text-neutral-400 mx-auto mb-2 group-hover:text-white transition-colors" />
              <p className="text-2xl font-bold text-neutral-900 group-hover:text-white transition-colors">{customer.totalOrders}</p>
              <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Total Orders</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200/80 p-4 text-center group hover:bg-neutral-900 transition-colors duration-300">
              <DollarSign className="w-5 h-5 text-neutral-400 mx-auto mb-2 group-hover:text-white transition-colors" />
              <p className="text-2xl font-bold text-neutral-900 group-hover:text-white transition-colors">{formatCurrency(customer.totalSpent)}</p>
              <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Total Spent</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200/80 p-4 text-center group hover:bg-neutral-900 transition-colors duration-300">
              <Package className="w-5 h-5 text-neutral-400 mx-auto mb-2 group-hover:text-white transition-colors" />
              <p className="text-2xl font-bold text-neutral-900 group-hover:text-white transition-colors">{formatCurrency(customer.totalSpent / customer.totalOrders)}</p>
              <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Avg. Order</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200/80 p-4 text-center group hover:bg-neutral-900 transition-colors duration-300">
              <Calendar className="w-5 h-5 text-neutral-400 mx-auto mb-2 group-hover:text-white transition-colors" />
              <p className="text-lg font-bold text-neutral-900 group-hover:text-white transition-colors">{formatDate(customer.lastOrder)}</p>
              <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">Last Order</p>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order History</h3>
            {customerOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Order</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {customerOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/orders/${order.id}`} className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-500">{formatDateTime(order.createdAt)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-neutral-900">{formatCurrency(order.total)}</td>
                        <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-8">No orders found for this customer</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
