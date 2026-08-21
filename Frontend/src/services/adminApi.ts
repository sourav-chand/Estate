const API_BASE = 'http://localhost:8000/api';

async function adminFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Access denied. Admin only.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.error || 'Request failed');
  }

  return response.json();
}

export interface AdminDashboard {
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  total_products: number;
  total_users: number;
  recent_orders: any[];
  orders_by_status: Record<string, number>;
}

export interface AdminOrder {
  id: number;
  order_number: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  payment_method: string;
  notes: string | null;
  admin_notes: string | null;
  tracking_number: string | null;
  created_at: string;
  confirmed_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  user: { id: number; name: string; email: string };
  items: {
    id: number;
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
    total: number;
    product: { id: number; name: string; images: string[] } | null;
  }[];
}

export interface AdminProduct {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number;
  color: string | null;
  material: string | null;
  sku: string | null;
  stock: number;
  images: string[];
  tags: string[];
  is_new: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  rating: number;
  review_count: number;
  category: { id: number; name: string } | null;
  collection: { id: number; name: string } | null;
  category_id: number | null;
  collection_id: number | null;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const adminApi = {
  getDashboard: () => adminFetch<AdminDashboard>('/admin/dashboard'),

  getOrders: (params?: { status?: string; search?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set('status', params.status);
    if (params?.search) q.set('search', params.search);
    if (params?.page) q.set('page', String(params.page));
    return adminFetch<PaginatedResponse<AdminOrder>>(`/admin/orders?${q}`);
  },

  getOrder: (id: number) => adminFetch<AdminOrder>(`/admin/orders/${id}`),

  acceptOrder: (id: number, adminNotes?: string) =>
    adminFetch<{ message: string; order: AdminOrder }>(`/admin/orders/${id}/accept`, {
      method: 'POST',
      body: JSON.stringify({ admin_notes: adminNotes }),
    }),

  rejectOrder: (id: number, adminNotes?: string) =>
    adminFetch<{ message: string; order: AdminOrder }>(`/admin/orders/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ admin_notes: adminNotes }),
    }),

  updateOrderStatus: (id: number, status: string, trackingNumber?: string) =>
    adminFetch<{ message: string; order: AdminOrder }>(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, tracking_number: trackingNumber }),
    }),

  getProducts: (params?: { search?: string; category_id?: number; is_active?: boolean; page?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    if (params?.category_id) q.set('category_id', String(params.category_id));
    if (params?.is_active !== undefined) q.set('is_active', String(params.is_active));
    if (params?.page) q.set('page', String(params.page));
    return adminFetch<PaginatedResponse<AdminProduct>>(`/admin/products?${q}`);
  },

  getProduct: (id: number) => adminFetch<AdminProduct>(`/admin/products/${id}`),

  createProduct: (data: Partial<AdminProduct>) =>
    adminFetch<AdminProduct>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number, data: Partial<AdminProduct>) =>
    adminFetch<AdminProduct>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number) =>
    adminFetch<{ message: string }>(`/admin/products/${id}`, { method: 'DELETE' }),

  getCategories: () => adminFetch<{ data: { id: number; name: string; slug: string }[] }>('/categories'),
  getCollections: () => adminFetch<{ data: { id: number; name: string; slug: string }[] }>('/collections'),
};
