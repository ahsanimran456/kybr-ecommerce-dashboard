// Mock data for the admin dashboard

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  comparePrice: number;
  stock: number;
  status: "active" | "inactive";
  image: string;
  description: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: "active" | "inactive";
  image: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  joinedAt: string;
  lastOrder: string;
  avatar: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  items: { name: string; quantity: number; price: number }[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded";
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

export const dashboardStats: DashboardStats = {
  totalRevenue: 284750.50,
  totalOrders: 1247,
  totalCustomers: 3842,
  totalProducts: 456,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  productsGrowth: 3.1,
};

export const revenueChartData = [
  { month: "Jan", revenue: 18500, orders: 95 },
  { month: "Feb", revenue: 22300, orders: 110 },
  { month: "Mar", revenue: 19800, orders: 98 },
  { month: "Apr", revenue: 25600, orders: 130 },
  { month: "May", revenue: 28900, orders: 145 },
  { month: "Jun", revenue: 32100, orders: 162 },
  { month: "Jul", revenue: 29400, orders: 148 },
  { month: "Aug", revenue: 35200, orders: 175 },
  { month: "Sep", revenue: 31800, orders: 158 },
  { month: "Oct", revenue: 38500, orders: 192 },
  { month: "Nov", revenue: 42300, orders: 210 },
  { month: "Dec", revenue: 45200, orders: 225 },
];

export const topProducts = [
  { name: "Premium Arabic Oud Perfume", sales: 342, revenue: 85500 },
  { name: "Gold Plated Watch", sales: 256, revenue: 64000 },
  { name: "Luxury Leather Bag", sales: 198, revenue: 39600 },
  { name: "Designer Sunglasses", sales: 175, revenue: 26250 },
  { name: "Silk Scarf Collection", sales: 145, revenue: 14500 },
];

export const recentOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-001",
    customer: { name: "Ahmed Al Maktoum", email: "ahmed@email.com", phone: "+971 50 123 4567" },
    items: [
      { name: "Premium Arabic Oud Perfume", quantity: 2, price: 250 },
      { name: "Gold Plated Watch", quantity: 1, price: 450 },
    ],
    total: 980,
    subtotal: 950,
    shipping: 15,
    tax: 15,
    status: "delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    shippingAddress: "Villa 45, Jumeirah Beach Road, Dubai, UAE",
    createdAt: "2026-02-07T10:30:00Z",
    updatedAt: "2026-02-08T14:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-2026-002",
    customer: { name: "Fatima Hassan", email: "fatima@email.com", phone: "+971 55 234 5678" },
    items: [
      { name: "Luxury Leather Bag", quantity: 1, price: 200 },
      { name: "Silk Scarf Collection", quantity: 3, price: 100 },
    ],
    total: 530,
    subtotal: 500,
    shipping: 15,
    tax: 15,
    status: "processing",
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    shippingAddress: "Apt 1201, Marina Walk, Dubai Marina, UAE",
    createdAt: "2026-02-07T14:20:00Z",
    updatedAt: "2026-02-07T14:20:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-2026-003",
    customer: { name: "Omar Sheikh", email: "omar@email.com", phone: "+971 52 345 6789" },
    items: [
      { name: "Designer Sunglasses", quantity: 2, price: 150 },
    ],
    total: 315,
    subtotal: 300,
    shipping: 0,
    tax: 15,
    status: "shipped",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    shippingAddress: "Office 502, Business Bay, Dubai, UAE",
    createdAt: "2026-02-06T09:15:00Z",
    updatedAt: "2026-02-07T11:30:00Z",
  },
  {
    id: "4",
    orderNumber: "ORD-2026-004",
    customer: { name: "Layla Rashid", email: "layla@email.com", phone: "+971 56 456 7890" },
    items: [
      { name: "Premium Arabic Oud Perfume", quantity: 1, price: 250 },
      { name: "Gold Plated Watch", quantity: 1, price: 450 },
      { name: "Designer Sunglasses", quantity: 1, price: 150 },
    ],
    total: 880,
    subtotal: 850,
    shipping: 15,
    tax: 15,
    status: "pending",
    paymentMethod: "Bank Transfer",
    paymentStatus: "pending",
    shippingAddress: "House 12, Al Barsha 1, Dubai, UAE",
    createdAt: "2026-02-08T08:00:00Z",
    updatedAt: "2026-02-08T08:00:00Z",
  },
  {
    id: "5",
    orderNumber: "ORD-2026-005",
    customer: { name: "Khalid Ibrahim", email: "khalid@email.com", phone: "+971 54 567 8901" },
    items: [
      { name: "Silk Scarf Collection", quantity: 5, price: 100 },
    ],
    total: 525,
    subtotal: 500,
    shipping: 10,
    tax: 15,
    status: "cancelled",
    paymentMethod: "Credit Card",
    paymentStatus: "refunded",
    shippingAddress: "Tower B, JLT Cluster D, Dubai, UAE",
    createdAt: "2026-02-05T16:45:00Z",
    updatedAt: "2026-02-06T10:00:00Z",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Arabic Oud Perfume",
    sku: "PRF-001",
    category: "Perfumes",
    price: 250,
    comparePrice: 350,
    stock: 145,
    status: "active",
    image: "/products/oud.jpg",
    description: "Luxurious Arabic Oud perfume crafted from the finest agarwood, offering a rich and captivating fragrance.",
    createdAt: "2025-12-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Gold Plated Watch",
    sku: "WCH-002",
    category: "Watches",
    price: 450,
    comparePrice: 599,
    stock: 78,
    status: "active",
    image: "/products/watch.jpg",
    description: "Elegant gold plated watch with Swiss movement and sapphire crystal glass.",
    createdAt: "2025-11-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Luxury Leather Bag",
    sku: "BAG-003",
    category: "Bags",
    price: 200,
    comparePrice: 280,
    stock: 56,
    status: "active",
    image: "/products/bag.jpg",
    description: "Handcrafted genuine leather bag with premium stitching and gold-tone hardware.",
    createdAt: "2025-10-10T10:00:00Z",
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    sku: "SNG-004",
    category: "Accessories",
    price: 150,
    comparePrice: 200,
    stock: 230,
    status: "active",
    image: "/products/sunglasses.jpg",
    description: "UV400 protection designer sunglasses with polarized lenses and titanium frame.",
    createdAt: "2025-09-05T10:00:00Z",
  },
  {
    id: "5",
    name: "Silk Scarf Collection",
    sku: "SCF-005",
    category: "Accessories",
    price: 100,
    comparePrice: 140,
    stock: 312,
    status: "active",
    image: "/products/scarf.jpg",
    description: "100% pure silk scarf with hand-printed traditional Arabic patterns.",
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "6",
    name: "Traditional Kaftan Dress",
    sku: "KFT-006",
    category: "Clothing",
    price: 380,
    comparePrice: 500,
    stock: 0,
    status: "inactive",
    image: "/products/kaftan.jpg",
    description: "Embroidered traditional kaftan dress with intricate gold threadwork.",
    createdAt: "2025-07-15T10:00:00Z",
  },
  {
    id: "7",
    name: "Arabian Dates Gift Box",
    sku: "DTS-007",
    category: "Food & Gifts",
    price: 75,
    comparePrice: 95,
    stock: 5,
    status: "active",
    image: "/products/dates.jpg",
    description: "Premium Medjool dates in an elegant gift box, perfect for special occasions.",
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "8",
    name: "Pearl Necklace Set",
    sku: "JWL-008",
    category: "Jewelry",
    price: 650,
    comparePrice: 850,
    stock: 34,
    status: "active",
    image: "/products/pearl.jpg",
    description: "Freshwater pearl necklace and earring set with 18K gold clasp.",
    createdAt: "2026-01-20T10:00:00Z",
  },
];

export const categories: Category[] = [
  { id: "1", name: "Perfumes", slug: "perfumes", description: "Luxury fragrances and oud collections", productCount: 45, status: "active", image: "/categories/perfumes.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "2", name: "Watches", slug: "watches", description: "Premium watches and timepieces", productCount: 32, status: "active", image: "/categories/watches.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "3", name: "Bags", slug: "bags", description: "Designer bags and handbags", productCount: 28, status: "active", image: "/categories/bags.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "4", name: "Accessories", slug: "accessories", description: "Fashion accessories and more", productCount: 67, status: "active", image: "/categories/accessories.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "5", name: "Clothing", slug: "clothing", description: "Traditional and modern clothing", productCount: 54, status: "active", image: "/categories/clothing.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "6", name: "Jewelry", slug: "jewelry", description: "Gold, diamond, and pearl jewelry", productCount: 41, status: "active", image: "/categories/jewelry.jpg", createdAt: "2025-06-01T10:00:00Z" },
  { id: "7", name: "Food & Gifts", slug: "food-gifts", description: "Premium dates, sweets, and gift boxes", productCount: 23, status: "active", image: "/categories/food.jpg", createdAt: "2025-07-15T10:00:00Z" },
  { id: "8", name: "Home Decor", slug: "home-decor", description: "Arabian-inspired home decorations", productCount: 19, status: "inactive", image: "/categories/decor.jpg", createdAt: "2025-08-01T10:00:00Z" },
];

export const customers: Customer[] = [
  { id: "1", name: "Ahmed Al Maktoum", email: "ahmed@email.com", phone: "+971 50 123 4567", city: "Dubai", totalOrders: 12, totalSpent: 8450, status: "active", joinedAt: "2025-03-15T10:00:00Z", lastOrder: "2026-02-07T10:30:00Z", avatar: "" },
  { id: "2", name: "Fatima Hassan", email: "fatima@email.com", phone: "+971 55 234 5678", city: "Abu Dhabi", totalOrders: 8, totalSpent: 5200, status: "active", joinedAt: "2025-04-20T10:00:00Z", lastOrder: "2026-02-07T14:20:00Z", avatar: "" },
  { id: "3", name: "Omar Sheikh", email: "omar@email.com", phone: "+971 52 345 6789", city: "Sharjah", totalOrders: 5, totalSpent: 2100, status: "active", joinedAt: "2025-06-10T10:00:00Z", lastOrder: "2026-02-06T09:15:00Z", avatar: "" },
  { id: "4", name: "Layla Rashid", email: "layla@email.com", phone: "+971 56 456 7890", city: "Dubai", totalOrders: 15, totalSpent: 12300, status: "active", joinedAt: "2025-01-05T10:00:00Z", lastOrder: "2026-02-08T08:00:00Z", avatar: "" },
  { id: "5", name: "Khalid Ibrahim", email: "khalid@email.com", phone: "+971 54 567 8901", city: "Ajman", totalOrders: 3, totalSpent: 1525, status: "active", joinedAt: "2025-09-01T10:00:00Z", lastOrder: "2026-02-05T16:45:00Z", avatar: "" },
  { id: "6", name: "Mariam Al Dhaheri", email: "mariam@email.com", phone: "+971 58 678 9012", city: "Dubai", totalOrders: 22, totalSpent: 18750, status: "active", joinedAt: "2024-11-15T10:00:00Z", lastOrder: "2026-02-04T12:00:00Z", avatar: "" },
  { id: "7", name: "Yousef Al Mansoori", email: "yousef@email.com", phone: "+971 50 789 0123", city: "Ras Al Khaimah", totalOrders: 1, totalSpent: 450, status: "inactive", joinedAt: "2025-12-20T10:00:00Z", lastOrder: "2025-12-20T10:00:00Z", avatar: "" },
  { id: "8", name: "Sara Mohammed", email: "sara@email.com", phone: "+971 55 890 1234", city: "Dubai", totalOrders: 9, totalSpent: 6800, status: "active", joinedAt: "2025-05-10T10:00:00Z", lastOrder: "2026-01-28T09:00:00Z", avatar: "" },
];

export const orders: Order[] = [
  ...recentOrders,
  {
    id: "6",
    orderNumber: "ORD-2026-006",
    customer: { name: "Mariam Al Dhaheri", email: "mariam@email.com", phone: "+971 58 678 9012" },
    items: [
      { name: "Pearl Necklace Set", quantity: 1, price: 650 },
      { name: "Luxury Leather Bag", quantity: 1, price: 200 },
    ],
    total: 880,
    subtotal: 850,
    shipping: 15,
    tax: 15,
    status: "delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    shippingAddress: "Penthouse, DIFC, Dubai, UAE",
    createdAt: "2026-02-04T12:00:00Z",
    updatedAt: "2026-02-06T16:00:00Z",
  },
  {
    id: "7",
    orderNumber: "ORD-2026-007",
    customer: { name: "Sara Mohammed", email: "sara@email.com", phone: "+971 55 890 1234" },
    items: [
      { name: "Traditional Kaftan Dress", quantity: 1, price: 380 },
      { name: "Silk Scarf Collection", quantity: 2, price: 100 },
    ],
    total: 610,
    subtotal: 580,
    shipping: 15,
    tax: 15,
    status: "delivered",
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    shippingAddress: "Villa 8, The Springs, Dubai, UAE",
    createdAt: "2026-01-28T09:00:00Z",
    updatedAt: "2026-01-30T15:00:00Z",
  },
];
