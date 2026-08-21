import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { adminApi, type AdminProduct, type PaginatedResponse } from '../../services/adminApi';
import { formatPrice } from '../../utils/format';

interface Category { id: number; name: string; slug: string; }

const EMPTY_PRODUCT: Partial<AdminProduct> = {
  name: '', description: '', price: 0, compare_at_price: 0, color: '', material: '',
  sku: '', stock: 0, images: [], tags: [], is_new: false, is_bestseller: false, is_active: true,
  category_id: null, collection_id: null,
};

export function AdminProducts() {
  const [data, setData] = useState<PaginatedResponse<AdminProduct> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<AdminProduct> | null>(null);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<{ id: number; name: string }[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    adminApi.getProducts({ search: search || undefined, page })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [page]);
  useEffect(() => {
    adminApi.getCategories().then(d => setCategories(d.data)).catch(() => {});
    adminApi.getCollections().then(d => setCollections(d.data)).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const openCreate = () => {
    setEditingProduct({ ...EMPTY_PRODUCT });
    setImageUrl('');
    setShowModal(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct({ ...product });
    setImageUrl('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingProduct || !editingProduct.name || !editingProduct.price || !editingProduct.category_id) {
      alert('Name, price, and category are required');
      return;
    }
    setSaving(true);
    try {
      if (editingProduct.id) {
        await adminApi.updateProduct(editingProduct.id, editingProduct);
      } else {
        await adminApi.createProduct(editingProduct);
      }
      setShowModal(false);
      fetchProducts();
    } catch (e: any) {
      alert(e.message);
    }
    setSaving(false);
  };

  const handleDelete = async (product: AdminProduct) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      await adminApi.deleteProduct(product.id);
      fetchProducts();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const addImageUrl = () => {
    if (imageUrl.trim() && editingProduct) {
      setEditingProduct({ ...editingProduct, images: [...(editingProduct.images || []), imageUrl.trim()] });
      setImageUrl('');
    }
  };

  const removeImageUrl = (idx: number) => {
    if (editingProduct) {
      const imgs = [...(editingProduct.images || [])];
      imgs.splice(idx, 1);
      setEditingProduct({ ...editingProduct, images: imgs });
    }
  };

  const updateField = (field: string, value: any) => {
    if (editingProduct) setEditingProduct({ ...editingProduct, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-charcoal">Products</h2>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold-dark">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gold" />
        </div>
        <button type="submit" className="rounded-lg bg-charcoal px-4 py-2.5 text-sm font-medium text-white hover:bg-charcoal-light">Search</button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : data?.data.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No products found</td></tr>
            ) : (
              data?.data.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400"><ImageIcon size={16} /></div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{product.category?.name}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-gray-900'}`}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gold"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(product)} className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && data.last_page > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: data.last_page }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${p === data.current_page ? 'bg-gold text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
              {p}
            </button>
          ))}
        </div>
      )}

      {showModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="font-serif text-lg font-semibold text-charcoal">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="mb-1 block text-xs font-medium text-gray-500">Name *</label>
                  <input value={editingProduct.name || ''} onChange={e => updateField('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Price *</label>
                  <input type="number" value={editingProduct.price || 0} onChange={e => updateField('price', Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Compare At Price</label>
                  <input type="number" value={editingProduct.compare_at_price || 0} onChange={e => updateField('compare_at_price', Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Category *</label>
                  <select value={editingProduct.category_id || ''} onChange={e => updateField('category_id', Number(e.target.value) || null)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Collection</label>
                  <select value={editingProduct.collection_id || ''} onChange={e => updateField('collection_id', Number(e.target.value) || null)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold">
                    <option value="">Select collection</option>
                    {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Stock *</label>
                  <input type="number" value={editingProduct.stock || 0} onChange={e => updateField('stock', Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">SKU</label>
                  <input value={editingProduct.sku || ''} onChange={e => updateField('sku', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Color</label>
                  <input value={editingProduct.color || ''} onChange={e => updateField('color', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Material</label>
                  <input value={editingProduct.material || ''} onChange={e => updateField('material', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
                <textarea value={editingProduct.description || ''} onChange={e => updateField('description', e.target.value)} rows={3}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold resize-none" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Images (URLs)</label>
                <div className="flex gap-2">
                  <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Paste image URL..."
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold" />
                  <button type="button" onClick={addImageUrl} className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Add</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editingProduct.images || []).map((img, idx) => (
                    <div key={idx} className="group relative">
                      <img src={img} alt="" className="h-16 w-16 rounded-lg object-cover" />
                      <button type="button" onClick={() => removeImageUrl(idx)}
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100">
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingProduct.is_new || false} onChange={e => updateField('is_new', e.target.checked)} className="accent-gold" /> New Arrival</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingProduct.is_bestseller || false} onChange={e => updateField('is_bestseller', e.target.checked)} className="accent-gold" /> Bestseller</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingProduct.is_active !== false} onChange={e => updateField('is_active', e.target.checked)} className="accent-gold" /> Active</label>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button onClick={() => setShowModal(false)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="rounded-lg bg-gold px-6 py-2.5 text-sm font-medium text-white hover:bg-gold-dark disabled:opacity-50">
                  {saving ? 'Saving...' : editingProduct.id ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
