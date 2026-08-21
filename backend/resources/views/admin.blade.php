<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estèle Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        gold: { DEFAULT: '#C4A265', dark: '#A88B4A', light: '#D4B87A' },
                        charcoal: { DEFAULT: '#2C2C2C', light: '#4A4A4A', muted: '#6B6B6B' },
                        ivory: '#FAF8F5',
                        cream: '#F5F0EB',
                        champagne: '#F0E6D8',
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div id="app" class="flex min-h-screen">
        <!-- Sidebar -->
        <aside id="sidebar" class="w-64 bg-charcoal text-ivory flex-shrink-0 flex flex-col transition-all duration-300">
            <div class="p-6 border-b border-white/10">
                <h1 class="font-serif text-2xl tracking-[0.2em]">ESTELE</h1>
                <p class="text-xs text-ivory/40 mt-1">Admin Panel</p>
            </div>
            <nav class="flex-1 p-4">
                <a href="#" onclick="navigateTo('dashboard')" class="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-ivory/70 hover:bg-white/10 hover:text-ivory transition-colors mb-1" data-page="dashboard">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Dashboard
                </a>
                <a href="#" onclick="navigateTo('orders')" class="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-ivory/70 hover:bg-white/10 hover:text-ivory transition-colors mb-1" data-page="orders">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    Orders
                </a>
                <a href="#" onclick="navigateTo('products')" class="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-ivory/70 hover:bg-white/10 hover:text-ivory transition-colors mb-1" data-page="products">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    Products
                </a>
            </nav>
            <div class="p-4 border-t border-white/10">
                <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-ivory/50 hover:bg-white/10 hover:text-ivory transition-colors w-full">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto">
            <!-- Login Form (hidden by default) -->
            <div id="login-page" class="flex items-center justify-center min-h-screen">
                <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                    <h2 class="font-serif text-3xl text-center mb-2">ESTELE</h2>
                    <p class="text-center text-charcoal-muted text-sm mb-8">Admin Panel Login</p>
                    <form id="login-form" onsubmit="handleLogin(event)">
                        <div id="login-error" class="hidden bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4"></div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="login-email" required class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" placeholder="admin@estele.co">
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" id="login-password" required class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" placeholder="Password">
                        </div>
                        <button type="submit" class="w-full bg-charcoal text-ivory py-3 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gold transition-colors">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>

            <!-- Admin Pages (hidden by default) -->
            <div id="admin-pages" class="hidden">
                <header class="bg-white border-b border-gray-200 px-8 py-4">
                    <div class="flex items-center justify-between">
                        <h2 id="page-title" class="font-serif text-2xl text-charcoal">Dashboard</h2>
                        <div class="flex items-center gap-4">
                            <span id="admin-name" class="text-sm text-charcoal-muted"></span>
                        </div>
                    </div>
                </header>

                <div id="page-content" class="p-8"></div>
            </div>
        </main>
    </div>

    <script>
        const API_BASE = '/api';
        let authToken = localStorage.getItem('admin_token');
        let currentPage = 'dashboard';

        async function api(endpoint, options = {}) {
            const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
            if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

            const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers: { ...headers, ...options.headers } });
            if (response.status === 401) { logout(); throw new Error('Unauthorized'); }
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Request failed');
            }
            return response.json();
        }

        async function handleLogin(e) {
            e.preventDefault();
            const errorEl = document.getElementById('login-error');
            errorEl.classList.add('hidden');
            try {
                const data = await api('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: document.getElementById('login-email').value,
                        password: document.getElementById('login-password').value,
                    }),
                });
                if (!data.user.is_admin) {
                    errorEl.textContent = 'You do not have admin access.';
                    errorEl.classList.remove('hidden');
                    return;
                }
                authToken = data.token;
                localStorage.setItem('admin_token', data.token);
                showAdminPanel(data.user);
            } catch (err) {
                errorEl.textContent = err.message || 'Invalid credentials';
                errorEl.classList.remove('hidden');
            }
        }

        function showAdminPanel(user) {
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('admin-pages').classList.remove('hidden');
            document.getElementById('admin-name').textContent = user.name;
            navigateTo('dashboard');
        }

        function logout() {
            authToken = null;
            localStorage.removeItem('admin_token');
            document.getElementById('login-page').classList.remove('hidden');
            document.getElementById('admin-pages').classList.add('hidden');
        }

        function navigateTo(page) {
            currentPage = page;
            document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.toggle('bg-white/10', el.dataset.page === page);
                el.classList.toggle('text-ivory', el.dataset.page === page);
                el.classList.toggle('text-ivory/70', el.dataset.page !== page);
            });
            const titles = { dashboard: 'Dashboard', orders: 'Orders', products: 'Products' };
            document.getElementById('page-title').textContent = titles[page] || page;
            loadPage(page);
        }

        async function loadPage(page) {
            const content = document.getElementById('page-content');
            content.innerHTML = '<div class="flex items-center justify-center py-20"><div class="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full"></div></div>';
            try {
                switch (page) {
                    case 'dashboard': await loadDashboard(content); break;
                    case 'orders': await loadOrders(content); break;
                    case 'products': await loadProducts(content); break;
                }
            } catch (err) {
                content.innerHTML = `<div class="text-center py-20 text-red-500">${err.message}</div>`;
            }
        }

        async function loadDashboard(el) {
            const data = await api('/admin/dashboard');
            el.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <p class="text-sm text-charcoal-muted mb-1">Total Orders</p>
                        <p class="text-3xl font-serif text-charcoal">${data.total_orders}</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <p class="text-sm text-charcoal-muted mb-1">Pending Orders</p>
                        <p class="text-3xl font-serif text-amber-600">${data.pending_orders}</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <p class="text-sm text-charcoal-muted mb-1">Total Revenue</p>
                        <p class="text-3xl font-serif text-charcoal">₹${Number(data.total_revenue).toLocaleString('en-IN')}</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <p class="text-sm text-charcoal-muted mb-1">Total Products</p>
                        <p class="text-3xl font-serif text-charcoal">${data.total_products}</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-100">
                        <h3 class="font-serif text-lg">Recent Orders</h3>
                    </div>
                    <table class="w-full">
                        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wider text-charcoal-muted">
                            <tr><th class="px-6 py-3">Order</th><th class="px-6 py-3">Customer</th><th class="px-6 py-3">Total</th><th class="px-6 py-3">Status</th><th class="px-6 py-3">Date</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${data.recent_orders.map(o => `
                                <tr class="hover:bg-gray-50 cursor-pointer" onclick="navigateTo('orders')">
                                    <td class="px-6 py-4 text-sm font-medium">${o.order_number}</td>
                                    <td class="px-6 py-4 text-sm text-charcoal-muted">${o.user?.name || 'N/A'}</td>
                                    <td class="px-6 py-4 text-sm font-medium">₹${Number(o.total).toLocaleString('en-IN')}</td>
                                    <td class="px-6 py-4"><span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusClass(o.status)}">${o.status}</span></td>
                                    <td class="px-6 py-4 text-sm text-charcoal-muted">${new Date(o.created_at).toLocaleDateString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        async function loadOrders(el) {
            const params = new URLSearchParams();
            const statusFilter = document.getElementById('order-status-filter')?.value;
            if (statusFilter) params.set('status', statusFilter);
            const searchFilter = document.getElementById('order-search')?.value;
            if (searchFilter) params.set('search', searchFilter);

            const data = await api(`/admin/orders?${params}`);
            el.innerHTML = `
                <div class="flex flex-wrap gap-4 mb-6">
                    <select id="order-status-filter" onchange="loadOrders(document.getElementById('page-content'))" class="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input id="order-search" type="text" placeholder="Search orders..." class="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px]">
                    <button onclick="loadOrders(document.getElementById('page-content'))" class="bg-charcoal text-ivory px-6 py-2 rounded-lg text-sm font-medium hover:bg-gold transition-colors">Search</button>
                </div>
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wider text-charcoal-muted">
                            <tr><th class="px-6 py-3">Order</th><th class="px-6 py-3">Customer</th><th class="px-6 py-3">Items</th><th class="px-6 py-3">Total</th><th class="px-6 py-3">Status</th><th class="px-6 py-3">Actions</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${data.data.length === 0 ? '<tr><td colspan="6" class="px-6 py-12 text-center text-charcoal-muted">No orders found</td></tr>' :
                            data.data.map(o => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-medium">${o.order_number}</td>
                                    <td class="px-6 py-4 text-sm">${o.user?.name}<br><span class="text-charcoal-muted text-xs">${o.user?.email}</span></td>
                                    <td class="px-6 py-4 text-sm">${o.items?.length || 0} items</td>
                                    <td class="px-6 py-4 text-sm font-medium">₹${Number(o.total).toLocaleString('en-IN')}</td>
                                    <td class="px-6 py-4"><span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusClass(o.status)}">${o.status}</span></td>
                                    <td class="px-6 py-4 text-sm">
                                        <button onclick="viewOrder(${o.id})" class="text-gold hover:text-gold-dark mr-3 font-medium">View</button>
                                        ${o.status === 'pending' ? `
                                            <button onclick="acceptOrder(${o.id})" class="text-green-600 hover:text-green-700 mr-3 font-medium">Accept</button>
                                            <button onclick="rejectOrder(${o.id})" class="text-red-500 hover:text-red-600 font-medium">Reject</button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ${data.last_page > 1 ? `
                    <div class="flex justify-center gap-2 mt-6">
                        ${Array.from({length: data.last_page}, (_, i) => i + 1).map(p => `
                            <button onclick="loadOrdersPage(${p})" class="px-3 py-1 rounded text-sm ${p === data.current_page ? 'bg-gold text-white' : 'bg-white border hover:bg-gray-50'}">${p}</button>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        }

        async function viewOrder(id) {
            const order = await api(`/admin/orders/${id}`);
            const content = document.getElementById('page-content');
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
            modal.innerHTML = `
                <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h3 class="font-serif text-2xl">${order.order_number}</h3>
                            <p class="text-sm text-charcoal-muted">${new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <span class="inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusClass(order.status)}">${order.status}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 class="text-xs uppercase tracking-wider text-charcoal-muted mb-2">Customer</h4>
                            <p class="text-sm font-medium">${order.user?.name}</p>
                            <p class="text-sm text-charcoal-muted">${order.user?.email}</p>
                        </div>
                        <div>
                            <h4 class="text-xs uppercase tracking-wider text-charcoal-muted mb-2">Payment</h4>
                            <p class="text-sm">${order.payment_method.toUpperCase()}</p>
                            <p class="text-sm text-charcoal-muted">${order.payment_status}</p>
                        </div>
                    </div>
                    <div class="mb-6">
                        <h4 class="text-xs uppercase tracking-wider text-charcoal-muted mb-3">Items</h4>
                        <div class="space-y-3">
                            ${order.items.map(item => `
                                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <img src="${item.product_image || ''}" class="w-12 h-12 rounded object-cover bg-gray-200">
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">${item.product_name}</p>
                                        <p class="text-xs text-charcoal-muted">Qty: ${item.quantity} × ₹${Number(item.price).toLocaleString('en-IN')}</p>
                                    </div>
                                    <p class="text-sm font-medium">₹${Number(item.total).toLocaleString('en-IN')}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="border-t pt-4 mb-6">
                        <div class="flex justify-between text-sm mb-1"><span class="text-charcoal-muted">Subtotal</span><span>₹${Number(order.subtotal).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between text-sm mb-1"><span class="text-charcoal-muted">Shipping</span><span>${order.shipping_cost == 0 ? 'FREE' : '₹' + Number(order.shipping_cost).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between text-sm mb-1"><span class="text-charcoal-muted">Tax</span><span>₹${Number(order.tax).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between text-base font-semibold mt-2 pt-2 border-t"><span>Total</span><span>₹${Number(order.total).toLocaleString('en-IN')}</span></div>
                    </div>
                    ${order.status === 'pending' ? `
                        <div class="flex gap-3">
                            <button onclick="acceptOrder(${order.id}); this.closest('.fixed').remove();" class="flex-1 bg-green-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">Accept Order</button>
                            <button onclick="rejectOrder(${order.id}); this.closest('.fixed').remove();" class="flex-1 bg-red-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">Reject Order</button>
                        </div>
                    ` : ''}
                    <button onclick="this.closest('.fixed').remove()" class="w-full mt-3 border border-gray-300 text-charcoal py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        async function acceptOrder(id) {
            if (!confirm('Accept this order?')) return;
            await api(`/admin/orders/${id}/accept`, { method: 'POST' });
            loadPage(currentPage);
        }

        async function rejectOrder(id) {
            const notes = prompt('Reason for rejection (optional):');
            await api(`/admin/orders/${id}/reject`, {
                method: 'POST',
                body: JSON.stringify({ admin_notes: notes }),
            });
            loadPage(currentPage);
        }

        async function loadProducts(el) {
            const data = await api('/admin/products');
            el.innerHTML = `
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <span class="text-sm text-charcoal-muted">${data.total} products</span>
                    </div>
                    <table class="w-full">
                        <thead class="bg-gray-50 text-left text-xs uppercase tracking-wider text-charcoal-muted">
                            <tr><th class="px-6 py-3">Product</th><th class="px-6 py-3">Category</th><th class="px-6 py-3">Price</th><th class="px-6 py-3">Stock</th><th class="px-6 py-3">Status</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${data.data.map(p => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4"><div class="flex items-center gap-3"><img src="${p.images?.[0] || ''}" class="w-10 h-10 rounded object-cover bg-gray-200"><span class="text-sm font-medium">${p.name}</span></div></td>
                                    <td class="px-6 py-4 text-sm text-charcoal-muted">${p.category?.name || 'N/A'}</td>
                                    <td class="px-6 py-4 text-sm font-medium">₹${Number(p.price).toLocaleString('en-IN')}</td>
                                    <td class="px-6 py-4 text-sm ${p.stock <= 0 ? 'text-red-500' : ''}">${p.stock}</td>
                                    <td class="px-6 py-4"><span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">${p.is_active ? 'Active' : 'Inactive'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        function statusClass(status) {
            return {
                pending: 'bg-amber-100 text-amber-700',
                confirmed: 'bg-blue-100 text-blue-700',
                processing: 'bg-indigo-100 text-indigo-700',
                shipped: 'bg-purple-100 text-purple-700',
                delivered: 'bg-green-100 text-green-700',
                cancelled: 'bg-red-100 text-red-600',
            }[status] || 'bg-gray-100 text-gray-600';
        }

        // Init
        if (authToken) {
            api('/auth/me').then(user => {
                if (user.is_admin) showAdminPanel(user);
                else logout();
            }).catch(() => logout());
        }
    </script>
</body>
</html>
