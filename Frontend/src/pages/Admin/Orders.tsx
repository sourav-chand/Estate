import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { adminApi, type AdminOrder, type PaginatedResponse } from '../../services/adminApi';
import { formatPrice } from '../../utils/format';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUSES = ['', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export function AdminOrders() {
  const [data, setData] = useState<PaginatedResponse<AdminOrder> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const fetchOrders = () => {
    setLoading(true);
    adminApi.getOrders({ search: search || undefined, status: status || undefined, page })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [page, status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-charcoal">Orders</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gold"
            />
          </div>
          <button type="submit" className="rounded-lg bg-charcoal px-4 py-2.5 text-sm font-medium text-white hover:bg-charcoal-light">
            Search
          </button>
        </form>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s || 'All Statuses'}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : data?.data.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No orders found</td></tr>
            ) : (
              data?.data.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{order.order_number}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900">{order.user?.name}</div>
                    <div className="text-xs text-gray-400">{order.user?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{order.items?.length || 0}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 uppercase text-gray-500">{order.payment_method}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || ''}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/orders/${order.id}`} className="text-gold hover:text-gold-dark">
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.last_page > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: data.last_page }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                p === data.current_page
                  ? 'bg-gold text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
