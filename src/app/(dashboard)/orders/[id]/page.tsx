"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { orders } from "@/lib/mock-data";

export default function OrderDetailPage() {
  const params = useParams();
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-500 text-lg">Order not found</p>
        <Link href="/orders" className="text-neutral-900 hover:text-neutral-600 font-medium mt-2 transition-colors">Back to Orders</Link>
      </div>
    );
  }

  const statusSteps = ["pending", "processing", "shipped", "delivered"];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/orders"
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{order.orderNumber}</h1>
            <p className="text-sm text-neutral-500 mt-1">Order placed on {formatDateTime(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      {/* Order Progress */}
      {order.status !== "cancelled" && order.status !== "refunded" && (
        <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Order Progress</h3>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, idx) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      idx <= currentStep
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p
                    className={`text-xs mt-2 capitalize font-medium ${
                      idx <= currentStep ? "text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {idx < statusSteps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 transition-colors ${
                      idx < currentStep ? "bg-neutral-900" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-5 h-5 text-neutral-400" />
              <h3 className="text-lg font-semibold text-neutral-900">Order Items</h3>
            </div>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-500 text-xs font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                      <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-neutral-900">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-xs text-neutral-400">{formatCurrency(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="text-neutral-700">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shipping</span>
                <span className="text-neutral-700">{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Tax (VAT 5%)</span>
                <span className="text-neutral-700">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-neutral-200">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Update Order Status</h3>
            <div className="flex items-center gap-3">
              <select className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
              <button className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-neutral-400" />
              <h3 className="text-lg font-semibold text-neutral-900">Customer</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-900">{order.customer.name}</p>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Mail className="w-4 h-4 text-neutral-400" />
                {order.customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Phone className="w-4 h-4 text-neutral-400" />
                {order.customer.phone}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-neutral-400" />
              <h3 className="text-lg font-semibold text-neutral-900">Shipping</h3>
            </div>
            <div className="flex items-start gap-2 text-sm text-neutral-500">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <span>{order.shippingAddress}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-neutral-400" />
              <h3 className="text-lg font-semibold text-neutral-900">Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Method</span>
                <span className="text-neutral-900 font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Status</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Amount</span>
                <span className="text-neutral-900 font-bold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <h3 className="text-lg font-semibold text-neutral-900">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Created</span>
                <span className="text-neutral-600">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Updated</span>
                <span className="text-neutral-600">{formatDateTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
