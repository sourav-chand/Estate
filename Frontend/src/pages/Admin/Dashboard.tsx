import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Users, IndianRupee, Clock, ChevronRight } from 'lucide-react';
import { adminApi, type AdminDashboard } from '../../services/adminApi';
import { formatPrice } from '../../utils/format';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function AdminDashboard() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center text-gray-400">Loading dashboard...</div>;
  if (!data) return <div className="py-20 text-center text-red-500">Failed to load dashboard</div>;

  const stats = [
    { label: 'Total Revenue', value: formatPrice(data.total_revenue), icon: IndianRupee, color: 'text-green-600 bg-green-50' },
    { label: 'Total Orders', value: data.total_orders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Orders', value: data.pending_orders, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Products', value: data.total_products, icon: Package, color: 'text-purple-600 bg-purple-50' },
    { label: 'Users', value: data.total_users, icon: Users, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-charcoal">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Orders by Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Orders by Status</h3>
          <div className="space-y-3">
            {Object.entries(data.orders_by_status).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
                  {status}
                </span>
                <span className="font-semibold text-gray-900">{count as number}</span>
              </div>
            ))}
            {Object.keys(data.orders_by_status).length === 0 && (
              <p className="text-sm text-gray-400">No orders yet</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Recent Orders</h3>
            <Link to="/admin/orders" className="flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-dark">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  <th className="pb-3 pr-4">Order</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recent_orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <Link to={`/admin/orders/${order.id}`} className="font-medium text-gray-900 hover:text-gold">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{order.user?.name}</td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.recent_orders.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
