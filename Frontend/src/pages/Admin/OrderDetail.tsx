import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Truck, Package, Clock } from 'lucide-react';
import { adminApi, type AdminOrder } from '../../services/adminApi';
import { formatPrice } from '../../utils/format';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    if (!id) return;
    adminApi.getOrder(Number(id)).then(setOrder).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleAccept = async () => {
    if (!order) return;
    setActionLoading(true);
    try {
      const res = await adminApi.acceptOrder(order.id, message);
      setOrder(res.order);
      setMessage('');
    } catch (e: any) { alert(e.message); }
    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!order) return;
    if (!confirm('Reject this order? Stock will be restored.')) return;
    setActionLoading(true);
    try {
      const res = await adminApi.rejectOrder(order.id, message);
      setOrder(res.order);
      setMessage('');
    } catch (e: any) { alert(e.message); }
    setActionLoading(false);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;
    setActionLoading(true);
    try {
      const res = await adminApi.updateOrderStatus(order.id, newStatus, trackingNumber || undefined);
      setOrder(res.order);
      setTrackingNumber('');
    } catch (e: any) { alert(e.message); }
    setActionLoading(false);
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading order...</div>;
  if (!order) return <div className="py-20 text-center text-red-500">Order not found</div>;

  const currentStep = STATUS_FLOW.indexOf(order.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/orders" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">Order {order.order_number}</h2>
          <p className="text-sm text-gray-400">Placed on {new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Status bar */}
      {order.status !== 'cancelled' && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            {STATUS_FLOW.map((step, i) => (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    i <= currentStep ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {i < currentStep ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <span className="mt-1 text-xs capitalize text-gray-500">{step}</span>
                </div>
                {i < STATUS_FLOW.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 ${i < currentStep ? 'bg-gold' : 'bg-gray-100'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Info */}
        <div className="space-y-4 lg:col-span-2">
          {/* Items */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Items</h3>
            <div className="divide-y divide-gray-50">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  {item.product_image && (
                    <img src={item.product_image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product_name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-medium text-gray-900">{formatPrice(item.total)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Customer</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-900">{order.user?.name}</p>
              <p className="text-gray-500">{order.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{order.shipping_cost === 0 ? 'FREE' : formatPrice(order.shipping_cost)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatPrice(order.tax)}</span></div>
              <div className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
              <div className="flex justify-between pt-1"><span className="text-gray-500">Payment</span><span className="uppercase">{order.payment_method}</span></div>
            </div>
            <div className="mt-3">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                {order.status}
              </span>
            </div>
            {order.tracking_number && (
              <div className="mt-3 text-sm"><span className="text-gray-500">Tracking: </span><span className="font-medium">{order.tracking_number}</span></div>
            )}
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gray-500">Actions</h3>

            {order.status === 'pending' && (
              <div className="space-y-3">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Admin notes (optional)..."
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold resize-none"
                />
                <button
                  onClick={handleAccept}
                  disabled={actionLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle size={16} /> Accept Order
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <XCircle size={16} /> Reject Order
                </button>
              </div>
            )}

            {['confirmed', 'processing', 'shipped'].includes(order.status) && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Tracking Number</label>
                  <input
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    placeholder="Optional tracking number"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_FLOW.filter(s => STATUS_FLOW.indexOf(s) > currentStep).map(nextStatus => (
                    <button
                      key={nextStatus}
                      onClick={() => handleStatusUpdate(nextStatus)}
                      disabled={actionLoading}
                      className="rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Move to {nextStatus}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {order.status === 'cancelled' && (
              <p className="text-sm text-gray-400">This order has been cancelled.</p>
            )}
            {order.status === 'delivered' && (
              <p className="text-sm text-gray-400">This order has been delivered.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
